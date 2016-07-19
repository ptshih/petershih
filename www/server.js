/**
 * This Express vhost serves the client side app code.
 */

// Only used for universal mode
import 'babel-polyfill';

// Constants
const ONEYEAR = 31536000000;
// const ONEDAY = 86400000;

// Tell any CSS tooling (such as Material UI) to use all vendor prefixes
// if the user agent is not known.
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

// Dependencies
import express from 'express';
import path from 'path';
import httpProxy from 'http-proxy';

// Express Middleware
import helmet from 'helmet';
import favicon from 'serve-favicon';

// Load environment
import { env } from 'nodemigo';

// Render React
import render from './render.jsx';

// Create proxy server
const proxy = httpProxy.createProxyServer();

// Create Express App
const app = express();

// Views
app.set('views', path.join(__dirname));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// Helmet HTTP headers
// Why? Vhost adds `X-Powered-By: Express` again
app.use(helmet());

// Favicon
app.use(favicon(path.join(__dirname, '../public/favicon.ico')));

// Browser Caching
const maxAge = env.NODE_ENV === 'development' ? 0 : ONEYEAR;

// Mount public static assets routes
app.use('/fonts', express.static(path.join(__dirname, '../public/fonts'), {
  maxAge,
}));
app.use('/img', express.static(path.join(__dirname, '../public/img'), {
  maxAge,
}));
app.use('/', express.static(path.join(__dirname, '../public'), {
  maxAge: 0,
}));

// Mount assets route and render app
if (env.NODE_ENV !== 'production') {
  // Proxy routes to webpack-dev-server
  app.all('/assets/*', (req, res) => {
    proxy.web(req, res, {
      target: `http://localhost:${env.PORT + 1}`,
      ignorePath: false,
    });
  });

  // Proxy catch error
  proxy.on('error', (err) => {
    console.error('Could not connect to Webpack with error: %s', err.message);
  });

  app.use(render(env).spa);
} else {
  // Serve from compiled assets
  app.use('/assets', express.static(path.join(__dirname, '../assets'), {
    maxAge,
  }));

  app.use(render(env).universal);
}

module.exports = app;
