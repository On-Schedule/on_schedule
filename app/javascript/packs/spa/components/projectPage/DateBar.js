import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DateTime } from "luxon"

export default function DateBar({gridTemp, scale}) {
  const project = useSelector((state) => state.project)
  const startDate = DateTime.fromISO(project?.start_date)
  const endDate = DateTime.fromISO(project?.end_date)
  const [dateBarInfo, setDateBarInfo] = useState([])

  const calculateDays = (date) => {
    const endOfMonth = date.endOf('month').startOf('day')
    const endOfMonthDiff = endOfMonth.diff(date, 'days').as("days") +1;
    const endDateDiff = endDate.diff(date, 'days').as("days") +1;
    return endOfMonthDiff < endDateDiff ? endOfMonthDiff : endDateDiff
  }

  useEffect(() => {
    createDateBar();
  }, [project]);

  const monthValues = (date, days) => {
    const longMonth = date.toFormat('LLLL')
    const shortMonth = date.toFormat('LLL')
    const noMonth = ""
    var day = days <= 3 ? shortMonth : longMonth
    var month = longMonth
      if (days < 10){
        month = noMonth
      } else if (days < 20) {
        month = shortMonth
      }
      return {"month": month, "day": day, "year": shortMonth}
  }

  const createDateBar = () => {
    var offset = 0
    var months = []

    for (var d = startDate; d <= endDate; d = d.plus({months: 1}).startOf("month")) {
      var days = calculateDays(d)
      var startDay = d.get("day")
      var monthObject = {month: monthValues(d, days), days: days, offset: offset, startRange: startDay, endRange: startDay + days}
      months.push(monthObject)
      offset += days
    }
    setDateBarInfo(months)
  }

  return <div className="grid sticky-top" style={{...gridTemp, backgroundColor: "var(--bs-card-bg)"}}>
    {_.map(dateBarInfo, (month, indexM) => (
      <div key={indexM} className="date-bar" style={{gridColumn: `${month.offset + 2} / span ${month.days}`, gridRow: "1"}} ><span className=" sticky-left sticky-right" style={{"--stick-l": "250px"}}>{month.month[scale]}</span></div>
    ))}
    {scale === "day" ? _.map(dateBarInfo, (month, indexM) => (
      _.map(_.range(month.startRange, month.endRange), (day, indexD) => (
        <div key={`${indexM}-${indexD}`} className="date-bar" style={{gridColumn: `${month.offset + indexD + 2}`, gridRow: "2"}} >{day}</div>
    )))) : "" }
  </div>
}

// option 1 (better but throws and error about unique keys)
// {_.map(dateBarInfo, (month, indexM) => (
//   <>
//     <div key={indexM} className="date-bar" style={{gridColumn: `${month.offset + 2} / span ${month.days}`, gridRow: "1"}} >{month.month[scale]}</div>
//     { scale === "day" ? _.map(_.range(month.startRange, month.endRange), (day, indexD) => (
//       <div key={`${indexM}-${indexD}`} className="date-bar" style={{gridColumn: `${month.offset + indexD + 2}`, gridRow: "2"}} >{day}</div>
//     )) : ""}
//   </>
// ))}

// option 2 (less performant but no unique keys error)
// {_.map(dateBarInfo, (month, indexM) => (
//   <div key={indexM} className="date-bar" style={{gridColumn: `${month.offset + 2} / span ${month.days}`, gridRow: "1"}} >{month.month[scale]}</div>
// ))}
// {scale === "day" ? _.map(dateBarInfo, (month, indexM) => (
//   _.map(_.range(month.startRange, month.endRange), (day, indexD) => (
//     <div key={`${indexM}-${indexD}`} className="date-bar" style={{gridColumn: `${month.offset + indexD + 2}`, gridRow: "2"}} >{day}</div>
// )))) : "" }