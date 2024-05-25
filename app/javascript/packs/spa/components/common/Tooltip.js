import React from "react"

export default function Tooltip({children}) {
  return <div style={{position: "absolute", maxWidth: "5000px", zIndex: "2500"}}>
    <div className="tooltip-arrow-l" />
    <div className="tooltip-arrow-r" />
    <div className="" style={{backgroundColor: "var(--bs-primary)", marginTop: "-6px", borderRadius: "5px", padding: "0 10px", display: "block"}}>
      {children}
    </div>
  </div>
}