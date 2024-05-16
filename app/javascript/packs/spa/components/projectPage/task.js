import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { DateTime } from "luxon";
import NewTaskForm from "./NewTaskForm";

export default function Task({task, index, mainGridTemplate, gridTemp, taskCardWidth}) {
  const [openAccordion, setOpenAccordion] = useState(false)
  const openTaskItemWidth = 500
  const start_date = DateTime.fromISO(task.start_date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  const end_date = DateTime.fromISO(task.end_date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  const [edit, setEdit] = useState(false)
  const itemWidths = {
    "--open-item-width": `${openTaskItemWidth}px`,
    "--closed-item-width": `${taskCardWidth}px`
  }

  const taskIndexes = (task) => {
    var start = task.date_index["start"]
    var stop = task.date_index["stop"]
    return {"--start": start, "--stop": stop}
  }

  const color = (task) => {
    const colors = {
      "internal": "#555ded",
      "external": "#737373",
      "subcontractor": "#59ac93"
    }

    if(task.responsibility){
      return {"--bar-color": colors[task.responsibility]}
    } else {
      return {"--bar-color": colors["internal"]}
    }
  }

  return <div className="grid" style={mainGridTemplate}>
    <div className="sticky-left">
      <div className="task-items base-slide-out" style={{width: openAccordion ? `${openTaskItemWidth}px` : `${taskCardWidth}px`}}>
        <FontAwesomeIcon
          icon={faChevronUp}
          className={openAccordion ? "flip" : "un-flip"}
          style={{padding: "0px 5px", color: "var(--bs-gray-700)"}}
          onClick={() => {setOpenAccordion(!openAccordion); setEdit(false)}}
        />
        {task.name}
      </div>
      <div className={`base-slide-out ${openAccordion ? "open-task-item" : "close-task-item"}`} style={itemWidths}>
        <div className="task-items-expand">
          <div className="card-body" style={{paddingTop: "0px"}}>
            <div style={{backgroundColor: "var(--bs-dark)", padding: "5px 10px 10px"}}>
              Dates: {start_date} - {end_date} <br/>
              Duration: {task.total_days} days ({task.working_days} working days)<br/>
              Average Daily Manpower: {task.daily_manpower}<br/>
              Cost Code: {task.cost_code} <br/>
              Hours: {task.hours} <br/>
              <button className="btn btn-sm btn-dark" onClick={()=>{setEdit(true)}}> Edit </button>
              {/* also... Responsibility, in process? percent complete (based on number of days)? */}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="grid" style={gridTemp}>
      <div className="schedule-bar" style={{...taskIndexes(task), ...color(task)}} />
    </div>
    {edit &&
    <div className="card" style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: "3000", maxWidth: "50em"}}>
      <div className="card-body" >
        <NewTaskForm task={task} setEdit={setEdit}/>
      </div>
    </div>
    }
  </div>
}
