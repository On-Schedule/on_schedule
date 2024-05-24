export function getUsers() {
  return async (dispatch, _getState, api) => {
    const {data:users} = await api.get("company/users");
    dispatch({type: 'users/received', users});
    return users;
  }
}
