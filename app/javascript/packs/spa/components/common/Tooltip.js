import React from "react"

export default function Tooltip({children}) {
  return <div className="tooltip-wrapper">
    <div className="tooltip-arrow-l" />
    <div className="tooltip-arrow-r" />
    <div className="tooltip-body">
      {children}
    </div>
  </div>
}
