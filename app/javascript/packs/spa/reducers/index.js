import { combineReducers } from 'redux';
import user from './user';
import project from './projects';

export default combineReducers({
  user,
  project
});