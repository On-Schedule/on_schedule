import React from "react";
import ProjectTemplates from "./companyAdminPage/ProjectTemplates";

export default function CompanyAdminPage() {
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
    </div>
  </div>
}
