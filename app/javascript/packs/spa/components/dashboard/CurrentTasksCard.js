import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function CurrentTasksCard() {
  const tasks = useSelector((state) => state.user?.tasks)

  return <>
    <div className="card border-primary mb-3">
      <div className="card-header navbar">
        <h4>Tasks</h4>
      </div>
      <div className="card-body">
        {tasks ? (
          _.map(tasks, (task) => (
            <h4 key={task.id}>{task.name}</h4>
          ))
        ) : (
          <h4 className="card-title">No tasks this week</h4>
        )}
      </div>
    </div>
  </>
}
