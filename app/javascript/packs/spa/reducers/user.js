export default function userReducer(state=null, action) {
  switch (action.type) {
    case 'user/recieved':
      return action.user;
    case 'user/login':
      return action.user;
    case 'user/signedOut':
      return null;
    default:
      return state;
    }
}