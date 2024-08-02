export function getUsers() {
  return async (dispatch, _getState, api) => {
    const {data:users} = await api.get("company/users");
    dispatch({type: 'users/received', users});
    return users;
  }
}

export function getProjectUsers(projectID) {
  return async (dispatch, _getState, api) => {
    const {data:users} = await api.get(`projects/${projectID}/project_users`);
    dispatch({type: 'users/received', users});
    return users;
  }
}
