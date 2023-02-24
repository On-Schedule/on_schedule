export function loadUser() {
  return async (dispatch, getState, api) => {
    const {data:user} = await api.get('users');
    dispatch({type: 'user/recieved'});
    return user;
  }
}
export function updateUser(fields) {
  return async (dispatch, getState, api) => {
    const {data:user} = await api.put('user', {user: fields});
    dispatch({type: 'user/recieved', user});
    return user;
  }
}

export function Login() {
  return async (dispatch, getState, api) => {
    const response = await api.post('user');
    dispatch({type: 'user/login'});
  }
}

export function signOut() {
  return async (dispatch, getState, api) => {
    const response = await api.delete('user');
    dispatch({type: 'user/signedOut'});
  }
}

export function init() {
  return async (dispatch, getState, api) => {
    const user = await dispatch(loadUser());
    // if (user) {
    //   dispatch(loadProjects());
    // }
  }
}