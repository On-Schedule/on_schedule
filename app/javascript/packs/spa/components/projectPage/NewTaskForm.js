import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { newTask } from 'actions/tasks'


export default function NewTaskForm({projectID}) {
  const defaltDetails = {
    project_id: projectID,
    name: "",
    start_date: "",
    end_date: "",
    hours: "",
    // description: "",
    // cost_code: "",
    // event: false,
    // responsibilty: "internal"
  }

  const dispatch = useDispatch();
  const project = useSelector((state) => state.project)
  const [details, setDetails] = useState(defaltDetails)

  const updateDetail = (field) => (e) => {
    setDetails((details) => ({...details, [field]: _.get(e, 'target.value', e)}))
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

  const datesInsideProjectDates = () => {
    if ((details.start_date >= project?.start_date) && (details.end_date <= project?.end_date)) {
      return true
    }
    return false
  }

  return <form>
    <div className="card-body">
      <div className="form_group list-inline-item">
        <label className="col-form-label">New Task</label>
        <input
          className="form-control form-control-sm"
          name="name"
          placeholder="Task"
          value={details?.name}
          onChange={updateDetail('name')}
        />
      </div>
      <div className="form_group list-inline-item">
        <label className="col-form-label">Start Date</label>
        <input
          className="form-control form-control-sm"
          name="startDate"
          type="date"
          lable="Start Date"
          min={project?.start_date}
          max={project?.end_date}
          value={details?.start_date}
          onChange={updateDetail('start_date')}
        />
      </div>
      <div className="form_group list-inline-item">
        <label className="col-form-label">End Date</label>
        <input
          className="form-control form-control-sm"
          name="endDate"
          type="date"
          lable="End Date"
          min={project?.start_date}
          max={project?.end_date}
          value={details?.end_date}
          onChange={updateDetail('end_date')}
        />
      </div>
      <div className="form_group list-inline-item">
        <label className="col-form-label">Hours</label>
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
      {/*
        description
        cost code
        event
        responsability
      */}
      <button type="button" className="btn btn-primary btn-sm" onClick={saveTask()} disabled={!isValid()}>Save</button>
    </div>
  </form>
}


