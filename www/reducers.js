import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import root from './components/root/redux';

export default combineReducers({
  routing,
  reduxAsyncConnect,
  root,
});
