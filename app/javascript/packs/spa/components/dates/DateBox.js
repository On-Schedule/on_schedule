import React, { useState } from "react";

export default function DateBox({date, controlDates={}, handleClick=()=>{}, isHovering=()=>{}}) {
  const [hover, setHover] = useState(false)

  const boxClasses = () => {
    if (controlDates.startDate?.toLocaleString() == date.toLocaleString() && controlDates.endDate?.toLocaleString() == date.toLocaleString()) {
      return "date-box-selected date-box-start-end"
    } else if (controlDates.startDate?.toLocaleString() == date.toLocaleString()) {
      return "date-box-selected date-box-start"
    } else if (controlDates.endDate?.toLocaleString() == date.toLocaleString()) {
      return "date-box-selected date-box-end"
    } else if (
      (controlDates.startDate && controlDates.endDate && controlDates.startDate < date && controlDates.endDate > date) ||
      (controlDates.startDate && !controlDates.endDate && controlDates.startDate < date && controlDates.hovering >= date) ||
      (hover)
    ) {
      return "date-box-focused"
    }
  }

  const hovering = () => {
    setHover(true)
    isHovering(date)
  }

  return <>{date.month != controlDates.month ? <div className="date-box" ></div>  : <div
    className={boxClasses() + " date-box"}
    onMouseEnter={hovering}
    onMouseLeave={() => {setHover(false)}}
    onClick={() =>{handleClick(date)}}
  > {date.day} </div>}</>
}
