import React from "react";
import { useSelector } from 'react-redux';

export default function TaskList() {
  const project = useSelector((state) => state.project)
  const tasks = useSelector((state) => state.project?.tasks)

  return <div className="card-body">
    <div className="schedule-grid" style={{gridTemplate: `repeat(${project?.tasks.length}, 1fr) / repeat(${project?.duration}, 50px)`}}>
      {tasks ? (
        _.map(tasks, (task, index) => (
          <h4 key={task.id} className={`grid-${index % 3}`} style={{gridRow: `${index + 1}`, gridColumn: `${task.chart_index_values["start"]} / span ${task.chart_index_values["stop"]}`}}>{task.name} ({task.start_date} - {task.end_date})</h4>
        ))
      ) : (
        <h4 className="card-title">No tasks for this project</h4>
      )}
    </div>
  </div>
}
