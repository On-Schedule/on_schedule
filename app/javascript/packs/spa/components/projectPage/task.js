import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

export default function Task({task, index, mainGridTemplate, gridTemp}) {
  const [openAccordion, setOpenAccordion] = useState(false)

  const taskIndexes = (task) => {
    var start = task.date_index["start"]
    var stop = task.date_index["stop"]
    return {"--start": start, "--stop": stop}
  }

  const color = (val) => {
    const colors = {
      0: "rgb(68, 45, 87)",
      1: "rgb(45, 48, 87)",
      2: "rgb(87, 45, 49)"
    }
    return {"--bar-color": colors[val % 3]}
  }

  return <div className="grid" style={mainGridTemplate}>
    <div className="sticky-left">
      <div className="task-items">
        <span style={{paddingLeft: "5px", paddingRight: "5px"}} onClick={() => {setOpenAccordion(!openAccordion)}}>
          <FontAwesomeIcon
            icon={faChevronUp}
            className={openAccordion ? "flip" : "un-flip"}
          />
        </span>
        {task.name}
      </div>
      <div className={openAccordion ? "open" : "close"}>
        <div className="task-items-expand">
          <div style={{paddingTop: "5px", paddingBottom: "10px"}}>
            Start Date: {task.start_date} <br/>
            End Date: {task.end_date} <br/>
            Cost Code: {task.cost_code} <br/>
            Hours: {task.hours} <br/>
            Average Daily Manpower: {task.daily_manpower}<br/>
            Total days: {task.total_days}<br/>
            Working Days: {task.working_days}<br/>
          </div>
        </div>
      </div>
    </div>
    <div className="grid" style={gridTemp}>
      <div className="schedule_bar" style={{...taskIndexes(task), ...color(index), height: "13px"}} />
    </div>
  </div>
}