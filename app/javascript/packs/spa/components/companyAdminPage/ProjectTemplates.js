import React, { useEffect, useState } from 'react';
import ProjectTemplateForm from './ProjectTemplateForm';
import { useDispatch, useSelector } from 'react-redux';
import { getTemplates } from '../../actions/templates';
import Modal from '../common/Modal';

export default function ProjectTemplates() {
  const dispatch = useDispatch()
  const templates = useSelector((state) => state.templates)
  const [fromCSVModal, setFromCSVModal] = useState(false)

  useEffect(() => {
    dispatch(getTemplates())
  }, [])

  const closeModal = () => {
    setFromCSVModal(false)
  }

  return <div className="card border-primary mb-3 mx-md-2 dashboard-card" id='projects-card'>
    <div className="card-header navbar">
      Project Templates
      <button
        className='btn btn-sm btn-info'
        style={{marginLeft: "auto"}}
        onClick={() => {setFromCSVModal(true)}}
      >
        + From CSV
      </button>
    </div>
    <div className="card-body dashboard-card-body">
      {_.map(templates, (template) => (
        <div key={template.id}> {template.name} </div>
      ))}
    </div>
    {fromCSVModal && <Modal closeModal={closeModal} headerText="New template from CSV">
      <ProjectTemplateForm closeModal={closeModal} />
    </Modal>}
  </div>
}
