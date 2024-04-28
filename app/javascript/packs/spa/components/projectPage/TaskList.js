import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import DateBar from "./DateBar";
import { DateTime } from "luxon"
import SearchBar from '../common/SearchBar';
import DragScroll from "../common/DragScroll";
import Task from "./task";

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

  return <div className="card-body">
    <DragScroll>
      <div className="schedule-body grid" style={mainGridTemplate}>
        <div className="sticky-top date-bar-bg" style={{gridColumn: 2, gridRow: 1}}>
          <DateBar gridTemp={gridTemp} scale={scale} taskCardOffset={taskCardWidth} />
        </div>
        <div className="sticky-top sticky-left search-box-border" style={{gridColumn: 1, gridRow: 1, zIndex: "1025", paddingRight: "10px", alignContent: "center", verticalAlignContent: "center"}}>
          <SearchBar
            unfilteredArray={tasks}
            searchKey={"name"}
            setFilteredArray={setSearchedTasks}
            className={"form-control-sm"}
            style={{marginBottom: "10px"}}
          />
        </div>
        <div
          className="grid-background"
          style={{gridColumn: 2, gridRow: 2, ...bgFormat()}}
        />
        <div style={{gridColumn: "1 / span 2", gridRow: 2}}>
          <div style={{width: `${(duration * cellSize) + taskCardWidth}px`}}>
            {tasks?.length > 0 && (
              _.map(_.sortBy(searchedTasks, "start_date"), (task, index) => (
                <Task task={task} index={index} mainGridTemplate={mainGridTemplate} gridTemp={gridTemp} key={task.id}/>
              ))
            )}
          </div>
        </div>
      </div>
    </DragScroll>
    <div className="card-body text-center">
      <button className="btn btn-sm btn-outline-info" onClick={() => (changeScale("day"))} > Day </button>
      <button className="btn btn-sm btn-outline-info" onClick={() => (changeScale("month"))} > Month </button>
    </div>
  </div>
}
