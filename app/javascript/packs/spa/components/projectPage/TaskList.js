import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import DateBar from "./DateBar";
import { DateTime } from "luxon"
import SearchBar from '../common/SearchBar';
import Draggable from "../common/Draggable";

const projectScale = {
  "day": 35,
  "Week": 10,
  "month": 5,
  "year": .75
}

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
]

export default function TaskList() {
  const tasks = useSelector((state) => state.tasks)
  const [searchedTasks, setSearchedTasks] = useState([])
  const project = useSelector((state) => state.project)
  const duration = useSelector((state) => state.project?.duration)
  const taskCardWidth = 250
  const [cellSize, setCellSize] = useState(projectScale["day"])
  const [scale, setScale] = useState("day")
  const gridTemp = {
    gridTemplateColumns: `repeat(${duration}, ${cellSize}px)`,
    width: `${(duration * cellSize)}px`
  }
  const mainGridTemplate = {
    gridTemplateColumns: `${taskCardWidth}px ${duration * cellSize}px`,
  }

  const changeScale = (newScale) => {
    setCellSize(projectScale[newScale])
    setScale(newScale)
  }

  const taskIndexes = (task) => {
    var start = task.date_index["start"]
    var stop = task.date_index["stop"]
    return {"--start": start, "--stop": stop}
  }

  const bgFormat = () => {
    var formatVars = {}
    if (scale === "month") {
      formatVars["--scale"] = `${cellSize * 7}px`
    } else {
      formatVars["--scale"] = `${cellSize}px`
      const weekday = DateTime.fromISO(project?.start_date).weekday - 1
      var weekOrder = daysOfWeek.slice(weekday)
      weekOrder.push(...(daysOfWeek.slice(0, weekday)))
      _.map(weekOrder, (day, index) => {
        if (!_.includes(project?.schedule.days, day)) {
          formatVars[`--day${index}`] = "#2a2a2a50"
        }
      })
    }
    return formatVars
  }

  useEffect(() => {
    setSearchedTasks(tasks)
  }, [tasks])

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
    <Draggable>
      <div className="schedule-body grid" style={mainGridTemplate}>
        <div className="sticky-top" style={{gridColumn: 2, gridRow: 1, backgroundColor: "var(--bs-card-bg)"}}>
          <DateBar gridTemp={gridTemp} scale={scale} taskCardOffset={taskCardWidth} />
        </div>
        <div className="sticky-top sticky-left" style={{gridColumn: 1, gridRow: 1, backgroundColor: "var(--bs-card-bg)", zIndex: "1025", paddingRight: "10px", alignContent: "center", verticalAlignContent: "center"}}>
          <SearchBar unfilteredArray={tasks} searchKey={"name"} setFilteredArray={setSearchedTasks} />
        </div>
        <div style={{gridColumn: "1 / span 2", gridRow: 2}}>
          <div style={{width: `${(duration * cellSize) + taskCardWidth}px`}}>
            {tasks?.length > 0 && (
              _.map(_.sortBy(searchedTasks, "start_date"), (task, index) => (
                <div key={task.id} className="grid" style={mainGridTemplate}>
                  <div className="sticky-left task-items" style={{backgroundColor: "var(--bs-card-bg)"}}>{task.name}</div>
                  <div className="grid grid-background" style={{...gridTemp, ...bgFormat()}}>
                    <div className={"schedule_bar"} style={{...taskIndexes(task), ...color(index)}} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Draggable>
    <div className="card-body text-center">
      <button className="btn btn-sm btn-outline-info" onClick={() => (changeScale("day"))} > Day </button>
      <button className="btn btn-sm btn-outline-info" onClick={() => (changeScale("month"))} > Month </button>
    </div>
  </div>
}
