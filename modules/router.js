import _ from 'lodash';
import express from 'express';

/**
 * Extends `Express.Router` with additional features
 * Controllers can define routes that will be connected here
 *
 * Added Properties:
 *
 * - `routes` an array of connected routes
 *   (all, get, post, put, patch, delete)
 *
 * @param {Object} options
 * @param {Object} controllers An object (map) of controllers: `name -> instance`
 * @return {Router} An instance of `Express.Router`
 */
module.exports = (options, controllers) => {
  // Create a new `Express.Router` with `options`
  // eslint-disable-next-line new-cap
  const router = express.Router(options || {});

  // Additional properties
  _.assign(router, {
    controllers: controllers || {},
    routes: [],

    /**
     * Iterates over all controllers and connects any routes defined
     */
    addControllerRoutes() {
      // Used for de-duping
      const paths = {};

      // Each controller has a `routes` object
      // Connect all routes defined in controllers
      _.forEach(router.controllers, (controller) => {
        _.forEach(controller.routes, (route) => {
          // If no route path or action is defined, skip
          if (!_.isString(route.path) || !_.isFunction(route.action)) {
            console.warn('Skipping invalid route...');
            return;
          }

          // Route method defaults to `GET`
          const method = route.method ? route.method.toLowerCase() : 'get';
          const path = route.path.toLowerCase();

          // If path/method has already been defined, skip
          if (paths[path] === method) {
            console.warn('Skipping duplicate route: [%s] %s', method, path);
            return;
          }

          // Setup controller scoped middleware
          // These apply to all routes in the controller
          const pre = _.invokeMap(controller.pre, 'bind', controller) || [];
          const before = _.invokeMap(controller.before, 'bind', controller) || [];
          const after = _.invokeMap(controller.after, 'bind', controller) || [];

          const _begin = _.invokeMap(controller._begin, 'bind', controller) || [];
          const _end = _.invokeMap(controller._end, 'bind', controller) || [];

          // Build the route handler (callback)
          const handler = router._buildHandler(controller, route);

          // Connect the route
          router[method](path, _begin, pre, route.middleware || [], before, handler, after, _end);

          // Add route to set of connected routes
          router.routes.push({
            method,
            path,
          });

          // Use for de-duping
          paths[path] = method;
        });
      });

      // Debug logging
      _.forEach(router.routes, (route) => {
        console.log('├── Route [%s] %s ──┤', route.method, route.path);
      });
    },

    /**
     * Return a route handler/callback
     *
     * @param {Controller} controller
     * @param {Object} route
     * @return {Function}
     */
    _buildHandler(controller, route) {
      return (req, res, next) => {
        // Use sanitizer
        const sanitizer = route.sanitizer;
        if (sanitizer) {
          _.forEach(sanitizer, (defs, field) => {
            _.forEach(defs, (val, key) => {
              if (_.isPlainObject(val)) {
                req.sanitize(field)[key].call(req.sanitize(field), val);
              } else if (val === true) {
                req.sanitize(field)[key].call(req.sanitize(field));
              }
            });
          });
        }

        // Use validator
        const validator = route.validator;
        if (validator) {
          req.check(validator);
          if (req.validationErrors().length) {
            return next(new Error('Validation Error.'));
          }
        }

        // Omit disallowed params
        req.blacklist = route.blacklist || [];
        if (req.blacklist.length) {
          req.params = _.omit(req.params, req.blacklist);
          req.query = _.omit(req.query, req.blacklist);
          req.body = _.omit(req.body, req.blacklist);
        }

        // Pick allowed params
        req.whitelist = route.whitelist || [];
        if (req.whitelist.length) {
          req.params = _.pick(req.params, req.whitelist);
          req.query = _.pick(req.query, req.whitelist);
          req.body = _.pick(req.body, req.whitelist);
        }

        // Execute the route for the request
        return route.action.call(controller, req, res, next);
      };
    },
  });

  return router;
};
