import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from '../reducers';
import apiMiddleware from '../middleware/api';
import api from '../core/api';

export default function configureStore(initialState) {
  const middleware = [thunkMiddleware, apiMiddleware(api)];
  if (process.env.BROWSER) {
    middleware.push(createLogger());
  }
  // Optionally pass second argument for initialState
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middleware)
      // window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}
