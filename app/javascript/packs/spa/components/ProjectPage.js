import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskList from './projectPage/TaskList';
import NewTaskForm from './projectPage/NewTaskForm';
import { Link, useParams } from 'react-router-dom';
import { getProject } from 'actions/projects'
import { CableContext } from '../context/cable';
import ToDo from './projectPage/ToDo';

export default function ProjectPage({initialEdit=false, page="schedule"}) {
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

  return <div className='project-page-wrapper'>
    <div className={`card mb-3 ${edit ? "border-warning" : "border-primary"}`}>
      <div className="card-header navbar navbar-expand-sm" style={{paddingBottom: "0", paddingTop: "0", border: "none"}}>
        <span style={{padding: "0.5rem 0", marginRight: ".5rem"}}>{project?.name}</span>
          <Link to={`/projects/${project?.id}/schedule`} className="project-tab-wrapper"><div className="project-tab" style={tabColor("schedule")} >Schedule</div></Link>
          <Link to={`/projects/${project?.id}/to-dos`} className="project-tab-wrapper"><div className="project-tab" style={tabColor("to-dos")} >To-dos</div></Link>
          <Link to={`/projects/${project?.id}/analytics`} className="project-tab-wrapper"><div className="project-tab" style={tabColor("analytics")} >Analytics</div></Link>
        <span className="form-check form-switch" style={{marginLeft: "auto"}}>
          <input className="form-check-input" type="checkbox" onClick={() => {setEdit(!edit)}}/>
          <label className="form-check-label">Edit</label>
        </span>
      </div>
      {(page === "schedule" && edit) && <NewTaskForm projectID={project_id} />}
      <div className="schedule-wrapper" style={{"--add-task-form": edit && "142px", ...openSchedule()}}>
        <TaskList edit={edit} />
      </div>
      <div style={openToDos()}>
        <ToDo />
      </div>
      {page === "analytics" && <div style={{width: "calc(100vw - 1.5em)"}}>analytics go here!</div>}
    </div>
  </div>
}