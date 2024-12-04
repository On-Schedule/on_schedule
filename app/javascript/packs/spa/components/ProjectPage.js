import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskList from './projectPage/schedulePage/TaskList';
import NewTaskForm from './projectPage/schedulePage/NewTaskForm';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProject, archiveProject } from 'actions/projects'
import { CableContext } from '../context/cable';
import ToDo from './projectPage/toDoPage/ToDo';
import AnalyticsPage from './projectPage/analyticsPage/AnalyticsPage';
import ProjectSettingsPage from './projectPage/settingsPage/ProjectSettingsPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function ProjectPage({initialEdit=false, page="schedule"}) {
  const cableContext = useContext(CableContext)
  const project_id = useParams().id
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project)
  const [edit, setEdit] = useState(initialEdit)

  useEffect(() => {
    dispatch(getProject(project_id));
    setEdit(initialEdit)
  }, [project_id]);

  const handleReceived = (data) => {
    switch (data.type) {
      case "project":
        dispatch({type: "project/received", project: data.content})
        break
      case "task":
        dispatch({type: "task/received", task: data.content})
        break
      case "task_deleted":
        dispatch({type: "task/deleted", task: data.content})
        break
      case "project":
        dispatch({type: "project/received", project: data.content})
        break
      case "to_do":
        dispatch({type: "toDo/received", toDo: data.content})
        break
      case "to_do_deleted":
        dispatch({type: "toDo/deleted", toDo: data.content})
        break
      default:
        break
    }
  }

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

  const tabColor = (pageFocus) => {
    if (page === pageFocus) {
      return {"--bg-color": "#32383e"}
    } else {
      return {}
    }
  }

  const openSchedule = () => {
    if (page != "schedule") {
      return {height: "0px", overflow: "hidden"}
    } else {
      return {}
    }
  }

  const openToDos = () => {
    if (page != "to-dos") {
      return {height: "0px", overflow: "hidden"}
    } else {
      return {height: "100%", overflow: "auto"}
    }
  }

  const removeProject = () => {
    dispatch(archiveProject(project_id))
    navigate("/")
  }

  return <div className='project-page-wrapper'>
    <div className={`card mb-3 ${edit ? "border-warning" : "border-primary"}`}>
      <div className="card-header navbar navbar-expand-sm" style={{paddingBottom: "0", paddingTop: "0", border: "none"}}>
        <span style={{padding: "0.5rem 0", marginRight: ".5rem"}}>{project?.name}</span>
          <Link to={`/projects/${project?.id}/schedule`} className="project-tab-wrapper"><div className="project-tab" style={tabColor("schedule")} >Schedule</div></Link>
          <Link to={`/projects/${project?.id}/to-dos`} className="project-tab-wrapper"><div className="project-tab" style={tabColor("to-dos")} >To-dos</div></Link>
          <Link to={`/projects/${project?.id}/analytics`} className="project-tab-wrapper"><div className="project-tab" style={tabColor("analytics")} >Analytics</div></Link>
          <Link to={`/projects/${project?.id}/settings`} className="project-tab-wrapper"><div className="project-tab" style={tabColor("settings")} >Settings</div></Link>
        {page === "schedule" && <span className="form-check form-switch" style={{marginLeft: "auto"}}>
          <input className="form-check-input" type="checkbox" onClick={() => {setEdit(!edit)}}/>
          <label className="form-check-label">Edit</label>
        </span>}
        {page === "settings" && <button className="btn btn-sm btn-outline-danger" style={{marginLeft: "auto"}} onClick={() => {removeProject()}}>
          <FontAwesomeIcon icon={faTrashCan} /> Archive Project
        </button>}
      </div>
      {(page === "schedule" && edit) && <NewTaskForm projectID={project_id} />}
      <div className="schedule-wrapper" style={{"--add-task-form": edit && "142px", ...openSchedule()}}>
        <TaskList edit={edit} />
      </div>
      <div style={openToDos()}>
        <ToDo />
      </div>
      {page === "analytics" && <div style={{width: "calc(100vw - 1.5em)"}}><AnalyticsPage /></div>}
      {page === "settings" && <div style={{width: "calc(100vw - 1.5em)"}}><ProjectSettingsPage project={project} /></div>}
    </div>
  </div>
}
