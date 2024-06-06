export default function toDosReducer(state={}, action) {
  switch (action.type) {
    case "toDos/received":
      return action.toDos;
    case "toDo/received":
      return _.mapValues(state, (value, key) => {
        if (key != action.toDo.status) {
          return _.filter(value, (item) => {return item.id != action.toDo.id})
        } else {
          return _.uniqBy([action.toDo, ...value], "id")
        }
      })
    default:
      return state;
  }
}
