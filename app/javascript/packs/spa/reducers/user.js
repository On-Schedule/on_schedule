export default function userReducer(state=null, action) {
  switch (action.type) {
    case 'user/received':
      return action.user;
    case 'user/signedOut':
      return null;
    default:
      return state;
    }
}
