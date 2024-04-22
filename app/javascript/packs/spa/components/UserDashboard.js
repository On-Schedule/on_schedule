import React from 'react';
import ProjectsCard from './dashboard/ProjectsCard';
import CurrentTasksCard from './dashboard/CurrentTasksCard';
import OverviewCard from './dashboard/OverviewCard';

export default function UserDashboard() {
  return <div className='dashboard-wrapper flex-wrap'>
    <ProjectsCard />
    <CurrentTasksCard />
    <OverviewCard />
  </div>
}
