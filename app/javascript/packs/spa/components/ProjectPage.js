import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskList from './projectPage/TaskList';
import NewTaskForm from './projectPage/NewTaskForm';
import { useParams } from 'react-router-dom';
import { getProject } from 'actions/projects'
import { CableContext } from '../context/cable';

export default function ProjectPage({initialEdit=false}) {
  const cableContext = useContext(CableContext)
  const project_id = useParams().id
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project)
  const [edit, setEdit] = useState(initialEdit)

  useEffect(() => {
    dispatch(getProject(project_id));
    setEdit(initialEdit)
  }, [project_id]);


  useEffect(() => {
    const newChannel = cableContext.cable.subscriptions.create(
      {
        channel: "ProjectChannel",
        project_id: project_id
      },
      {received: (data) => handleReceived(data)}
    )

    return () => {
      newChannel.unsubscribe()
    }
  }, [project_id])


  const handleReceived = (data) => {
    console.log('data', data);
    switch (data.type) {
      case "task":
        dispatch({type: "task/received", task: data.content})
        break
      case "project":
        dispatch({type: "project/received", project: data.content})
        break
      default:
        break
    }
  }

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
