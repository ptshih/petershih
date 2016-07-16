import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';
// import apiMiddleware from '../middleware/api';
// import apiService from '../services/api';

export default function configureStore(initialState) {
  // Optionally pass second argument for initialState
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      // apiMiddleware(apiService)
    )
  );

  return store;
}
