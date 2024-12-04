export default function tasksReducer(state=[], action) {
  switch (action.type) {
    case "tasks/received":
      return action.tasks;
    case "task/received":
      return _.uniqBy([action.task, ...state], "id");
    case "task/deleted":
      return [..._.pull(state, _.find(state, ['id', action.task.id]))];
    default:
      return state;
  }
}
