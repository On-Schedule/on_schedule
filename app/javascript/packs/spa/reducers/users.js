export default function usersReducer(state=[], action) {
  switch (action.type) {
    case 'users/received':
      return [...action.users];
    default:
      return state;
    }
}
