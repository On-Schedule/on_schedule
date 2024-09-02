import React, { useContext, useEffect } from "react";
import ProjectTemplates from "./companyAdminPage/ProjectTemplates";
import ArchivedProjects from "./companyAdminPage/ArchivedProjects";
import { useSelector } from "react-redux";
import { CableContext } from "../context/cable";

export default function CompanyAdminPage() {
  const cableContext = useContext(CableContext)
  // const company_id = useSelector((state) => state.user)
  const company_id = useSelector((state) => state.user?.company.id)

    const handleReceived = (data) => {
      console.log('data', data);
    // switch (data.type) {
    //   case "project":
    //     dispatch({type: "project/received", project: data.content})
    //     break
    //   case "task":
    //     dispatch({type: "task/received", task: data.content})
    //     break
    //   case "task_deleted":
    //     dispatch({type: "task/deleted", task: data.content})
    //     break
    //   case "project":
    //     dispatch({type: "project/received", project: data.content})
    //     break
    //   case "to_do":
    //     dispatch({type: "toDo/received", toDo: data.content})
    //     break
    //   case "to_do_deleted":
    //     dispatch({type: "toDo/deleted", toDo: data.content})
    //     break
    //   default:
    //     break
    // }
  }

  // console.log('company_id', company_id);

  useEffect(() => {
    const newChannel = cableContext.cable.subscriptions.create(
      {
        channel: "CompanyAdminChannel",
        company_id: company_id
      },
      {received: (data) => handleReceived(data)}
    )

    return () => {
      newChannel.unsubscribe()
    }
  }, [company_id])

  return <div>
    <div className="card" style={{margin: "10px"}}>
      <div className="card-header">Company Admin Page</div>
      <div className="card-body">
        place holder<br/>
        <br/>
      </div>
    </div>
    <div className='dashboard-wrapper flex-wrap'>
      <ProjectTemplates />
      <ArchivedProjects />
    </div>
  </div>
}
