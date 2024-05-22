import React, { useEffect, useState } from 'react';
import ProjectTemplateForm from './ProjectTemplateForm';
import { useDispatch, useSelector } from 'react-redux';
import { getTemplates } from '../../actions/templates';
import Modal from '../common/Modal';

export default function ProjectTemplates() {
  const dispatch = useDispatch()
  const templates = useSelector((state) => state.templates)
  const [newTemplateFromCSV, setNewTemplateFromCSV] = useState(false)

  useEffect(() => {
    dispatch(getTemplates())
  }, [])

  const closeModal = () => {
    setNewTemplateFromCSV(false)
  }

  return <div className="card border-primary mb-3 mx-md-2 dashboard-card" id='projects-card'>
    <div className="card-header navbar">
      <button className='btn btn-sm btn-outline-info' onClick={() => {setNewTemplateFromCSV(true)}}>
        From CSV
      </button>
    </div>
    <div className="card-body dashboard-card-body">
      {_.map(templates, (template) => (
        <div key={template.id}> {template.name} </div>
      ))}
    </div>
    {newTemplateFromCSV && <Modal closeModal={closeModal} headerText="New Template From CSV">
      <ProjectTemplateForm closeModal={closeModal} />
    </Modal>}
  </div>
}
