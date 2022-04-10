import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import Foundation from './Foundation/Foundation';
import Notifications from './Notifications/Notifications';
import Bookmarks from './Bookmarks/Bookmarks';
import Profile from './Profile/Profile';
import More from './More/More';
import Home from './Home/Home';
import Start from './Start/Start';
import AdminFoundation from './Admin/AdminFoundation';
import AdminUsers from './Admin/AdminUsers';
import Dashboard from './Admin/Dashboard';
import BlockedUsers from './Admin/AdminBlocked';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  localStorage.clear();
  useEffect(() => {
    const logged = localStorage.getItem('logged');
    const admin = localStorage.getItem('admin');
    setIsLoggedIn(logged);
    setisAdmin(!admin);
  }, []);
  const mainPage = () => {
    if (isLoggedIn) {
      if (isAdmin) {
        return <AdminFoundation />;
      }
      return <Foundation />;
    }
    return <Start setIsLoggedIn={setIsLoggedIn} setisAdmin={setisAdmin} />;
  };

  const mainPath = () => {
    if (isLoggedIn) {
      if (isAdmin) {
        return 'users';
      }
      return 'Home';
    }
    return '';
  };
  const adminRoutes = () => (
    <>
      <Route path="users" element={<AdminUsers />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="blocked-users" element={<BlockedUsers />} />
    </>
  );
  const startRoutes = () => (
    null
  );
  const userRoutes = () => (
    <>
      <Route path="Home" element={<Home />} />
      <Route path="Notifications" element={<Notifications />} />
      <Route path="Bookmarks" element={<Bookmarks />} />
      <Route path="Profile" element={<Profile />} />
      <Route path="More" element={<More />} />
    </>
  );
  const selectingRoute = () => {
    if (isLoggedIn) {
      if (isAdmin) {
        return adminRoutes();
      }
      return userRoutes();
    }
    return startRoutes();
  };
  return (
    <Router>
      <Routes>

        <Route path="/" element={mainPage()}>
          <Route path="" element={<Navigate to={mainPath()} />} />
          {selectingRoute()}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
