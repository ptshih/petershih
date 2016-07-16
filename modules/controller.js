import _ from 'lodash';
import xml2js from 'xml2js';
import PrettyError from 'pretty-error';
const pe = new PrettyError();
pe.skipNodeFiles(); // this will skip events.js and http.js and similar core node files
pe.skipPackage('express', 'bluebird');

module.exports = class Controller {
  constructor(app, wss) {
    // Referenecs to the express app and websocketserver connection
    this.app = app;
    this.wss = wss;

    // Mongoose
    this.sort = {};
    this.select = null;

    // Controller defined routes
    this.routes = [];

    // Controller defined middleware
    this.pre = []; // run before route middleware
    this.before = []; // run after route middleware but before route handler
    this.after = []; // run after route handler

    // Internal middleware
    this._begin = [
      this.parseFields,
      this.parseSkipLimitSortOrder,
    ];
    this._end = [
      this.successResponse,
      this.errorResponse,
      this.finalResponse,
    ];

    // Support optional XML response format
    this.xmlBuilder = new xml2js.Builder({
      renderOpts: {
        pretty: false,
      },
    });
  }

  throwError(message, code = 500) {
    const err = new Error(message);
    err.code = code;
    throw err;
  }

  /* Middleware */

  // TODO: Parse created_at/updated_at bounding

  /**
   * http://mongoosejs.com/docs/api.html#query_Query-select
   */
  parseFields(req, res, next) {
    if (_.isString(req.query.fields)) {
      this.select = req.query.fields.replace(/\s+/g, '').replace(/,/g, ' ');
    }

    next();
  }

  /**
   * http://mongoosejs.com/docs/api.html#query_Query-skip
   * http://mongoosejs.com/docs/api.html#query_Query-limit
   * http://mongoosejs.com/docs/api.html#query_Query-sort
   */
  parseSkipLimitSortOrder(req, res, next) {
    // Skip and Limit
    this.skip = _.parseInt(req.query.skip || req.query.offset) || 0;
    this.limit = _.parseInt(req.query.limit || req.query.count) || 0;

    // Support using `page` instead of `skip`
    this.page = _.parseInt(req.query.page);
    if (this.page > 0) {
      // IMPORTANT! `page` starts at 1
      // if `page` is specified, we override `skip`
      // calculate skip based on page and limit
      // lets assume limit is 100
      // page 1 is skip 0
      // page 2 is skip 100
      // etc...
      this.skip = (this.page - 1) * this.limit;
    }

    // Sort and Sort Order
    if (req.query.sort) {
      let order;
      switch (req.query.order) {
        case '1':
        case 'asc':
          order = 1;
          break;
        case '-1':
        case 'desc':
          order = -1;
          break;
        default:
          order = 1;
          break;
      }
      this.sort[req.query.sort] = order;
    }

    next();
  }

  successResponse(req, res, next) {
    const data = res.data || null;
    let code = 200;
    if (_.isNumber(res.code)) {
      code = res.code;
    }
    const envelope = {
      meta: {
        code,
      },
      data,
    };

    if (req.mock) {
      envelope.meta.mock = true;
    }

    // Optional paging meta
    if (res.paging) {
      envelope.meta.paging = res.paging;
    }

    // Set code and data
    res.code = code;
    if (res.code !== 204) {
      res.data = envelope;
    }

    next();
  }

  errorResponse(err, req, res, next) {
    console.error(pe.render(err));

    // Extract message and code from error
    err.message = err.message || 'Internal Server Error';
    err.code = _.parseInt(err.code) || _.parseInt(res.code) || 500;

    if (_.isFunction(req.validationErrors) && req.validationErrors().length) {
      // All validation errors are code 400
      err.code = 400;

      const errorMessages = [err.message];
      _.each(req.validationErrors(), (validationError) => {
        errorMessages.push(`${validationError.msg}`);
        err.message = errorMessages.join(' ');
      });
    }

    // Try and extract the line in which the error was caught
    try {
      err.line = err.stack.split('\n')[1].match(/at\s(.*)/)[1];
    } catch (e) {
      err.line = null;
    }

    const envelope = {
      meta: {
        code: err.code,
        error: {
          code: err.code,
          message: err.message,
          line: err.line,
        },
      },
      data: err.message,
    };

    // Set code and data
    res.code = err.code;
    res.data = envelope;

    next();
  }

  finalResponse(req, res) {
    // If we timed out before managing to respond, don't send the response
    if (res.headersSent) {
      return;
    }

    // Look for `.json` or `.xml` extension in path
    // And override request accept header
    if (/.json$/.test(req.path)) {
      req.headers.accept = 'application/json';
    } else if (/.xml$/.test(req.path)) {
      req.headers.accept = 'application/xml';
    }

    // Use request accept header to determine response content-type
    res.format({
      json() {
        res.status(res.code).jsonp(res.data);
      },
      xml() {
        try {
          const xmlData = JSON.parse(JSON.stringify(res.data));
          const xml = this.xmlBuilder.buildObject(xmlData);
          res.set('Content-Type', 'application/xml; charset=utf-8');
          res.status(res.code).send(xml);
        } catch (e) {
          res.status(500).end();
        }
      },
    });
  }
};
