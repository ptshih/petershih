import fs from 'fs';
import path from 'path';

// React
import React from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';

// Router
import { RouterContext, match } from 'react-router';
import routes from '../src/routes';

// Redux
import { Provider } from 'react-redux';
import configureStore from '../src/store/configure-store';

// Assets are cached for `production` only
const assetsPath = path.join(__dirname, '..', 'assets.json');
let cachedAssets;

module.exports = (env) => (req, res, next) => {
  // Assets are ready to render
  function finishRenderIndex(assets) {
    // Initialize Store
    const store = configureStore();

    // https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
    match({
      routes,
      location: req.url,
    }, (routeError, redirectLocation, renderProps) => {
      if (routeError) {
        return next(routeError);
      } else if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (!renderProps) {
        return res.status(404).send('Not found');
      }

      // Fetch data for all components for route
      const promises = [];
      const { params, location } = renderProps;
      renderProps.components.forEach((Component) => {
        if (Component.fetchData) {
          promises.push(Component.fetchData({ store, params, location }));
        }
      });

      return Promise.all(promises).then(() => {
        // Render Component to an html string
        const html = ReactDOM.renderToString((
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        ));

        const initialState = store.getState();

        const head = Helmet.rewind();

        // Render express view
        return res.render('app', {
          env,
          head,
          html,
          assets,
          initialState,
        });
      });
    });
  }

  // Attempt to start rendering if assets are ready
  function startRenderIndex() {
    fs.readFile(assetsPath, 'utf8', (err, assetsJSON) => {
      if (err) {
        // Try again after 1 second
        setTimeout(() => {
          startRenderIndex();
        }, 1000);
      } else {
        // Cache assets and finish rendering
        cachedAssets = JSON.parse(assetsJSON);
        finishRenderIndex(cachedAssets);
      }
    });
  }

  // If in `production`, try to use cached assets
  if (process.env.NODE_ENV === 'production' && cachedAssets) {
    finishRenderIndex(cachedAssets);
  } else {
    startRenderIndex();
  }
};
