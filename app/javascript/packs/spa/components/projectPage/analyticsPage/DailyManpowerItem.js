import React from "react";

export default function DailyManpowerItem() {
  return <>
    <div key={index} style={{gridColumn: index + 1, gridRow: "1", height: `${day}px`, backgroundColor: "var(--bs-info)", margin: "auto .25em 0 .25em"}}/>
    <Tooltip><span>day</span></Tooltip>
  </>
}
