import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet, Navigate, Link, useMatch } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'actions/user'
import UserDashboard from './components/UserDashboard';
import NewProjectForm from './components/NewProjectForm';
import ProjectPage from './components/ProjectPage';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const signOutUser = async () => {
    await dispatch(signOut());
    navigate('/');
    window.location.reload()
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand">{user?.company?.name || "OnSchedule" }</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to={""} className="nav-link">Home</Link>
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
      </Routes>
    </div>
  );
}

export default App;
