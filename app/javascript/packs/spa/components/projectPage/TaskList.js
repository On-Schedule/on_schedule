import React from "react";
import { useSelector } from 'react-redux';

export default function TaskList() {
  const tasks = useSelector((state) => state.project?.tasks)
  return <div className="card border-primary mb-3">
    <div className="card-header navbar">
      <h2>Task List</h2>
    </div>
    <div className="card-body">
      {tasks ? (
        _.map(tasks, (task) => (
          <h4 key={task.id}>{task.name}</h4>
        ))
      ) : (
        <h4 className="card-title">No tasks for this project</h4>
      )}
    </div>
  </div>
}
