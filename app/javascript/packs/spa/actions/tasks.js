export function newTask(details, projectID) {
  return async (dispatch, _getState, api) => {
    const {data:task} = await api.post(`projects/${projectID}/tasks`, {"task": details});
    dispatch({type: "task/received", task});
    return task;
  }
}

export function newTaskFromTemplate(details, projectID, templateKey) {
  return async (dispatch, _getState, api) => {
    const {data:task} = await api.post(`projects/${projectID}/task_from_template`, {"task": details, "templateKey": templateKey});
    dispatch({type: "task/received", task});
    return task;
  }
}

export function updateTask(details, projectID, taskID) {
  return async (dispatch, _getState, api) => {
    const {data:task} = await api.patch(`projects/${projectID}/tasks/${taskID}`, {"task": details});
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
