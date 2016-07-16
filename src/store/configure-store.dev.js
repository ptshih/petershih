import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from '../reducers';
// import apiMiddleware from '../middleware/api';
// import apiService from '../services/api';

export default function configureStore(initialState) {
  // Optionally pass second argument for initialState
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        // apiMiddleware(apiService),
        createLogger()
      )
      // window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}
