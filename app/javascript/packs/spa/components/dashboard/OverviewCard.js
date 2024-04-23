import React from "react";

export default function OverviewCard() {
  return <div className="card border-primary mb-3 mx-md-2 dashboard-card" id="overview-card">
    <div className="card-header navbar"> Overview</div>
    <div className="card-body dashboard-card-body">
      <span>place holder for overview card</span><br/>
      <span>Active Tasks this week: 15</span><br/>
      <span>Tasks starting this week: 9</span><br/>
      <span>Tasks ending this week: 2</span><br/>
      <span>average daily manpower needed this week: 3.7</span><br/>
    </div>
  </div>
}
