import React, { useContext, useState } from "react";
import { CalendarContext, EndDateContext, StartDateContext } from "./DateUtils";
import { object } from "prop-types"

DateBox.propTypes = {
  date: object.isRequired,
  controlDates: object
}

DateBox.defaultProps = {
  controlDates: {}
}

export default function DateBox(props) {
  const {date, controlDates} = props
  const {startDate, endDate, handleClick, isHovering} = useContext(CalendarContext)
  const {dateRangeMin} = useContext(StartDateContext)
  const {dateRangeMax} = useContext(EndDateContext)
  const [hover, setHover] = useState(false)

  const outOfRange = () => {
    return ((dateRangeMin && date < dateRangeMin) || (dateRangeMax && date > dateRangeMax))
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
