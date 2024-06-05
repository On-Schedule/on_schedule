export default function toDosReducer(state={}, action) {
  switch (action.type) {
    case "toDos/received":
      return action.toDos;
    case "toDo/received":
      return {...state, [action.toDo.status]: _.uniqBy([action.toDo, ...state[action.toDo.status]], "id")};
    default:
      return state;
  }
}
