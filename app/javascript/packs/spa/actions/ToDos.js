export function newToDo(details) {
  return async (_dispatch, _getState, api) => {
    const {data:toDo} = await api.post(`to_dos`, {"to_do": details});
    return toDo;
  }
}

export function updateToDo(toDoID, details) {
  return async (_dispatch, _getState, api) => {
    const {data:toDo} = await api.patch(`to_dos/${toDoID}`, {"to_do": details});
    return toDo;
  }
}
