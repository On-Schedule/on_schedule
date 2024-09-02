import { getTasks } from 'actions/tasks'

export function newProject(details, templateID) {
  return async (dispatch, _getState, api) => {
    const {data:project} = await api.post('projects', {'project': details, 'template': templateID});
    dispatch({type: 'project/received', project});
    return project;
  }
}

export function getProject(projectID) {
  return async (dispatch, _getState, api) => {
    const {data:project} = await api.get(`projects/${projectID}`);
    dispatch({type: 'project/received', project});
    if (project) {
      dispatch(getTasks(projectID))
      dispatch({type: 'toDos/received', toDos: project.to_dos})
    }
    return project;
  }
}

export function archiveProject(projectID) {
  return async (_dispatch, _getState, api) => {
    const {data:project} = await api.delete(`projects/${projectID}/archive`);
    return project;
  }
}

export function updateProjectUsers(projectID, users) {
  return async (_dispatch, _getState, api) => {
    const {data:project} = await api.patch(`projects/${projectID}/update_users`, {'users': users})
    return project
  }
}

// ARCHIVED PROJECT ACTIONS

export function getArchivedProjects() {
  return async (dispatch, _getState, api) => {
    const {data:projects} = await api.get(`projects/archived`);
    dispatch({type: 'archivedProjects/received', projects});
    return projects;
  }
}

export function restoreProject(projectID) {
  return async (_dispatch, _getState, api) => {
    const {data:project} = await api.patch(`projects/${projectID}/restore`);
    return project;
  }
}