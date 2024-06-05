import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateField from "../dates/DateField";
import { newToDo } from "../../actions/ToDos";

export default function ToDoForm() {
  const dispatch = useDispatch()
  const project = useSelector((state) => state.project)
  const defaultDetails = {
    owner_type: "Project",
    owner_id: project?.id,
    title: "",
    status: "not started",
    description: "",
    due_date: "",
    user_id: ""
  }
  const [details, setDetails] = useState(defaultDetails)

  const setTitle = (e) => {
    setDetails({...details, title: e.target.value})
  }

  const setDueDate = (date) => {
    setDetails({...details, due_date: date})
  }

  const setDescription = (e) => {
    setDetails({...details, description: e.target.value})
  }

  const setResponsibleUser = (e) => {
    setDetails({...details, user_id: e.target.value})
  }

  const nameExists = () => {
    return !!details.title
  }

  const dueDateExists = () => {
    return !!details.due_date
  }

  const isValid = () => {
    return (nameExists() && dueDateExists())
  }

  const saveToDo = () => async () => {
    if (!isValid()) {
      return
    }

    await dispatch(newToDo(details));
    setDetails(defaultDetails)
  }

  return <div className="card to-do-card">
    <div className="card-header" style={nameExists() ? {} : {borderRadius: "var(--bs-card-inner-border-radius)"}}>
      <input
        className="form-control form-control-sm"
        type="text"
        name="title"
        value={details.title}
        placeholder="New To Do Title"
        onChange={setTitle}
      />
    </div>
    <div className="base-slide-out" style={nameExists() ? {maxHeight: "500px"} : {maxHeight: "0"}}>
      {<div className="card-body" >
        <span>Due By: </span>
        <span className="list-inline-item" style={{paddingBottom: ".5em"}}>
          <DateField labels={false} dateValue={details.due_date} onDateChange={setDueDate} disabled={!nameExists()}/>
        </span>
        <div style={{marginBottom: ".5em"}}>
          <textarea
          disabled={!nameExists()}
            className="form-control form-control-sm"
            name="description"
            value={details.description}
            placeholder="Description"
            onChange={setDescription}
          />
        </div>
        <span>Responsibility: </span>
        <div className="list-inline-item" style={{paddingBottom: ".5em"}}>
          <select disabled={!nameExists()} className="dropdown form-select form-select-sm" value={details.responsible_user} onChange={setResponsibleUser}>
            <option key="none">None</option>
            {_.map(project?.users, (user) => (
              <option key={user.id} value={user.id}>{user.full_name}</option>
            ))}
          </select>
        </div>
        <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
          <button disabled={!isValid()} className="btn btn-sm btn-outline-success border-success" onClick={saveToDo()}>Save</button>
        </div>
      </div>}
    </div>
  </div>
}