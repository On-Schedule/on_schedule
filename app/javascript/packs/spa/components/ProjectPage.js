import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskList from './projectPage/TaskList';
import NewTaskForm from './projectPage/NewTaskForm';
import { useParams } from 'react-router-dom';
import { getProject } from 'actions/projects'

export default function ProjectPage({initialEdit=false}) {
  const project_id = useParams().id
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project)
  const [edit, setEdit] = useState(initialEdit)

  useEffect(() => {
    dispatch(getProject(project_id));
    setEdit(initialEdit)
  }, [project_id]);

  return <div className='dashboard-wrapper'>
    <div className={`card mb-3 ${edit ? "border-warning" : "border-primary"}`}>
      <div className="card-header navbar">
        {project?.name} Schedule
        <span className="form-check form-switch">
          <input className="form-check-input" type="checkbox" onClick={() => {setEdit(!edit)}}/>
          <label className="form-check-label">Edit</label>
        </span>
      </div>
      {edit && <NewTaskForm projectID={project_id} />}
      <TaskList />
    </div>
  </div>
}
