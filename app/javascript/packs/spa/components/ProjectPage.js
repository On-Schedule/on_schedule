import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskList from './projectPage/TaskList';
import { useParams } from 'react-router-dom';

import { getProject } from 'actions/projects'

export default function ProjectPage() {
  const project_id = useParams().id
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project)

  useEffect(() => {
    dispatch(getProject(project_id));
  }, []);

  return <div className='dashboard-wrapper'>
    <div className="card border-primary mb-3" style={{width: "100%"}}>
      <div className="card-header navbar">
        <h2>{project?.name} Schedule</h2>
      </div>
      <TaskList />
    </div>
  </div>
}
