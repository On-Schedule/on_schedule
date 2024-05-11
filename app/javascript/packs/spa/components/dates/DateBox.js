import React, { useContext, useState } from "react";
import { CalendarContext } from "./DateRangePicker";

export default function DateBox({date, controlDates={}}) {
  const {startDate, endDate, handleClick, isHovering} = useContext(CalendarContext)
  const [hover, setHover] = useState(false)

  const boxClasses = () => {
    if (startDate?.toLocaleString() == date.toLocaleString() && endDate?.toLocaleString() == date.toLocaleString()) {
      return "date-box-selected date-box-start-end"
    } else if (startDate?.toLocaleString() == date.toLocaleString()) {
      return "date-box-selected date-box-start"
    } else if (endDate?.toLocaleString() == date.toLocaleString()) {
      return "date-box-selected date-box-end"
    } else if (
      (startDate && endDate && startDate < date && endDate > date) ||
      (startDate && !endDate && startDate < date && controlDates.hovering > date) ||
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
