import React from 'react';

export default function ProjectsCard() {
  const projects = []
  return <>
    <div className="card border-primary mb-3">
      <div className="card-header navbar">
        <h4>Projects</h4>
        <button type="button" className="btn btn-success btn-sm d-flex">+ Add New Project</button>
      </div>
      <div className="card-body">
        {projects.count != 0 ?
          <>
            <h4 className="card-title">No Current Projects</h4>
            <button type="button" className="btn btn-success btn-sm">+ Add New Project</button>
          </> :
          <h4 className="card-title">place holder You have Projects!</h4>
        }
      </div>
    </div>
  </>
}
