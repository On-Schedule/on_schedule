import React from "react";
import ToDoItem from "./ToDoItem";
import ToDoForm from "./ToDoForm";
import { useSelector } from "react-redux";

export default function ToDo() {
  const toDos = useSelector((state) => state.toDos)

  return <div className="to-do-wrapper">
    {_.map(toDos, (toDoGroup, key) => (
      <div key={key} className="card to-do-column">
        <div className="card-header" >{key}</div>
        <div className="to-do-column-inner">
          {key === "Not started" && <ToDoForm />}
            {_.map(toDoGroup, (toDo) => (
              <div key={toDo.id}>
                <ToDoItem toDo={toDo} />
              </div>
            ))}
        </div>
      </div>
    ))}
  </div>
}