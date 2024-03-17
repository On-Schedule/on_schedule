import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DateTime } from "luxon"

export default function DateBar() {
  const project = useSelector((state) => state.project)
  const start_date = new Date(DateTime.fromISO(project?.start_date))
  const end_date = new Date(DateTime.fromISO(project?.end_date))
  const [projectDays, setProjectDays] = useState([])
  const [projectMonths, setProjectMonths] = useState([])

  const calculateDays = (date) => {
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    const dtDate = DateTime.fromJSDate(date)
    const dtEndOfMonth = DateTime.fromJSDate(endOfMonth)
    const EndDate = DateTime.fromJSDate(end_date)
    var diffInDaysToMonth = dtEndOfMonth.diff(dtDate, 'days').as("days");
    var diffInDaysToEndDate = EndDate.diff(dtDate, 'days').as("days");
    return diffInDaysToEndDate > diffInDaysToMonth ? diffInDaysToMonth + 1 : diffInDaysToEndDate + 1
  }

  useEffect(() => {
    buildSchedule();
  }, [project]);

  const buildSchedule = () => {
    var projectDays = [];
    var projectMonths = []
    var currentMonth = ""
    var offset = 0

    for (var d = start_date; d <= end_date; d.setDate(d.getDate() + 1)) {
      projectDays.push((new Date(d)).getDate());
      var month = DateTime.fromJSDate(d).toFormat('LLLL')

      if (month != currentMonth) {
        var days = calculateDays(d)
        currentMonth = month
        projectMonths.push({month: month, days: days, offset: offset})
        offset += days
      }
    }
    setProjectDays(projectDays)
    setProjectMonths(projectMonths)
  }


  return <div className="sub-grid" style={{gridTemplateColumns: `200px repeat(${project?.duration}, 50px)`}}>
    {_.map(projectMonths, (month, index) => (
      <div key={index} className="border-1" style={{gridColumn: `${month["offset"] + 2} / span ${month["days"]}`}} >{month["month"]}</div>
    ))}
    {_.map(projectDays, (day, index) => (
      <div key={index} className="border-1" style={{gridColumn: `${index + 2}`}} >{day}</div>
    ))}
  </div>
}
