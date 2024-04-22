export default function projectReducer(state=null, action) {
  switch (action.type) {
    case 'project/received':
      return action.project;
    default:
      return state;
    }
}
