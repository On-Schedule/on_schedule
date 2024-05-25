export function newTask(details, projectID, templateKey) {
  return async (_dispatch, _getState, api) => {
    const {data:task} = await api.post(`projects/${projectID}/tasks`, {"task": details, "template_key": templateKey});
    // dispatch({type: "task/received", task}); //dispatched via ActionCable
    return task;
  }
}

export function updateTask(details, projectID, taskID) {
  return async (_dispatch, _getState, api) => {
    const {data:task} = await api.patch(`projects/${projectID}/tasks/${taskID}`, {"task": details});
    // dispatch({type: "task/received", task}); //dispatched via ActionCable
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
