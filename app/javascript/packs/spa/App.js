import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet, Navigate, Link, useMatch } from 'react-router-dom';
import { useSelector } from 'react-redux'

import UserDashboard from './components/UserDashboard';
import NewProjectForm from './components/NewProjectForm';

function App() {
  const user = useSelector((state) => state.user);
  console.log(user);
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
                <a className="nav-link active">Home
                </a>
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
          </div>
        </div>
      </nav>
      <Routes>
        <Route index element={<UserDashboard />} />
        <Route path="/new_project" element={<NewProjectForm />} />
      </Routes>
    </div>
  );
}

export default App;
