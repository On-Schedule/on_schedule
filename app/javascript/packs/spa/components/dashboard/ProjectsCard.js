import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ProjectsCard() {
  const projects = useSelector((state) => state.user?.projects)

  return <>
    <div className="card border-primary mb-3">
      <div className="card-header navbar">
        <h4>Projects</h4>
        <Link to="/new_project" className="btn btn-info btn-sm d-flex">+ Add New Project</ Link>
      </div>
      <div className="card-body">
        {projects ? (
          _.map(projects, (project) => (
            <h4 key={project.id}>{project.name}</h4>
          ))
        ) : (
          <h4 className="card-title">No Current Projects</h4>
        )}
      </div>
    </div>
  </>
}
