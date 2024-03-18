import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DateTime } from "luxon"

export default function DateBar({gridTemp}) {
  const project = useSelector((state) => state.project)
  const start_date = new Date(DateTime.fromISO(project?.start_date))
  const end_date = new Date(DateTime.fromISO(project?.end_date))
  const [projectDays, setProjectDays] = useState([])
  const [projectMonths, setProjectMonths] = useState([])

  const calculateDays = (date) => {
    const endOfMonth = date.endOf('month').startOf('day')
    const EndDate = DateTime.fromJSDate(end_date)
    const endOfMonthDiff = endOfMonth.diff(date, 'days').as("days");
    const endDateDiff = EndDate.diff(date, 'days').as("days");
    return endDateDiff > endOfMonthDiff ? endOfMonthDiff + 1 : endDateDiff + 1
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
        var days = calculateDays(DateTime.fromJSDate(d))
        currentMonth = month
        var monthObject = {month: month, days: days, offset: offset}
        if (days <= 3) {
          monthObject = {...monthObject, month: DateTime.fromJSDate(d).toFormat('LLL')}
        }
        projectMonths.push(monthObject)
        offset += days
      }
    }
    setProjectDays(projectDays)
    setProjectMonths(projectMonths)
  }


  return <div className="grid sticky-top" style={{...gridTemp, backgroundColor: "#32383e"}}>
    {_.map(projectMonths, (month, index) => (
      <div key={index} className="border-1" style={{gridColumn: `${month["offset"] + 2} / span ${month["days"]}`}} >{month["month"]}</div>
    ))}
    {_.map(projectDays, (day, index) => (
      <div key={index} className="border-1" style={{gridColumn: `${index + 2}`}} >{day}</div>
    ))}
  </div>
}
