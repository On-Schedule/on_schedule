import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import project from './projects';

export default combineReducers({
  user,
  users,
  project
});
