import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { newProject } from 'actions/projects'
import AddUsersFormSection from './newProjectForm/AddUsersFormSection';
import DateRangeField from './dates/DateRangeField';

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

  const updateDetails = (projectUsers) => {
    setDetails({...details, project_users: projectUsers})
  }

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

  const updateDates = (dates) => {
    dates = {start_date: dates.startDate, end_date: dates.endDate}
    setDetails({...details, ...dates})
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

  return <div className="card bg-primary mb-3 primary-card-wrapper">
    <div className="card-header navbar">Create A New Project</div>
    <form>
      <div className="card-body">
        <div>
          <label className="form-label">Project Name</label>
          <input
            className="form-control form-control-sm"
            name="name"
            placeholder="Project Name"
            value={details?.name}
            onChange={updateDetail('name')}
          />
        </div>
        <div className="list-inline-item">
          <label className="form-label mt-4">Dates</label>
          <DateRangeField
            labels={false}
            startDateValue={details.start_date}
            endDateValue={details.end_date}
            onDatesChange={updateDates}
          />
        </div>
        <div onChange={updateSchedule()}> <label className="form-label mt-4 ">Work Week</label><br/>
          {_.map(["5x8 (M-F)", "4x10 (M-Th)", "4x10 (Tu-F)", "Custom schedule"], (preSet) => (
            <div key={preSet} className="form-check form-check-inline">
              <input
                id={preSet}
                className="form-check-input"
                value={preSet}
                type="radio"
                name="WorkWeek"
                defaultChecked={preSet === "5x8 (M-F)"}
              />
              <label className="form-label">{preSet}</label>
            </div>
          ))}
        </div>
      </div>
      { custom && (
        <div className="card-body" style={{paddingTop: 0}}>
          <div className="card-body bg-dark">
            {_.map(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], (day) => (
              <div key={day} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={day}
                  name={day}
                  checked={_.includes(details.schedule.days, day)}
                  disabled={!custom}
                  onChange={setDays()}
                />
                <label className="form-label">{_.upperFirst(day)}</label>
              </div>
            ))}
            <div className=" list-inline-item">
              <label className="form-label">Workday Hours</label>
              <input
                className="form-control form-control-sm"
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
        </div>
      )}
      <AddUsersFormSection updateDetails={updateDetails} />
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
        <button type="button" className={`btn btn-sm ${isValid() ? "btn-outline-success border-success" : "btn-outline-danger"}`} onClick={saveProject()} disabled={!isValid()}>Save</button>
      </div>
    </form>
  </div>
}
