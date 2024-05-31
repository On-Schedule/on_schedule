import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeekOverview } from "../../actions/analytics";

export default function OverviewCard() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.analytics?.weekOverview)

  const averageManpower = () => {
    return (data?.daily_manpower.reduce((partialSum, a) => partialSum + a, 0) / 7).toFixed(2)
  }

  useEffect(() => {
    dispatch(getWeekOverview());
  }, [])

  return <div className="card border-primary mb-3 mx-md-2 dashboard-card" id="overview-card">
    <div className="card-header navbar"> Overview</div>
    <div className="card-body dashboard-card-body">
      <span>place holder for overview card</span><br/>
      <span>Active Tasks this week: {data?.current_tasks}</span><br/>
      <span>Tasks starting this week: {data?.tasks_starting}</span><br/>
      <span>Tasks ending this week: {data?.tasks_ending}</span><br/>
      <span>average daily manpower needed this week: {averageManpower()}</span><br/>
    </div>
  </div>
}
