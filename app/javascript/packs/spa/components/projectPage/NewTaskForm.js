import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { newTask } from 'actions/tasks'
import DateRangeField from "../dates/DateRangeField";
import { DateTime } from "luxon";

export default function NewTaskForm({projectID}) {
  const defaltDetails = {
    project_id: projectID,
    name: "",
    start_date: "",
    end_date: "",
    hours: "",
    description: "",
    cost_code: "",
    responsibility: "internal"
  }

  const dispatch = useDispatch();
  const project = useSelector((state) => state.project)
  const [details, setDetails] = useState(defaltDetails)

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

    await dispatch(newTask(details, project.id));
    setDetails(defaltDetails)
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
      return (hoursExist() && hasWorkingDays())
    } else if (details.responsibility === "external") {
      return true
    } else if (details.responsibility === "subcontractor") {
      return true
    }
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
      return "btn-outline-warning"
    } else {
      return "btn-outline-success"
    }
  }

  return <form>
    <div className="card-body">
      <div className="form_group list-inline-item">
        <label>New Task</label>
        <input
          className="form-control form-control-sm"
          name="name"
          placeholder="Task"
          value={details?.name}
          onChange={updateDetail('name')}
        />
      </div>
      <div className="form_group list-inline-item">
        <DateRangeField
          startDateValue={details.start_date ? DateTime.fromISO(details.start_date) : details.start_date}
          endDateValue={details.end_date ? DateTime.fromISO(details.end_date) : details.end_date}
          onDatesChange={updateDates}
          dateRangeMin={DateTime.fromISO(project?.start_date)}
          dateRangeMax={DateTime.fromISO(project?.end_date)}
        />
      </div>
      <div className="form_group list-inline-item">
        <label>Responsibility</label>
        <select className="dropdown form-select form-select-sm" onChange={setResponsibility} >
          {details?.responsibility}
            {_.map(["internal", "external", "subcontractor"], (item, index) => (
              <option key={index} onClick={() => {setResponsibility(item)}} >{item}</option>
            ))}
        </select>
      </div>
      {details.responsibility === "internal" && <div className="form_group list-inline-item">
        <label>Hours</label>
        <input
          style={{maxWidth: "5.25em"}}
          className="form-control form-control-sm"
          placeholder="Hours"
          name="hours"
          type="number"
          lable="Hours"
          value={details?.hours}
          onChange={updateDetail('hours')}
        />
      </div>}
      {details.responsibility === "internal" && <div className="form_group list-inline-item">
        <label>Cost Code</label>
        <input
          className="form-control form-control-sm"
          style={{maxWidth: "7em"}}
          name="costCode"
          placeholder="Cost code"
          value={details?.cost_code}
          onChange={updateDetail('cost_code')}
        />
      </div>}
      <div className="form_group list-inline-item">
        <label>Description</label>
        <input
          className="form-control form-control-sm"
          placeholder="Description"
          name="description"
          type="textarea"
          lable="description"
          value={details?.description}
          onChange={updateDetail('description')}
        />
      </div>
      <button
        type="button"
        className={`btn btn-sm ${buttonStyle()}`}
        onClick={saveTask()}
        disabled={!isValid()}
      >Save</button>
      {(!isValid() || !noWarnings()) && <div className="card-body" style={{paddingBottom: "0px"}}>
        {!nameIsValid() && <div className="text-danger">- Name is required.</div>}
        {!datesExsist() && <div className="text-danger">- Start and end dates are required.</div>}
        {!datesAreValid() && <div className="text-danger">- Start date must be before end date.</div>}
        {(!hoursExist() && !noWarnings()) && <div className="text-warning">- Tasks without hours may not be included in some analytics.</div>}
        {(!hasWorkingDays() && !noWarnings()) && <div className="text-warning">- Dates selected do not include any working days.</div>}
      </div>}
    </div>
  </form>
}
