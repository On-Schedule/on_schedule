import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { deleteToDo, updateToDo } from "../../../actions/ToDos";
import Modal from "../../common/Modal";
import ToDoForm from "./ToDoForm";

export default function ToDoItem({toDo}) {
  const dispatch = useDispatch()
  const [deleteItemModal, setDeleteItemModal] = useState(false)
  const [editItem, setEditItem] = useState(false)
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

  const closeDeleteModal = () => {
    setDeleteItemModal(false)
  }

  const closeEditModal = () => {
    setEditItem(false)
    setDropDown(false)
  }

  const deleteItem = () => async () => {
    if (toDo.id) {
      await dispatch(deleteToDo(toDo.id));
      setDeleteItemModal(false)
    }
  }

  return <>
    {!editItem && <div className="card to-do-card">
      <div className="card-header display-flex">
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
            <div className="to-do-status-dropdown-header">other actions</div>
            <div className="to-do-status-dropdown" onClick={() => {setEditItem(true)}} >edit</div>
            <div className="to-do-status-dropdown" onClick={() => {setDeleteItemModal(true)}} >delete</div>
          </div>}
        </div>
      </div>
      <div className="card-body">
        <div style={{paddingBottom: ".5em"}}>Due by: {dueDate}</div>
        <div style={{paddingBottom: ".5em"}}>{description}</div>
        <div>
          Responsibility: <select className="" value={toDo.user_id || ""} onChange={setResponsibleUser}>
            <option key="none">None</option>
              {_.map(_.orderBy(users, ['full_name'], ['desc']), (user) => (
                user.user_level === "full" && <option key={user.id} value={user.id}>{user.full_name}</option>
              ))}
          </select>
        </div>
      </div>

      {deleteItemModal && <Modal
        className="delete-item-modal"
        headerText={`Delete ${toDo.title}?`}
        closeModal={closeDeleteModal}
        requiredModal={true}
      >
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <div>Are you sure you want to delete this to-do?</div>
          <div>This action cannot be undone.</div>
          <div style={{paddingTop: "10px"}}>
            <button className="btn btn-sm btn-outline-danger"  onClick={deleteItem()}>Yes (delete)</button>
            <button className="btn btn-sm btn-outline-light"  onClick={() => {setDeleteItemModal(false)}}>Cancel</button>
          </div>
        </div>
      </Modal>}
    </div>}
    {editItem && <ToDoForm cancelAction={closeEditModal} toDo={toDo} />}
  </>
}
