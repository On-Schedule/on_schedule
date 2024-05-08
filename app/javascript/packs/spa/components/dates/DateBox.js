import React, { useState } from "react";

export default function DateBox({date, controlDates={}, handleClick=()=>{}, isHovering=()=>{}}) {
  const [hover, setHover] = useState(false)
  const [select, setSelect] = useState(false)

  const bgColor = () => {
    if (date.month != controlDates.month) {
      return {
        backgroundColor: "#1f1f1f",
        color: "black"
      }
    } else if (controlDates.startDate?.toLocaleString() == date.toLocaleString() || controlDates.endDate?.toLocaleString() == date.toLocaleString()) {
      return {
        backgroundColor: "#0f3e8a"
      }
    } else if (controlDates.startDate < date && controlDates.endDate > date) {
      return {
        backgroundColor: "#5f96ee",
        color: "black"
      }
    } else if (controlDates.startDate < date && controlDates.hovering > date && !controlDates.endDate) {
      return {
        backgroundColor: "#5f96ee",
        color: "black"
      }
    } else if (hover) {
      return {
        backgroundColor: "#5f96ee",
        color: "black"
      }
    }
  }

  const test = (e) => {
    setSelect(true)
    handleClick(date)
  }

  const hovering = () => {
    setHover(true)
    isHovering(date)
  }

  const testTwo = () => {
    return date.month != controlDates.month
  }

  return <>{testTwo() ? <div style={{width: "35px", height: "35px"}} ></div>  : <div
    style={{width: "35px", height: "35px", lineHeight: "30px", borderStyle: "solid", textAlign: "center", verticalAlign: "center", ...bgColor()}}
    onMouseEnter={hovering}
    onMouseLeave={() => {setHover(false)}}
    onClick={test}
  > {date.day} </div>}</>
}