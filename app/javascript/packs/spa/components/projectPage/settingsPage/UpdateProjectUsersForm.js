import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectUsers } from "../../../actions/users";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function UpdateProjectUsersForm({updateDetails=()=>{}, projectID}) {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const currentUser = useSelector((state) => state.user)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [nonSelectedUsers, setNonSelectedUsers] = useState([])
  const [usersToRemove, setUsersToRemove] = useState([])

  useEffect(() => {
    if (projectID) {
      dispatch(getProjectUsers(projectID));
    }
  }, [projectID])

  useEffect(() => {
    setNonSelectedUsers(_.filter(users, (user) => {return _.isNull(user.project_user_id)}))
    setSelectedUsers(_.filter(users, (user) => {return !_.isNull(user.project_user_id) || user.id === currentUser.id}))
  }, [users])

  useEffect(() => {
    updateDetails({selectedUsers: selectedUsers, usersToRemove: usersToRemove})
  }, [selectedUsers, nonSelectedUsers])

  const addToList = (user, user_level) => {
    setSelectedUsers(_.uniqBy([{...user, user_level: user_level}, ...selectedUsers], "id"))
    _.remove(usersToRemove, user, _.isEqual)
    _.remove(nonSelectedUsers, user, _.isEqual)
  }

  const removeFromList = (user) => {
    setNonSelectedUsers(_.uniqBy([...nonSelectedUsers, {...user, user_level: ""}], "id"))
    _.remove(selectedUsers, user, _.isEqual)
    if (user.project_user_id) {
      setUsersToRemove(_.uniqBy([...usersToRemove, {...user, user_level: ""}], "id"))
    }
  }

  return <div className="card-body row-cols-2" style={{paddingTop: 0}}>
    <div className="list-inline-item ">
      <label className="form-label">Remove Users</label>
      <div className="card-body bg-dark project-form-user-card">
        {_.map(_.orderBy(selectedUsers, ['user', 'full_name'], ['desc']), (selectedUser) => (
          <div className="display-flex" key={selectedUser.id}>
            <button
              className="btn btn-outline-danger btn-sm list-inline-item user-btn"
              onClick={() => removeFromList(selectedUser)}
              disabled={selectedUser.id === currentUser.id}
            >
              <FontAwesomeIcon icon={faTrashCan} /> {selectedUser.full_name} {selectedUser.user_level === "read" ? "(Read Only)": ""}
            </button>
            {selectedUser.user_level === "full" && <button
              className="btn btn-outline-info btn-sm list-inline-item user-select"
              onClick={() => addToList(selectedUser, "read")}
            >
              <FontAwesomeIcon icon={faSquarePlus} /> Read only
            </button>}
            {selectedUser.user_level === "read" && <button
              className="btn btn-outline-success btn-sm list-inline-item user-select"
              onClick={() => addToList(selectedUser, "full")}
            >
              <FontAwesomeIcon icon={faSquarePlus} /> Full User
            </button>}
          </div>
        ))}
      </div>
    </div>
    <div className="list-inline-item">
      <label className="form-label">Add Additional Users</label>
      <div className="card-body bg-dark project-form-user-card">
        {_.map(_.orderBy(nonSelectedUsers, ['user', 'full_name'], ['desc']), (user) => (
          <div className="display-flex" key={user.id} id={`${user.full_name.replace(' ', "-")}`}>
            <button
              className="btn btn-outline-success btn-sm list-inline-item user-btn"
              onClick={() => addToList(user, "full")}
            >
              <FontAwesomeIcon icon={faSquarePlus} /> {user.full_name}
            </button>
            <button
              className="btn btn-outline-info btn-sm list-inline-item user-select"
              onClick={() => addToList(user, "read")}
            >
              <FontAwesomeIcon icon={faSquarePlus} /> Read only
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
}
