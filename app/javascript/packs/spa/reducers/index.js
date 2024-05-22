import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import project from './projects';
import tasks from './tasks';
import templates from './templates';

export default combineReducers({
  user,
  users,
  project,
  tasks,
  templates
});
