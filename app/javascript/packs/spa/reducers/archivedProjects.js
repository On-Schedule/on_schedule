export default function archivedProjectsReducer(state=null, action) {
  switch (action.type) {
    case 'archivedProjects/received':
      return action.projects;
    default:
      return state;
    }
}
