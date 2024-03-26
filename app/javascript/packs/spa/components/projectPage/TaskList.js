import React, { useState } from "react";
import { useSelector } from 'react-redux';
import DateBar from "./DateBar";

const projectScale = {
  "day": 40,
  "Week": 10,
  "month": 5,
  "year": .75
}
// const projectScaleEM = {
//   "day": "2.5em",
//   "Week": ".625em",
//   "month": ".3175em",
//   "Year": ".0635em"
// }

export default function TaskList() {
  const tasks = useSelector((state) => state.tasks)
  const duration = useSelector((state) => state.project?.duration)
  const columnOffset = 1
  const [cellSize, setCellSize] = useState(projectScale["day"])
  const [scale, setScale] = useState("day")
  const gridTemp = {
    gridTemplateColumns: `250px repeat(${duration}, ${cellSize}px)`,
    width: `${(duration * cellSize) + 250}px`
  }

  const changeScale = (newScale) => {
    setCellSize(projectScale[newScale])
    setScale(newScale)
  }

  const taskIndexes = (task) => {
    var start = task.date_index["start"] + columnOffset
    var stop = task.date_index["stop"] + columnOffset
    return {"--start": start, "--stop": stop}
  }

  // temp custom color place holder
  const color = (val) => {
    const colors = {
      0: "rgb(68, 45, 87)",
      1: "rgb(45, 48, 87)",
      2: "rgb(87, 45, 49)"
    }
    return {"--bar-color": colors[val % 3]}
  }

  return <div className="card-body">
    <div className="schedule-body">
      <DateBar gridTemp={gridTemp} scale={scale} />
      <div style={{marginTop: "10px"}}>
        {tasks?.length > 0 ? (
          _.map(_.sortBy(tasks, "start_date"), (task, index) => (
            <div key={task.id} className="grid" style={gridTemp}>
              <div className="sticky-left" style={{backgroundColor: "var(--bs-card-bg)"}}>{task.name}</div>
              <h4 className={"schedule_bar"} style={{...taskIndexes(task), ...color(index)}} />
            </div>
          ))
        ) : (
          <h4 className="card-title">No tasks for this project</h4>
        )}
      </div>
    </div>
    <div className="card-body text-center">
      <button className="btn btn-sm btn-outline-info" onClick={() => (changeScale("day"))} > Day </button>
      <button className="btn btn-sm btn-outline-info" onClick={() => (changeScale("month"))} > Month </button>
      {/* <button className="btn btn-sm btn-outline-info" onClick={() => (changeScale("year"))} > Year </button> */}
    </div>
  </div>
}
