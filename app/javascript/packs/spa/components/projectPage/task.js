import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { DateTime } from "luxon";

export default function Task({task, index, mainGridTemplate, gridTemp, taskCardWidth}) {
  const [openAccordion, setOpenAccordion] = useState(false)
  const openTaskItemWidth = 500
  const start_date = DateTime.fromISO(task.start_date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  const end_date = DateTime.fromISO(task.end_date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)

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
      <div className="task-items base-slide-out" style={{width: openAccordion ? `${openTaskItemWidth}px` : `${taskCardWidth}px`}}>
          <FontAwesomeIcon
            icon={faChevronUp}
            className={openAccordion ? "flip" : "un-flip"}
            style={{padding: "0px 5px", color: "var(--bs-gray-700)"}}
            onClick={() => {setOpenAccordion(!openAccordion)}}
          />
        {task.name}
      </div>
      <div className={`base-slide-out ${openAccordion ? "open-task-item" : "close-task-item"}`} style={{"--open-item-width": `${openTaskItemWidth}px`, "--closed-item-width": `${taskCardWidth}px`}}>
        <div className="task-items-expand">
          <div className="card-body" style={{paddingTop: "0px"}}>
            <div style={{backgroundColor: "var(--bs-dark)", padding: "5px 10px 10px"}}>
              Dates: {start_date} - {end_date} <br/>
              Duration: {task.total_days} days ({task.working_days} working days)<br/>
              Average Daily Manpower: {task.daily_manpower}<br/>
              Cost Code: {task.cost_code} <br/>
              Hours: {task.hours} <br/>
              {/* also... Responsibility, in process? percent complete (based on number of days)? */}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="grid" style={gridTemp}>
      <div className="schedule-bar" style={{...taskIndexes(task), ...color(index, task)}} />
    </div>
  </div>
}
