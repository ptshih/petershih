import 'babel-polyfill';

// Load Stylesheets with Webpack
// The `!!` means ignore any loaders defined in webpack config
// import '!!style!css!sass!./theme/global.scss';
import './theme/global.scss';

// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';

// Router
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';

// Initialize Store
const store = configureStore(window.__INITIAL_STATE__);
window.store = store;

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// Custom creation fn to pass down store in props to every component
// https://github.com/reactjs/react-router/issues/1857
const createElement = (Component, elementProps) => {
  // Fetch Component if applicable
  if (Component.fetchData) {
    const { params, location } = elementProps;
    Component.fetchData({ store, params, location });
  }
  return <Component store={store} {...elementProps} />;
};

function render() {
  ReactDOM.render((
    <Provider store={store}>
      <Router history={history} createElement={createElement} routes={routes} />
    </Provider>
  ), document.getElementById('app'));
}

// Run the application when both DOM is ready and page content is loaded
if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
  render();
} else {
  document.addEventListener('DOMContentLoaded', render, false);
}
