import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import project from './projects';
import tasks from './tasks';

export default combineReducers({
  user,
  users,
  project,
  tasks
});
