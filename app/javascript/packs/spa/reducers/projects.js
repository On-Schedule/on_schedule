export default function projectReducer(state=null, action) {
  switch (action.type) {
    case 'project/recieved':
      return action.project;
    default:
      return state;
    }
}
