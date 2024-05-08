import React, { useState } from "react";

export default function DateBox({date, controlMonth}) {
  const [hover, setHover] = useState(false)
  const [select, setSelect] = useState(false)

  const bgColor = () => {
    if (select) {
      return {
        backgroundColor: "#0f3e8a"
      }
    } else if (hover) {
      return {
        backgroundColor: "#5f96ee",
        color: "black"
      }
    } else if (date.month != controlMonth) {
      return {
        backgroundColor: "#1f1f1f",
        color: "black"
      }
    }

  }

  return <div
    style={{width: "35px", height: "35px", lineHeight: "30px", borderStyle: "solid", textAlign: "center", verticalAlign: "center", ...bgColor()}}
    onMouseEnter={() => {setHover(true)}}
    onMouseLeave={() => {setHover(false)}}
    onClick={() => {setSelect(true)}}
  > {date.day} </div>
}