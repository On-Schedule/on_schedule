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

export function updateProjectUsers(projectID, users) {
  return async (_dispatch, _getState, api) => {
    const {data:project} = await api.patch(`projects/${projectID}/update_users`, {'users': users})
    return project
  }
}
