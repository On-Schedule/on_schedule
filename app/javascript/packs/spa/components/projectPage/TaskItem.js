import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { DateTime } from "luxon";
import NewTaskForm from "./NewTaskForm";
import Modal from "../common/Modal";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../actions/tasks";

export default function TaskItem({task, mainGridTemplate, gridTemp, taskCardWidth}) {
  const dispatch = useDispatch()
  const [accordion, setAccordion] = useState(false)
  const taskItemRef = useRef(null);
  const modalRef = useRef(null);
  const scheduleBarRef = useRef(null);
  const openTaskItemWidth = 500
  const start_date = DateTime.fromISO(task.start_date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  const end_date = DateTime.fromISO(task.end_date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  const [edit, setEdit] = useState(false)
  const [deleteItemModal, setDeleteItemModal] = useState(false)
  const itemWidths = {
    "--open-item-width": `${openTaskItemWidth}px`,
    "--closed-item-width": `${taskCardWidth}px`
  }

  const taskIndexes = (task) => {
    var start = task.date_index["start"]
    var stop = task.date_index["stop"]
    return {"--start": start, "--stop": stop}
  }

  const color = (task) => {
    const colors = {
      "internal": "#555ded",
      "external": "#737373",
      "subcontractor": "#59ac93"
    }

    if(task.responsibility){
      return {"--bar-color": colors[task.responsibility]}
    } else {
      return {"--bar-color": colors["internal"]}
    }
  }

  const closeAccordion = () => {
    setAccordion(false)
    setEdit(false)
    document.removeEventListener("click", handleClickOutsideTask);
  }

  const toggleAccordion = () => {
    if (accordion) {
      setAccordion(false)
      document.removeEventListener("click", handleClickOutsideTask);
    } else {
      setAccordion(true)
      document.addEventListener("click", handleClickOutsideTask);
    }
    setEdit(false)
  }

  const handleClickOutsideTask = (e) => {
    if (taskItemRef.current && (
      !taskItemRef.current.contains(e.target) &&
      !modalRef.current?.contains(e.target) &&
      !scheduleBarRef.current.contains(e.target))) {
      closeAccordion()
    }
  }

  const closeEditModal = () => {
    setEdit(false)
  }

  const closeDeleteModal = () => {
    setDeleteItemModal(false)
  }

  const deleteItem = () => async () => {
    if (task.id && task.project_id) {
      await dispatch(deleteTask(task.project_id, task.id));
      setEdit(false)
    }
  }

  return <div className="grid" style={mainGridTemplate}>
    <div ref={taskItemRef} className="sticky-left">
      <div
        className="task-items base-slide-out"
        style={{width: accordion ? `${openTaskItemWidth}px` : `${taskCardWidth}px`}}
        onClick={toggleAccordion}
      >
        <FontAwesomeIcon
          icon={faChevronUp}
          className={accordion ? "flip" : "un-flip"}
          style={{padding: "0px 5px", color: "var(--bs-gray-700)"}}
        />
        {task.name}
      </div>
      <div className={`base-slide-out ${accordion ? "open-task-item" : "close-task-item"}`} style={itemWidths}>
        <div className="task-items-expand">
          <div className="card-body" style={{paddingTop: "0px"}}>
            <div style={{backgroundColor: "var(--bs-dark)", padding: "5px 10px 10px"}}>
              Dates: {start_date} - {end_date} <br/>
              Duration: {task.total_days} days ({task.working_days} working days)<br/>
              Average Daily Manpower: {task.daily_manpower}<br/>
              Cost Code: {task.cost_code} <br/>
              Hours: {task.hours} <br/>
              <button className="btn btn-sm btn-dark" onClick={()=>{setEdit(true)}}> Edit </button>
              {/* also... Responsibility, in process? percent complete (based on number of days)? */}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="grid" style={gridTemp}>
      <div ref={scheduleBarRef} className="schedule-bar" style={{...taskIndexes(task), ...color(task)}} />
    </div>
    {edit && <Modal
      className="edit-task-modal"
      headerText={task.name}
      closeModal={closeEditModal}
      ref={modalRef}
    >
      <div className="trash-can" style={{position: "fixed", top: "7px", right: "40px"}} onClick={() => {setDeleteItemModal(true)}}><FontAwesomeIcon icon={faTrashCan}/></div>
      <NewTaskForm task={task} setEdit={setEdit}/>
    </Modal>}

    {deleteItemModal && <Modal
      className="delete-item-modal"
      headerText={`Delete ${task.name}?`}
      closeModal={closeDeleteModal}
      ref={modalRef}
      requiredModal={true}
    >
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div>Are you sure you want to delete this task?</div>
        <div>This action cannot be undone.</div>
        <div style={{paddingTop: "10px"}}>
          <button className="btn btn-sm btn-outline-danger"  onClick={deleteItem()}>Yes (delete)</button>
          <button className="btn btn-sm btn-outline-light"  onClick={() => {setDeleteItemModal(false)}}>Cancel</button>
        </div>
      </div>
    </Modal>}
  </div>
}
