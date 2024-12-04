import React from "react";
import ProjectUsers from "./ProjectUsers";
import ProjectDetails from "./ProjectDetails";

export default function ProjectSettingsPage({project}) {
  return <div className="to-do-wrapper">
    <ProjectDetails project={project}/>
    <ProjectUsers project={project}/>
  </div>
}
