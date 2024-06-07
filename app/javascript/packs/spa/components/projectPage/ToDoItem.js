import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { updateToDo } from "../../actions/ToDos";

export default function ToDoItem({toDo}) {
  const dispatch = useDispatch()
  const {title, due_date, description} = toDo
  const dueDate = DateTime.fromISO(due_date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  const [dropDown, setDropDown] = useState(false)

  const getUsers = () => {
    if (toDo.owner_type === "Project") {
      return useSelector((state) => state.project?.users)
    } else {
      return [useSelector((state) => state.user)]
    }
  }
  const users = getUsers()

  const changeStatus = (status) => {
    dispatch(updateToDo(toDo.id, {status: status}))
  }

  const setResponsibleUser = (e) => {
    dispatch(updateToDo(toDo.id, {user_id: e.target.value}))
  }

  return <div className="card to-do-card">
    <div className="card-header" style={{display: "flex"}}>
      <div>{title}</div>
      <div onMouseEnter={() => {setDropDown(true)}} onMouseLeave={() => {setDropDown(false)}} style={{marginLeft: "auto"}}>
        <div className="options-button">
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
        {dropDown && <div className="to-do-status-dropdown-wrapper">
          <div className="to-do-status-dropdown-header">change status</div>
          <div className="to-do-status-dropdown" onClick={() => {changeStatus("not started")}}>not started</div>
          <div className="to-do-status-dropdown" onClick={() => {changeStatus("in process")}}>in process</div>
          <div className="to-do-status-dropdown" onClick={() => {changeStatus("completed")}}>completed</div>
        </div>}
      </div>
    </div>
    <div className="card-body">
      <div style={{paddingBottom: ".5em"}}>Due by: {dueDate}</div>
      <div style={{paddingBottom: ".5em"}}>{description}</div>
      <div>
        Responsibility: <select className="" value={toDo.user_id || ""} onChange={setResponsibleUser}>
          <option key="none">None</option>
            {_.map(users, (user) => (
              <option key={user.id} value={user.id}>{user.full_name}</option>
            ))}
        </select>
      </div>
    </div>
  </div>
}
