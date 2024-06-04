import React from "react";
import { DateTime } from "luxon";

export default function ToDoItem({toDo}) {
  const {title, due_date, description} = toDo
  const dueDate = DateTime.fromISO(due_date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)

  return <div className="card to-do-card">
    <div className="card-header">
      {title}
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