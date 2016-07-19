/**
 * This is the main Express app serving 2 vhosts.
 *
 * - backend api
 * - frontend app
 */

// Constants
// const ONEYEAR = 31536000000;
const ONEDAY = 86400000;

// Dependencies
import http from 'http';
import express from 'express';
import vhost from 'vhost';

// Express Middleware
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

// Load environment
// Load loggers
import { env } from 'nodemigo';

// Virtual hosts
const api = require('./api/server.js');
const www = require('./www/server.js');

// Create Express App
const app = express();

// HTTPS Forwarding
app.enable('trust proxy');

// Helmet HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors({
  maxAge: ONEDAY,
}));

// Gzip compression (needs to be before static to compress assets)
app.use(compression());

// API Virtual Host
app.use(vhost(env.API_VHOST, api));

// Fallback to www vhost
app.all('*', www);

// Fallback to 404 (unused)
app.all('*', (req, res) => {
  res.status(200).send('Hello from the void!');
});

// Start the HTTP server
const server = http.createServer(app);
server.listen(env.PORT, () => {
  console.log(`\nExpress Server [PORT: ${env.PORT}] [NODE_ENV: ${env.NODE_ENV}]\n`);
});
