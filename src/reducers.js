import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import root from './components/root/redux';

export default combineReducers({
  routing: routerReducer,
  root,
});
