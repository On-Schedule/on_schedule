import React from "react";
import { useSelector } from 'react-redux';
import DateBar from "./DateBar";

export default function TaskList() {
  const project = useSelector((state) => state.project)
  const tasks = useSelector((state) => state.project?.tasks)
  const offsetColumn = 1
  const offsetRow = 1

  return <div className="card-body">
    <div className="schedule-grid" style={{gridTemplate: `repeat(${project?.tasks.length + offsetRow}, 1fr)`}}>
      <DateBar />
      {tasks?.length > 0 ? (
        _.map(tasks, (task, index) => (
          <div key={task.id} className="sub-grid" style={{gridRow: `${index + 1 + offsetRow}`, gridTemplateColumns: `200px repeat(${project?.duration}, 50px)`}}>
            <div> {task.name} ({task.start_date} - {task.end_date})</div>
            <h4 className={`grid-${index % 3}`} style={{gridRow: "1", gridColumn: `${task.chart_index_values["start"] + offsetColumn} / span ${task.chart_index_values["stop"] + offsetColumn}`}}>
              {task.name} ({task.start_date} - {task.end_date})
            </h4>
          </div>
        ))
      ) : (
        <h4 className="card-title">No tasks for this project</h4>
      )}
    </div>
  </div>
}
