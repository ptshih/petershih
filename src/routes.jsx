import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Components
import App from './components/app/app';
import Root from './components/root/root';
import Lunchbox from './components/lunchbox/lunchbox';
import NotFound from './components/not-found/not-found';

// Router Middleware
function onEnter(nextState, replace, callback) {
  // Google Analytics
  // if (window.ga) {
  //   window.ga('set', 'page', nextState.location.pathname + nextState.location.search);
  //   window.ga('send', 'pageview');
  // }

  callback();
}

function onEnterNotFound(nextState, replace, callback) {
  callback();
}

const Routes = (
  <Route path="/" component={App}>
    {/* Default */}
    <IndexRoute component={Root} onEnter={onEnter} />

    {/* Routes */}
    <Route path="lunchbox" component={Lunchbox} onEnter={onEnter} />

    {/* Not Found */}
    <Route path="*" component={NotFound} onEnter={onEnterNotFound} />
  </Route>
);

export default Routes;
