import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions/users";

export default function AddUsersFormSection(details) {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const currentUser = useSelector((state) => state.user)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [nonSelectedUsers, setNonSelectedUsers] = useState([])

  useEffect(() => {
    dispatch(getUsers());
  }, [])

  useEffect(() => {
    if (currentUser) {
      setSelectedUsers([...selectedUsers, {id: currentUser?.id, full_name: currentUser?.full_name, read_only: false}])
    }
  }, [currentUser])

  useEffect(() => {
    const usersWithReadOnly = _.map(users, (user) => ({...user, read_only: false}))
    setNonSelectedUsers(_.differenceWith(usersWithReadOnly, selectedUsers, _.isEqual))
  }, [users])

  useEffect(() => {
    details.updateDetails(selectedUsers)
  }, [selectedUsers, nonSelectedUsers])

  const addToList = (user, read_only) => {
    setSelectedUsers(_.uniqBy([...selectedUsers, {...user, read_only: read_only}], "id"))
    _.remove(nonSelectedUsers, user, _.isEqual)
  }

  const removeFromList = (user) => {
    setNonSelectedUsers(_.uniqBy([...nonSelectedUsers, {...user, read_only: false}], "id"))
    _.remove(selectedUsers, user, _.isEqual)
  }

  return <div className="card-body row-cols-2">
    <div className="list-inline-item ">
      <label className="form-label mt-4">Remove Users</label>
      <div className="card-body bg-dark user-card">
        {_.map(selectedUsers, (selectedUser) => (
          <div key={selectedUser.id}>
            <button
              className="btn btn-outline-danger btn-sm list-inline-item"
              onClick={() => removeFromList(selectedUser)}
              disabled={selectedUser.id === currentUser.id}
            >
              - {selectedUser.full_name} {selectedUser.read_only ? "(Read Only)": ""}
            </button>
          </div>
        ))}
      </div>
    </div>
    <div className="list-inline-item">
      <label className="form-label mt-4">Add Additional Users</label>
      <div className="card-body bg-dark user-card">
        {_.map(nonSelectedUsers, (user) => (
          <div key={user.id}>
            <button
              className="btn btn-outline-success btn-sm list-inline-item"
              onClick={() => addToList(user, false)}
            >
              + {user.full_name}
            </button>
            <button
              className="btn btn-outline-info btn-sm list-inline-item"
              onClick={() => addToList(user, true)}
            >
              + Read only
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
}
