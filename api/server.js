/**
 * This Express vhost serves the api code.
 */

// Dependencies
import nconf from 'nconf';
import express from 'express';
import uuid from 'uuid';

// Express Middleware
import helmet from 'helmet';
import morgan from 'morgan';

// Connect to the database
require('./config/db').connect();

// Load API routes
const routes = require('./routes');

// Add morgan token `:id` mapped to `req.id`
morgan.token('id', (req) => req.id);

// Create Express App
const app = express();

// Request attributes
app.use((req, res, next) => {
  // Assign a unique request ID
  req.id = uuid.v4();

  // Enable mock api requests if mongodb is not connected
  req.mock = !nconf.get('MONGODB_URL');

  // TODO: force mock api
  req.mock = true;

  next();
});

// Helmet HTTP headers
// Why? Vhost adds `X-Powered-By: Express` again
app.use(helmet());

// Enable Logging
app.use(morgan('[api] :method :url :status - :response-time ms - :id'));

// Mount api routes
// Can also pass `wss` as second param
app.use('/', routes(app));

module.exports = app;
