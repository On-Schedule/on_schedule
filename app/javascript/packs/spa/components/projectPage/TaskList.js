import React from "react";
import { useSelector } from 'react-redux';
import DateBar from "./DateBar";

export default function TaskList() {
  const project = useSelector((state) => state.project)
  const tasks = useSelector((state) => state.project?.tasks)
  const offset = 1
  const duration = project?.duration
  const cellSize = 50
  const gridTemp = {
    gridTemplateColumns: `250px repeat(${duration}, ${cellSize}px)`,
    width: `${(duration * cellSize) + 250}px`
  }

  const taskIndexes = (task) => {
    var start = task.date_index["start"] + offset
    var stop = task.date_index["stop"] + offset
    return {"--start": start, "--stop": stop}
  }

  return <div className="card-body">
    <div className="schedule-body">
      <DateBar gridTemp={gridTemp} />
      <div style={{marginTop: "10px"}}>
        {tasks?.length > 0 ? (
          _.map(_.sortBy(tasks, 'start_date'), (task, index) => (
            <div key={task.id} className="grid" style={gridTemp}>
              <div className="sticky-left" style={{backgroundColor: "var(--bs-card-bg)"}}>{task.name}</div>
              <h4 className={`schedule_bar color-${index % 3}`} style={taskIndexes(task)} />
            </div>
          ))
        ) : (
          <h4 className="card-title">No tasks for this project</h4>
        )}
      </div>
    </div>
  </div>
}
