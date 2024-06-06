import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { updateToDo } from "../../actions/ToDos";

export default function ToDoItem({toDo}) {
  const dispatch = useDispatch()
  const {title, due_date, description} = toDo
  const dueDate = DateTime.fromISO(due_date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  const [dropDown, setDropDown] = useState(false)

  const changeStatus = (status) => {
    dispatch(updateToDo(toDo.id, {status: status}))
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
        {/* TODO fill in responsibility selector */}
        Responsibility: <select className="">
          <option> Sam Hill</option>
          <option> Gray Woods</option>
          <option> Jacob Seas</option>
          <option> Alic Creek</option>
        </select>
      </div>
    </div>
  </div>
}