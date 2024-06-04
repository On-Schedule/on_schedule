import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { newTask, updateTask } from 'actions/tasks'
import DateRangeField from "../dates/DateRangeField";
import { DateTime } from "luxon";
import Tooltip from "../common/Tooltip";

export default function NewTaskFormV2({task={}, setEdit=()=>{}, projectID, style, templateKey="", labels=true}) {
  const {name, start_date, end_date, hours, description, cost_code, responsibility, project_id} = task
  const defaultDetails = {
    project_id: project_id || project?.id || projectID,
    name: name || "",
    start_date: start_date || "",
    end_date: end_date || "",
    hours: hours || "",
    description: description || "",
    cost_code: cost_code || "",
    responsibility: responsibility || "internal"
  }

  const dispatch = useDispatch();
  const project = useSelector((state) => state.project)
  const [details, setDetails] = useState(defaultDetails)
  const [nameTooltip, setNameTooltip] = useState(false)
  const [datesTooltip, setDatesTooltip] = useState(false)
  const [hoursTooltip, setHoursTooltip] = useState(false)
  const [costCodeTooltip, setCostCodeTooltip] = useState(false)

  useEffect(() => {
    setDetails(defaultDetails)
  }, [project])

  const updateDetail = (field) => (e) => {
    setDetails((details) => ({...details, [field]: _.get(e, 'target.value', e)}))
  }

  const updateDates = (dates) => {
    dates = {start_date: dates.startDate, end_date: dates.endDate}
    setDetails({...details, ...dates})
  }

  const saveTask = () => async () => {
    if(!isValid()) {
      return;
    }

    if (task.id) {
      await dispatch(updateTask(details, project.id, task.id));
      setEdit(false)
    } else {
      await dispatch(newTask(details, project.id, templateKey));
      setDetails(defaultDetails)
    }
  }

  const isValid = () => {
    return (
      nameIsValid() &&
      datesExsist() &&
      datesAreValid() &&
      datesInsideProjectDates()
    )
  }

  const noWarnings = () => {
    if (details.responsibility === "internal") {
      return (hoursExist() && hasWorkingDays() && costCodeExist())
    } else if (details.responsibility === "external") {
      return true
    } else if (details.responsibility === "subcontractor") {
      return true
    }
  }

  const costCodeExist = () => {
    return !!details.cost_code
  }

  const hoursExist = () => {
    return !!details.hours
  }

  const nameIsValid = () => {
    return !!details.name
  }

  const datesExsist = () => {
    return (details.start_date && details.end_date)
  }

  const datesAreValid = () => {
    return (details.start_date <= details.end_date)
  }

  const datesInsideProjectDates = () => {
    return ((details.start_date >= project?.start_date) && (details.end_date <= project?.end_date))
  }

  const setResponsibility = (e) => {
    if (e.target.value === "internal") {
      setDetails({...details, responsibility: e.target.value})
    } else {
      setDetails({...details, responsibility: e.target.value, cost_code: "", hours: ""})
    }
  }

  const calculateWeekends = () => {
    const weekend = []
    const days = {
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
      sunday: 7
    }

    _.each(days, (dayNum, day) => {
      if (!_.includes(project.schedule.days, day)){
        weekend.push(dayNum)
      }
    })

    return weekend
  }

  const hasWorkingDays = () => {
    if (datesExsist() && datesAreValid()) {
      const weekend = calculateWeekends()
      const startDate = DateTime.fromISO(details.start_date)
      startDate.loc.weekSettings = {weekend: weekend}
      const endDate = DateTime.fromISO(details.end_date)
      const days = endDate.diff(startDate, 'days').as("days") + 1
      var valid = false

      for (let index = 0, date = startDate; index < days; index++, date = date.plus({days: 1})) {
        if (!date.isWeekend) {
          valid = true
          break
        }
      }
      return valid
    }
    return true
  }

  const buttonStyle = () => {
    if (!isValid()) {
      return "btn-outline-danger"
    } else if (!noWarnings()) {
      return "btn-outline-warning border-warning"
    } else {
      return "btn-outline-success border-success"
    }
  }

  const bgcolors = {
    success: {backgroundColor:"#ccf8cc", borderColor: "#62c462"},
    warning: {backgroundColor:"#fcce8e", borderColor: "#f89406"},
    danger: {backgroundColor:"#fcc2c0", borderColor: "#ee5f5b"}
  }

  const hoursColor = () => {
    if (details.responsibility != "internal") {
      return {};
    } else if (hoursExist()) {
      return bgcolors.success
    } else {
      return bgcolors.warning
    }
  }

  const costCodeColor = () => {
    if (details.responsibility != "internal") {
      return {};
    } else if (costCodeExist()) {
      return bgcolors.success
    } else {
      return bgcolors.warning
    }
  }

  const datesColor = () => {
    if (!datesExsist() || !datesAreValid()) {
      return bgcolors.danger;
    } else if (!hasWorkingDays()) {
      return bgcolors.warning
    } else {
      return bgcolors.success
    }
  }

  return <form style={{display: "flex", flexWrap: "wrap"}}>
    <div className="card-body task-form-flex" style={{...style, padding: "0px"}}>
      <div className="list-inline-item task-form-element" onMouseEnter={() => {setNameTooltip(true)}} onMouseLeave={() => {setNameTooltip(false)}}>
        {labels && <label>New Task</label>}
        <input
          className="form-control form-control-sm"
          style={nameIsValid() ? bgcolors.success : bgcolors.danger}
          name="name"
          placeholder="Task"
          value={details?.name}
          onChange={updateDetail('name')}
        />
        {(!nameIsValid() && nameTooltip) && <Tooltip>
          <div className="text-danger">Name is required.</div>
        </Tooltip>}
      </div>
      <div className="list-inline-item task-form-element" style={{"--base-width": "16.25em"}}>
        <div onMouseEnter={() => {setDatesTooltip(true)}} onMouseLeave={() => {setDatesTooltip(false)}}>
          <DateRangeField
            startDateValue={details.start_date}
            endDateValue={details.end_date}
            onDatesChange={updateDates}
            dateRangeMin={project?.start_date}
            dateRangeMax={project?.end_date}
            labels={labels}
            dateFieldStyle={datesColor()}
          />
        </div>
        {((!datesExsist() ||
          !datesAreValid() ||
          !datesInsideProjectDates() ||
          !hasWorkingDays()) &&
        datesTooltip) && <Tooltip>
          {!datesExsist() && <div className="text-danger">Start and end dates are required.</div>}
          {!datesAreValid() && <div className="text-danger">Start date must be before end date.</div>}
          {!datesInsideProjectDates() && <div className="text-danger">Dates must be inside of project Dates</div>}
          {(!hasWorkingDays() && !noWarnings()) && <div className="text-warning">Dates selected do not include any working days.</div>}
        </Tooltip>}
      </div>
      <div className="list-inline-item task-form-element" >
        {labels && <label>Responsibility</label>}
        <select className="dropdown form-select form-select-sm" onChange={setResponsibility} value={details?.responsibility}>
          {_.map(["internal", "external", "subcontractor"], (item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
      </div>
      <div className="list-inline-item task-form-element" style={{"--base-width": "5.25em"}}  onMouseEnter={() => {setHoursTooltip(true)}} onMouseLeave={() => {setHoursTooltip(false)}}>
        {labels && <label>Hours</label>}
        <input
          className="form-control form-control-sm"
          style={hoursColor()}
          placeholder="Hours"
          name="hours"
          type="number"
          lable="Hours"
          value={details?.hours}
          onChange={updateDetail('hours')}
          disabled={details.responsibility != "internal"}
          onMouseEnter={() => {setHoursTooltip(true)}}
          onMouseLeave={() => {setHoursTooltip(false)}}
        />
        {((!hoursExist() && !noWarnings()) && hoursTooltip) && <Tooltip>
          <div className="text-warning">Tasks without hours may not be included in some analytics.</div>
        </Tooltip>}
      </div>
      <div className="list-inline-item task-form-element" style={{"--base-width": "7em"}}   onMouseEnter={() => {setCostCodeTooltip(true)}} onMouseLeave={() => {setCostCodeTooltip(false)}}>
        {labels && <label>Cost Code</label>}
        <input
          className="form-control form-control-sm"
          style={costCodeColor()}
          name="costCode"
          placeholder="Cost code"
          value={details?.cost_code}
          onChange={updateDetail('cost_code')}
          disabled={details.responsibility != "internal"}
        />
        {((!costCodeExist() && !noWarnings()) && costCodeTooltip) && <Tooltip>
          <div className="text-warning">Tasks without cost codes may not be included in some analytics.</div>
        </Tooltip>}
      </div>
      <div className="list-inline-item task-form-element" style={{"--grow-rate": "2"}} >
        {labels && <label>Description</label>}
        <input
          className="form-control form-control-sm"
          style={details.description ? bgcolors.success : {}}
          placeholder="Description"
          name="description"
          type="textarea"
          lable="description"
          value={details?.description}
          onChange={updateDetail('description')}
        />
      </div>
      <div className="list-inline-item task-form-element" style={{maxWidth: "10em", "--base-width": `${task.id ? "7em" : "3.1"}`, display: "flex"}}>
        <button
          type="button"
          className={`btn btn-sm ${buttonStyle()}`}
          style={{flexBasis: "1", flexGrow: "1", marginTop: ".5em"}}
          onClick={saveTask()}
          disabled={!isValid()}
        >Save</button>
        {task.id && <button
          className="btn btn-sm btn-outline-light"
          style={{flexBasis: "1", flexGrow: "1", marginTop: ".5em", marginLeft: ".5em"}}
          onClick={()=>{setEdit(false)}}> Cancel </button>}
      </div>
      <div></div>
    </div>
  </form>
}
