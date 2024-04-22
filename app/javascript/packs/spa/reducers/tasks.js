export default function tasksReducer(state=[], action) {
  switch (action.type) {
    case "tasks/received":
      return action.tasks;
    case "task/received":
      return [action.task, ...state];
    default:
      return state;
  }
}
