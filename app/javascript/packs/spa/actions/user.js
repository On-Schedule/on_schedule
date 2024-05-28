export function loadUser() {
  return async (dispatch, _getState, api) => {
    const {data:user} = await api.get('user');
    dispatch({type: 'user/received', user});
    return user;
  }
}

export function updateUser(fields) {
  return async (dispatch, _getState, api) => {
    const {data:user} = await api.put('user', {user: fields});
    dispatch({type: 'user/received', user});
    return user;
  }
}

export function signOut() {
  return async (dispatch, _getState, api) => {
    const response = await api.delete('user');
    dispatch({type: 'user/signedOut'});
  }
}

export function init() {
  return async (dispatch, _getState, _api) => {
    const user = await dispatch(loadUser());
    // if (user) {
    //   dispatch(loadProjects());
    // }
  }
}
