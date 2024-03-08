import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { newProject } from 'actions/projects'

const fiveEights = {
  days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
  hours: 8
}

const fourTensMT = {
  days: ["monday", "tuesday", "wednesday", "thursday"],
  hours: 10
}

const fourTensTF = {
  days: ["tuesday", "wednesday", "thursday", "friday"],
  hours: 10
}

const defaultProject = {
  name: "",
  start_date: "",
  end_date: "",
  schedule: fiveEights
}

export default function NewProjectForm({project=defaultProject}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [details, setDetails] = useState(project)
  const [schedule, setSchedule] = useState(details.schedule)
  const [custom, setCustom] = useState(false)

  const updateDetail = (field) => (e) => {
    setDetails((details) => ({...details, [field]: _.get(e, 'target.value', e)}))
  }

  useEffect(() => {
    setDetails({...details, schedule: schedule})
  }, [schedule])

  const updateSchedule = () => (e) => {
    setCustom(false);
    switch(e.target.value) {
      case "5x8 (M-F)":
        setSchedule(fiveEights);
        break;
      case "4x10 (M-Th)":
        setSchedule(fourTensMT);
        break;
      case "4x10 (Tu-F)":
        setSchedule(fourTensTF);
        break;
      default:
        setCustom(true);
    }
  }

  const setDays = () => (e) => {
    const newDay = e.target.value
    if(_.includes(schedule.days, newDay)) {
      const days = _.filter(schedule.days, (day) => (day != newDay))
      setSchedule({...schedule, days: days})
    } else {
      setSchedule({...schedule, days: [...schedule.days, newDay]})
    }
  }

  const setHours = () => (e) => {
    setSchedule((schedule) => ({...schedule, hours: e.target.valueAsNumber}))
  }

  const saveProject = () => async () => {
    if(!isValid()) {
      return;
    }

    project = await dispatch(newProject(details));
    navigate(`/projects/${project.id}`)
  }

  const isValid = () => {
    return (
      nameIsValid() &&
      datesExsist() &&
      datesAreValid() &&
      daysAreValid() &&
      hoursAreValid()
    )
  }

  const nameIsValid = () => {
    if (details.name.length >= 1) {
      return true
    }
    return false
  }
  const datesExsist = () => {
    if (details.start_date && details.end_date) {
      return true
    }
    return false
  }

  const datesAreValid = () => {
    if (details.start_date < details.end_date) {
      return true
    }
    return false
  }

  const daysAreValid = () => {
    if (details.schedule.days.length >= 1) {
      return true
    }
    return false
  }

  const hoursAreValid = () => {
    if (details.schedule.hours >= 1 && details.schedule.hours <= 24) {
      return true
    }
    return false
  }

  return <div className="card text-white bg-primary mb-3 primary-card-wrapper">
    <h4 className="card-header">Create A New Project</h4>
    <form>
      <div className="card-body">
        <div className="form_group">
          <label className="form-label mt-4">Project Name</label>
          <input
            className="form-control"
            name="name"
            placeholder="Project Name"
            value={details?.name}
            onChange={updateDetail('name')}
          />
        </div>
        <div className="form_group list-inline-item">
          <label className="form-label mt-4">Start Date</label>
          <input
            className="form-control"
            name="startDate"
            type='date'
            lable="Start Date"
            value={details?.start_date}
            onChange={updateDetail('start_date')}
          />
        </div>
        <div className="form_group list-inline-item">
          <label className="form-label mt-4">End Date</label>
          <input
            className="form-control"
            name="endDate"
            type='date'
            lable="End Date"
            value={details?.end_date}
            onChange={updateDetail('end_date')}
          />
        </div>
        <div className="form-group" onChange={updateSchedule()}> <label className="form-label mt-4 ">Work Week</label><br/>
          {_.map(["5x8 (M-F)", "4x10 (M-Th)", "4x10 (Tu-F)", "Custom schedule"], (preSet) => (
            <div key={preSet} className="form-check form-check-inline">
              <input
                className="form-check-input"
                value={preSet}
                type="radio"
                name="workWeek"
                defaultChecked={preSet === "5x8 (M-F)"}
              />
              <label className="form-label">{preSet}</label>
            </div>
          ))}
        </div>
      </div>
      { custom ? (
        <div className="form-group card-body bg-dark">
          {_.map(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], (day) => (
            <div key={day} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value={day}
                name="day"
                checked={_.includes(details.schedule.days, day)}
                disabled={!custom}
                onChange={setDays()}
              />
              <label className="form-label">{_.upperFirst(day)}</label>
            </div>
          ))}
          <div className=" list-inline-item">
            <label className="form-label mt-4">Workday Hours</label>
            <input
              className="form-control"
              type="number"
              name="hours"
              min={1}
              max={24}
              value={details.schedule.hours}
              disabled={!custom}
              onChange={setHours()}
            />
          </div>
        </div>
      ) : ("")}
      {/* Add team members (with check for read only) */}
      {!isValid() ? <div className="card-body">
        <div className="card-body bg-dark">
          {nameIsValid() ? "" : <div className="text-danger">- Name is required</div>}
          {datesExsist() ? "" : <div className="text-danger">- Start and end dates are required</div>}
          {datesAreValid() ? "" : <div className="text-danger">- Start date must be before end date</div>}
          {daysAreValid() ? "" : <div className="text-danger">- At least one day must be selected</div>}
          {hoursAreValid() ? "" : <div className="text-danger">- Hours must be between 1 and 24</div>}
        </div>
      </div> : ""}
      <div className="card-body text-center">
        <button type="button" className="btn btn-primary" onClick={saveProject()} disabled={!isValid()}>Save</button>
      </div>
    </form>
  </div>
}
