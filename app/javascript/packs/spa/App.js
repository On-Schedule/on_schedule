import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Outlet, Navigate, Link, useMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from 'actions/user'
import UserDashboard from './components/UserDashboard';
import NewProjectForm from './components/NewProjectForm';
import ProjectPage from './components/ProjectPage';
import CompanyAdminPage from './components/CompanyAdminPage';
import { CableContext } from './context/cable';

function App() {
  const dispatch = useDispatch();
  const cableContext = useContext(CableContext)
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false)

  const signOutUser = async () => {
    await dispatch(signOut());
    window.location.reload()
  };

  const companyAdmin = () => {
    return (user?.role === "super_admin" ||user?.role === "admin")
  }

  const handleReceived = (data) => {
    switch (data.type) {
      case "project_added":
        dispatch({type: "user/project_added", project: data.content})
      case "project_deleted":
        dispatch({type: "user/project_deleted", project: data.content})
        break
      default:
        break
    }
  }

  useEffect(() => {
    const newChannel = cableContext.cable.subscriptions.create(
      {
        channel: "UserChannel",
        user_id: user?.id
      },
      {received: (data) => handleReceived(data)}
    )

    return () => {
      newChannel.unsubscribe()
    }
  }, [user?.id])

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          {companyAdmin() ?
            <Link to={"company/admin"} className="navbar-brand">{user?.company?.name || "OnSchedule" }</Link> :
            <a className="navbar-brand" >{user?.company?.name || "OnSchedule" }</a>
          }
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to={""} className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <div
                  onMouseEnter={() => {setOpen(true)}}
                  onMouseLeave={() => {setOpen(false)}}
                >
                  <a className="nav-link dropdown">Projects</a>
                  {open ? <div className="dropdown-menu" style={{zIndex: "3000"}}>
                    <div className="card-body" style={{margin: "0px 10px"}} >
                      {_.map(user?.projects, (project, index) => (
                        <Link to={`/projects/${project.id}`} className="btn btn-outline-info btn-sm d-flex" key={index} >{project.name}</Link>
                      ))}
                    </div>
                  </div> : ""}
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">About</a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" onClick={signOutUser}>Log Out</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route index element={<UserDashboard />} />
        <Route path="/projects/new" element={<NewProjectForm />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/projects/:id/schedule" element={<ProjectPage page="schedule" />} />
        <Route path="/projects/:id/to-dos" element={<ProjectPage page="to-dos" />} />
        <Route path="/projects/:id/analytics" element={<ProjectPage page="analytics" />} />
        <Route path="/projects/:id/settings" element={<ProjectPage page="settings" />} />
        <Route path="/company/admin" element={<CompanyAdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
