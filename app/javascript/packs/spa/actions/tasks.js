export function newTask(details, projectID) {
  return async (dispatch, _getState, api) => {
    const {data:task} = await api.post(`projects/${projectID}/tasks`, {"task": details});
    dispatch({type: "task/received", task});
    return task;
  }
}

export function getTasks(projectID) {
  return async (dispatch, _getState, api) => {
    const {data:tasks} = await api.get(`projects/${projectID}/tasks`);
    dispatch({type: "tasks/received", tasks});
    return tasks;
  }
}
