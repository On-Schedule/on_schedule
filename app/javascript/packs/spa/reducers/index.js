import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import project from './projects';
import archivedProjects from './archivedProjects';
import tasks from './tasks';
import templates from './templates';
import analytics from './analytics';
import toDos from './toDos';

export default combineReducers({
  user,
  users,
  project,
  archivedProjects,
  tasks,
  templates,
  analytics,
  toDos
});
