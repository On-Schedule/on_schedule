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
        <div style={{padding: " 0 .5em", backgroundColor: "var(--bs-gray-800)", borderRadius: "5px"}}>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
        {dropDown && <div style={{position: "absolute", backgroundColor: "var(--bs-gray-700)", minWidth: "100px", right: "1em", borderRadius: "5px", zIndex: "50", padding: ".5em", display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
          <div style={{fontVariant: "small-caps", fontWeight: "bold", fontSize: "10pt", borderBottom: "1px solid var(--bs-gray-400)"}}>change status</div>
          <div style={{fontVariant: "small-caps", fontWeight: "bold", fontSize: "10pt"}} onClick={() => {changeStatus("not started")}}>not started</div>
          <div style={{fontVariant: "small-caps", fontWeight: "bold", fontSize: "10pt"}} onClick={() => {changeStatus("in process")}}>in process</div>
          <div style={{fontVariant: "small-caps", fontWeight: "bold", fontSize: "10pt"}} onClick={() => {changeStatus("completed")}}>completed</div>
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