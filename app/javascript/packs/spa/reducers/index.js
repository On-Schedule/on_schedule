import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import project from './projects';
import tasks from './tasks';
import templates from './templates';
import analytics from './analytics';
import toDos from './toDos';

export default combineReducers({
  user,
  users,
  project,
  tasks,
  templates,
  analytics,
  toDos
});
