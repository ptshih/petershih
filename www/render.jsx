import fs from 'fs';
import path from 'path';

// React
import React from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';

// Router
import { match } from 'react-router';
import routes from './routes';

// Redux
import { Provider } from 'react-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import configureStore from '../www/store/configure-store';

// API service
import api from './core/api';

module.exports = (env) => {
  // Webpack assets manifest
  // To support Webpack hot reloading, they are only cached in production
  let assets;

  return {
    universal: (req, res, next) => {
      if (!assets || process.env.NODE_ENV !== 'production') {
        try {
          assets = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/manifest.json')));
        } catch (err) {
          next(err);
          return;
        }
      }

      // Initialize Store
      const store = configureStore();

      // https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
      match({
        routes,
        location: req.url,
      }, (routeError, redirectLocation, renderProps) => {
        if (routeError) {
          next(routeError);
          return;
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search);
          return;
        } else if (!renderProps) {
          res.status(404).send('Not found');
          return;
        }

        loadOnServer({ ...renderProps, store, helpers: { api } }).then(() => {
          // Render Component to an html string
          const html = ReactDOM.renderToString((
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          ));

          // Get `<head>` values defined in `react-helmet` on the client side
          const head = Helmet.rewind();

          // Render express view
          return res.render('html', {
            env,
            head,
            html,
            assets,
            initialState: store.getState(),
          });
        });
      });
    },

    spa: (req, res, next) => {
      if (!assets || process.env.NODE_ENV !== 'production') {
        try {
          assets = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/manifest.json')));
        } catch (err) {
          next(err);
          return;
        }
      }

      // Render express view
      res.render('html', {
        env,
        assets,
      });
    },
  };
};
