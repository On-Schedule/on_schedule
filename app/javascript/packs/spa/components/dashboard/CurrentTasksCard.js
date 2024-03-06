import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CurrentTasksCard() {
  const tasks = useSelector((state) => state.user?.tasks)

  return <>
    <div className="card border-primary mb-3 mx-md-2">
      <div className="card-header navbar">
        <h4>Tasks</h4>
      </div>
      <div className="card-body">
        {tasks ? (
          _.map(tasks, (task) => (
            <h4 key={task.id}>
              <Link to={`/projects/${task.project.id}`} className="btn btn-outline-success btn-lg d-flex">
                {task.name} ({task.project.name})
              </ Link>
            </h4>
          ))
        ) : (
          <h4 className="card-title">No tasks this week</h4>
        )}
      </div>
    </div>
  </>
}
