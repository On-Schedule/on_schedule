import React from "react";
import Tooltip from "../../common/Tooltip";

export default function DailyManpower() {
  const manpowerArray = [10, 9, 10, 12.5, 25, 91, 43, 91, 28, 28, 31, 28, 2.2, 3.5, 2.8, 9.1, 10, 4, 5, 2, 2, 1]
  const averageMP = manpowerArray.reduce((a,b) => a+b, 0) / manpowerArray.length

  return <div className="card" style={{margin: ".5em", width: "calc(100% - 1em)"}}>
    <div className="card-header">Daily Manpower</div>
    <div className="card-body">
      <div style={{display: "grid", gridTemplateColumn: `repeat(${manpowerArray.length}, 1fr)`, gridTemplateRows: "1fr"}}>
        {_.map(manpowerArray, (day, index) => (
            <div key={index} style={{gridColumn: index + 1, gridRow: "1", height: `${day}px`, backgroundColor: "var(--bs-info)", margin: "auto .25em 0 .25em"}}/>
        ))}
        <div style={{height: averageMP, borderTop: "red solid 1px", width: "100%", gridRow: "1", gridColumn: `1 / span ${manpowerArray.length}`, marginTop: "auto"}} />
      </div>
      Daily manpower report goes here
    </div>
  </div>
}