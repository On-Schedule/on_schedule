import React, { useEffect, useState } from "react";
import UpdateProjectUsersForm from "./UpdateProjectUsersForm";
import { useDispatch } from "react-redux";
import { updateProjectUsers } from "../../../actions/projects";

export default function ProjectUsers({project}) {
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(false)
  const users = project?.users
  const [addUsers, setAddUser] = useState([])
  const [removeUsers, setRemoveUsers] = useState([])
  const updateDetails = ({selectedUsers, usersToRemove}) => {
    setAddUser(selectedUsers)
    setRemoveUsers(usersToRemove)
  }

  useEffect(() => {
    if (!edit) {
      cancelEdit()
    }
  }, [edit])

  const saveUsers = () => {
    dispatch(updateProjectUsers(project.id, {update: addUsers, remove: removeUsers}))
    setEdit(false)
  }

  const cancelEdit = () => {
    setRemoveUsers([])
    setAddUser([])
    setEdit(false)
  }

  return <div className="to-do-wrapper">
    <div className={`card ${edit && "border-warning mb-3"}`} style={{marginTop: ".5em", width: "5000px"}}>
      <div className="card-header navbar navbar-expand-sm" style={{paddingBottom: "0", paddingTop: "0", border: "none"}}>
        <span>Users</span>
        <span className="form-check form-switch" style={{marginLeft: "auto"}}>
          <input className="form-check-input" type="checkbox" onChange={() => {setEdit(!edit)}} checked={edit}/>
          <label className="form-check-label">Edit</label>
        </span>
      </div>

      {edit ? <div className="card-body">
        <UpdateProjectUsersForm updateDetails={updateDetails} projectID={project?.id}/>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", gap: ".5em"}}>
          <button className="btn btn-sm btn-outline-success" onClick={saveUsers}>Save</button>
          <button className="btn btn-sm btn-outline-light" onClick={cancelEdit}>Cancel</button>
        </div>
      </div> : <div className="card-body">
        <table className="table table-hover" style={{width: "100%", borderRadius: "5%"}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>User Level</th>
            </tr>
          </thead>
          <tbody>
            {_.map(_.orderBy(users, ['full_name'], ['desc']), (user) => (
              <tr key={user.id} className="table-active">
                <td>{user.full_name}</td>
                <td>{user.user_level.replace("_", " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </div>
  </div>
}
