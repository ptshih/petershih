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

// Webpack assets manifest
import assets from '../assets/manifest';

module.exports = (env) => (req, res, next) => {
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

      // Get `<head>` values defined in `react-helmet` on the client side
      const head = Helmet.rewind();

      // Render express view
      return res.render('app', {
        env,
        head,
        html,
        assets,
        initialState: store.getState(),
      });
    });
  });
};
