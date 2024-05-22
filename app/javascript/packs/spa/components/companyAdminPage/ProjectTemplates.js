import React, { useEffect } from 'react';
import ProjectTemplateForm from './ProjectTemplateForm';
import { useDispatch, useSelector } from 'react-redux';
import { getTemplates } from '../../actions/templates';

export default function ProjectTemplates() {
  const dispatch = useDispatch()
  const templates = useSelector((state) => state.templates)

  useEffect(() => {
    dispatch(getTemplates())
  }, [])

  return <div className="card border-primary mb-3 mx-md-2 dashboard-card" id='projects-card'>
    <div className="card-header navbar">
      <ProjectTemplateForm />
    </div>
    <div className="card-body dashboard-card-body">
      {_.map(templates, (template) => (
        <div key={template.id}> {template.name} </div>
      ))}
    </div>
  </div>
}
