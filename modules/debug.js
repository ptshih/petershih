const debug = require('debug');
const nconf = require('nconf');
const prefix = nconf.get('DEBUG_PREFIX') ? `${nconf.get('DEBUG_PREFIX')}:` : '';

module.exports = {
  log: debug(`${prefix}log`),
  info: debug(`${prefix}info`),
  warn: debug(`${prefix}warn`),
  error: debug(`${prefix}error`),
  json: (object, pretty = false) => {
    const json = pretty ? JSON.stringify(object, null, 2) : JSON.stringify(object);
    debug(`${prefix}log`).call(debug, json);
  },
};
