import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../common/Modal';
import { getArchivedProjects, restoreProject } from '../../actions/projects';

export default function ArchivedProjects() {
  const dispatch = useDispatch()
  const archivedProjects = useSelector((state) => state.archivedProjects)

  useEffect(() => {
    dispatch(getArchivedProjects())
  }, [])

  // const closeModal = () => {
  //   setFromCSVModal(false)
  // }

  const restore = (projectID) => {
    dispatch(restoreProject(projectID))
  }

  return <div className="card border-primary mb-3 mx-md-2 dashboard-card" id='projects-card'>
    <div className="card-header navbar">
      Archived Projects
    </div>
    <div className="card-body dashboard-card-body">
      {_.map(archivedProjects, (project) => (
        <div className="display-flex" key={project.id}>
          <div>{project.name}</div> <button className='btn btn-sm btn-outline-success' style={{marginLeft: "auto"}} onClick={() => {restore(project.id)}}>Restore</button>
        </div>
      ))}
    </div>
    {/* {fromCSVModal && <Modal closeModal={closeModal} headerText="New template from CSV">
      <ProjectTemplateForm closeModal={closeModal} />
    </Modal>} */}
  </div>
}
