import winston from 'winston';
const logger = winston.loggers.get('api');

import { Router } from 'nodemigo';

// Controllers
const ContactController = require('../components/contact/controller');

module.exports = (app, wss) => {
  // Create the router
  const router = new Router({}, {
    contactController: new ContactController(app, wss),
  });

  // Alias all PATCH to PUT
  router.patch('*', (req, res, next) => {
    // eslint: no-param-reassign
    req.method = 'PUT';
    next();
  });

  // Add controller routes
  router.addControllerRoutes();

  // Stripe Webhooks
  // router.post('/stripe/events', require('api/modules/stripe/webhook'));

  // Catch all route
  router.all('*', (req, res) => {
    logger.warn(`Unknown endpoint accessed - ${req.path} - ${req.ip}.`);
    res.status(200).send('Hello from api!');
    // res.status(404).end();
  });

  return router;
};
