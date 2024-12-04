import { DateTime } from "luxon";
import React from "react";

export default function ProjectDetails({project}) {
  const startDate = DateTime.fromISO(project?.start_date).toLocaleString(DateTime.DATE_FULL)
  const endDate = DateTime.fromISO(project?.end_date).toLocaleString(DateTime.DATE_FULL)

  return <div className="to-do-wrapper">
    <div className="card" style={{marginTop: ".5em", width: "5000px"}}>
      <div className="card-header navbar navbar-expand-sm" style={{paddingBottom: "0", paddingTop: "0", border: "none"}}>
        General Information
      </div>
      <div className="card-body">
        <div>Project Name: {project?.name}</div>
        <div>Dates: {startDate} - {endDate} ({project?.duration} days)</div>
        <div>Working Days: {_.map(project?.schedule.days, (day, index) => (
          <span key={index}>{day}{index +1 != project?.schedule.days.length && ", "}</span>
        ))}</div>
        <div>Working Hours: {project?.schedule.hours}</div>
      </div>
    </div>
  </div>
}
