import React from "react";
import ToDoItem from "./ToDoItem";
import ToDoForm from "./ToDoForm";
import { useSelector } from "react-redux";

export default function ToDo() {
  const toDos = useSelector((state) => state.toDos)

  return <div style={{width: "100%", display: "flex", alignItems: "stretch", flexDirection: "row", height: "100%", overflow: "auto"}}>
    {_.map(toDos, (toDoGroup, key) => (
      <div key={key} className="card" style={{margin: ".5em", backgroundColor: "var(--bs-dark)", flexGrow: "1", flexBasis: "20%", minWidth: "365px"}}>
        <div className="card-header" >{key}</div>
        <div style={{overflowX: "auto", overflowY: "visible"}}>
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