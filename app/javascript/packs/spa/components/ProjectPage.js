import react, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TaskList from './projectPage/TaskList';
import { useParams } from 'react-router-dom';


import { getProject } from 'actions/projects'

export default function ProjectPage() {
  const project_id = useParams().id
  const dispatch = useDispatch();
  const [project, setProject] = useState(project)

  useEffect(() => {
    setProject(dispatch(getProject(project_id)));
  }, []);

  return <div className='dashboard-wrapper'>
    <h4>Project Page</h4>
    <TaskList />
  </div>
}
