import React, { useContext, useEffect } from "react";
import ProjectTemplates from "./companyAdminPage/ProjectTemplates";
import ArchivedProjects from "./companyAdminPage/ArchivedProjects";
import { useDispatch, useSelector } from "react-redux";
import { CableContext } from "../context/cable";

export default function CompanyAdminPage() {
  const cableContext = useContext(CableContext)
  const company_id = useSelector((state) => state.user?.company.id)
  const dispatch = useDispatch()

  const handleReceived = (data) => {
    switch (data.type) {
      case "project_restored":
        dispatch({type: "archivedProjects/restored", project: data.content})
        break
      default:
        break
    }
  }

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
