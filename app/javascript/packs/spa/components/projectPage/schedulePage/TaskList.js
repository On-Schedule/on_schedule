import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import DateBar from "./DateBar";
import { DateTime } from "luxon"
import SearchBar from '../../common/SearchBar';
import DragScroll from "../../common/DragScroll";
import TaskItem from "./TaskItem";
import NewTaskFormV2 from "./NewTaskFormV2";

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

export default function TaskList({edit=false}) {
  const tasks = useSelector((state) => state.tasks)
  const [searchedTasks, setSearchedTasks] = useState([])
  const project = useSelector((state) => state.project)
  const duration = useSelector((state) => state.project?.duration)
  const taskCardWidth = 250
  const [cellSize, setCellSize] = useState(projectScale["day"])
  const [scale, setScale] = useState("day")
  const scrollElementRef = useRef(null)
  const gridTemp = {
    gridTemplateColumns: `repeat(${duration}, ${cellSize}px)`,
  }
  const mainGridTemplate = {
    gridTemplateColumns: `${taskCardWidth}px ${duration * cellSize}px`,
    gridTemplateRows: "max-content auto"
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

  return <div style={{height: "100%"}}>
    <div ref={scrollElementRef} className="schedule-body grid" style={mainGridTemplate}>
      <DragScroll scrollElementRef={scrollElementRef} style={{gridColumn: "2", gridRow: "2", zIndex: "600"}} />
      <div className="sticky-top date-bar-bg" style={{gridColumn: 2, gridRow: 1, zIndex: "1025"}}>
        <DateBar gridTemp={gridTemp} scale={scale} taskCardOffset={taskCardWidth} />
      </div>
      <div className="sticky-top sticky-left task-items-search-box">
        <SearchBar
          unfilteredArray={tasks}
          searchKey={"name"}
          setFilteredArray={setSearchedTasks}
          className={"form-control-sm"}
          style={{marginBottom: "10px"}}
        />
      </div>
      <div
        className="project-grid-background"
        style={{gridColumn: 2, gridRow: 2, ...bgFormat()}}
      />
      <div style={{gridColumn: "1 / span 2", gridRow: 2}}>
        {(project?.template && Object.keys(project.template).length > 0) && <div className="card sticky-left" style={{maxWidth: "85vw", width: "1075px", padding: "10px", zIndex: "1024"}}>
          {_.map(project?.template, (task, key) => (
            <div key={key}>
              <NewTaskFormV2 labels={false} task={task} templateKey={key} projectID={project?.id} style={{maxWidth: "85vw", width:"1075px"}} />
            </div>
          ))}
        </div>}
        {tasks?.length > 0 && (
          _.map(_.orderBy(searchedTasks, ['start_date'], ['asc']), (task) => (
            <TaskItem task={task} mainGridTemplate={mainGridTemplate} gridTemp={gridTemp} taskCardWidth={taskCardWidth} key={task.id}/>
          ))
        )}
      </div>
    </div>
    <div className="card-body text-center card-footer">
      <button className="btn btn-sm btn-outline-info" onClick={() => (changeScale("day"))} > Day </button>
      <button className="btn btn-sm btn-outline-info" onClick={() => (changeScale("month"))} > Month </button>
    </div>
  </div>
}
