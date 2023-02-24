import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet, Navigate, Link, useMatch } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import LoginPage from './components/LoginPage';


function App() {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Routes>
        <Route index element={<UserDashboard />}/>
        <Route path='/login' element={<LoginPage />}/>
      </Routes>
    </div>
  );
}

export default App;
