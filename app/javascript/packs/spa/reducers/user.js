export default function userReducer(state=null, action) {
  switch (action.type) {
    case 'user/received':
      return action.user;
    case 'user/signedOut':
      return null;
    case 'user/project_deleted':
      return {...state, projects: [..._.pull(state.projects, _.find(state.projects, ['id', action.project.project_id]))]};
    case 'user/project_added':
      return {...state, projects: [...state.projects, action.project]};
      default:
      return state;
    }
}
