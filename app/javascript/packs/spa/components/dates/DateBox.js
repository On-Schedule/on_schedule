import React, { useContext, useState } from "react";
import { CalendarContext } from "./DateRangePicker";
import { EndDateContext, StartDateContext } from "./DateRangeField";

export default function DateBox({date, controlDates={}}) {
  const {startDate, endDate, handleClick, isHovering} = useContext(CalendarContext)
  const {startDateLimit} = useContext(StartDateContext)
  const {endDateLimit} = useContext(EndDateContext)
  const [hover, setHover] = useState(false)

  const outOfRange = () => {
    return ((startDateLimit && date < startDateLimit) || (endDateLimit && date > endDateLimit))
  }

  const boxClasses = () => {
    var className = ""
    if (outOfRange()) {
      className = "date-box-out-of-range"
    } else {
      className = "date-box-in-range"
    }

    if (startDate?.toLocaleString() == date.toLocaleString() && endDate?.toLocaleString() == date.toLocaleString()) {
      className = className + " date-box-selected date-box-start-end"
    } else if (startDate?.toLocaleString() == date.toLocaleString()) {
      className = className + " date-box-selected date-box-start"
    } else if (endDate?.toLocaleString() == date.toLocaleString()) {
      className = className + " date-box-selected date-box-end"
    } else if (
      (startDate && endDate && startDate < date && endDate > date) ||
      (startDate && !endDate && startDate < date && controlDates.hovering >= date) ||
      (hover && !outOfRange())
    ) {
      className = className + " date-box-focused"
    }

    return className
  }
  // const boxClasses = () => {
  //   if ((startDateLimit && date < startDateLimit) || (endDateLimit && date > endDateLimit)) {
  //     return "date-box-out-of-range"
  //   } else if (startDate?.toLocaleString() == date.toLocaleString() && endDate?.toLocaleString() == date.toLocaleString()) {
  //     return "date-box-selected date-box-start-end"
  //   } else if (startDate?.toLocaleString() == date.toLocaleString()) {
  //     return "date-box-selected date-box-start"
  //   } else if (endDate?.toLocaleString() == date.toLocaleString()) {
  //     return "date-box-selected date-box-end"
  //   } else if (
  //     (startDate && endDate && startDate < date && endDate > date) ||
  //     (startDate && !endDate && startDate < date && controlDates.hovering > date) ||
  //     (hover)
  //   ) {
  //     return "date-box-focused"
  //   }
  // }

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
