import React from 'react';
import ProjectsCard from './dashboard/ProjectsCard';
import CurrentTasksCard from './dashboard/CurrentTasksCard';

export default function UserDashboard() {
  return <>
  <div className='dashboard-wrapper'>
    <ProjectsCard />
    <CurrentTasksCard />
  </div>
  </>
}