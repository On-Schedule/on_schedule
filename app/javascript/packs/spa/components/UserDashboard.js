import React from 'react';
import ProjectsCard from './dashboard/ProjectsCard';

export default function UserDashboard() {
  return <>
  <h1>User Dashboard</h1>
  <div className='dashboard-wrapper'>
    <ProjectsCard />
  </div>
  </>
}