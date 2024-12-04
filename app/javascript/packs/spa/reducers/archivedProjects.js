export default function archivedProjectsReducer(state=null, action) {
  switch (action.type) {
    case 'archivedProjects/received':
      return action.projects;
    case 'archivedProjects/restored':
      return [..._.pull(state, _.find(state, ['id', action.project.project_id]))];
    default:
      return state;
    }
}
