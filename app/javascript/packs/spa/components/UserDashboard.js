import React from 'react';
import ProjectsCard from './dashboard/ProjectsCard';
import CurrentTasksCard from './dashboard/CurrentTasksCard';

export default function UserDashboard() {
  return <div className='dashboard-wrapper flex-wrap'>
    <ProjectsCard />
    <CurrentTasksCard />
  </div>
}
