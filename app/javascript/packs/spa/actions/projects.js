export function newProject(details) {
  return async (dispatch, getState, api) => {
    const {data:project} = await api.post('projects', {'project': details});
    dispatch({type: 'project/recieved', project});
    return project;
  }
}
