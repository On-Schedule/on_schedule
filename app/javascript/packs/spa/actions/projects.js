export function newProject(details) {
  return async (dispatch, getState, api) => {
    const {data:project} = await api.post('projects', {'project': details});
    dispatch({type: 'project/received', project});
    return project;
  }
}

export function getProject(project_id) {
  return async (dispatch, getState, api) => {
    const {data:project} = await api.get(`projects/${project_id}`);
    dispatch({type: 'project/received', project});
    return project;
  }
}
