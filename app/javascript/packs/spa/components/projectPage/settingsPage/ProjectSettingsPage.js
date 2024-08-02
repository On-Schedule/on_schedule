import React from "react";
import ProjectUsers from "./ProjectUsers";

export default function ProjectSettingsPage({project}) {
  return <div className="to-do-wrapper">
    <ProjectUsers project={project}/>
  </div>
}