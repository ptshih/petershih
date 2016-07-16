const fs = require('fs');
const path = require('path');

const assetsPath = path.join(__dirname, '..', 'assets.json');

// React
import React from 'react';
import ReactDOM from 'react-dom/server';

// Router
import { RouterContext, match } from 'react-router';
import routes from '../routes';

// Redux
import { Provider } from 'react-redux';
import configureStore from '../store/configure-store';

// Assets are cached for `production` only
let cachedAssets;

module.exports = (env) => (req, res, next) => {
  // Assets are ready to render
  function finishRenderIndex(assets) {
    // Initialize Store
    const store = configureStore();

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

      // TODO: Fetch component(s) data
      // console.log(renderProps.components)

      // Render Component to an html string
      const html = ReactDOM.renderToString((
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      ));

      // Render express view
      return res.render('app', {
        title: 'Peter Shih',
        env,
        html,
        assets,
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
