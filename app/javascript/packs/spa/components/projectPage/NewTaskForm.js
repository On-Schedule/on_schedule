import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { newTask } from 'actions/tasks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
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
  const [openAccordion, setOpenAccordion] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [reset, setReset] = useState(false)

  const updateDetail = (field) => (e) => {
    setDetails((details) => ({...details, [field]: _.get(e, 'target.value', e)}))
  }

  const updateStartDate = (date) => {
    setDetails({...details, start_date: date})
  }

  const updateEndDate = (date) => {
    setDetails({...details, end_date: date})
  }

  const saveTask = () => async () => {
    if(!isValid()) {
      return;
    }

    await dispatch(newTask(details, project.id));
    setDetails(defaltDetails)
    setReset(true)
  }

  const isValid = () => {
    return (
      nameIsValid() &&
      datesExsist() &&
      datesAreValid() &&
      datesInsideProjectDates()
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
    if (details.start_date <= details.end_date) {
      return true
    }
    return false
  }

  const datesInsideProjectDates = () => {
    if ((details.start_date >= project?.start_date) && (details.end_date <= project?.end_date)) {
      return true
    }
    return false
  }

  const setResponsibility = (value) => {
    setDetails({...details, responsibility: value})
  }

  return <form>
    <div className="card-body">
      <div
        onClick={() => {setOpenAccordion(!openAccordion)}}
        className="list-inline-item align-bottom"
      >
        <FontAwesomeIcon
          icon={faChevronUp}
          className={openAccordion ? "flip" : "un-flip"}
        />
      </div>
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
          updateStartDate={updateStartDate}
          updateEndDate={updateEndDate}
          reset={reset}
          setReset={setReset}
          startDateLimit={DateTime.fromISO(project?.start_date)}
          endDateLimit={DateTime.fromISO(project?.end_date)}
        />
      </div>
      <div className="form_group list-inline-item">
        <label>Hours</label>
        <input
          className="form-control form-control-sm"
          placeholder="Hours"
          name="hours"
          type="number"
          lable="Hours"
          value={details?.hours}
          onChange={updateDetail('hours')}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={saveTask()}
        disabled={!isValid()}
      >Save</button>
    </div>
    {openAccordion && <div className="form-group card-body bg-dark" >
      <FontAwesomeIcon style={{color: "var(--bs-dark)"}} icon={faChevronUp} />
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
      <div className="form_group list-inline-item">
        <label>Cost Code</label>
        <input
          className="form-control form-control-sm"
          name="costCode"
          placeholder="Cost code"
          value={details?.cost_code}
          onChange={updateDetail('cost_code')}
        />
      </div>
      <div className="form_group list-inline-item">
        <label>Responsibility</label>
        <div className="dropdown form-select form-select-sm" onClick={() => {setOpenDropdown(!openDropdown)}} >
          {details?.responsibility}
          {(openAccordion && openDropdown) && <div className="dropdown-menu" >
            {_.map(["internal", "external", "subcontractor"], (item, index) => (
              <div key={index} onClick={() => {setResponsibility(item)}} >{item}</div>
            ))}
          </div>}
        </div>
      </div>
    </div>}
  </form>
}
