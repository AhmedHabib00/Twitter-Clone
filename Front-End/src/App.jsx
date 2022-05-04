import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import Foundation from './Foundation/Foundation';
import Notifications from './Notifications/Notifications';
import ViewTweet from './Notifications/ViewTweet';
import Bookmarks from './Bookmarks/Bookmarks';
import Settings from './Settings/Settings';
import Home from './Home/Home';
import Start from './Start/Start';
import AdminFoundation from './Admin/AdminFoundation';
import AdminUsers from './Admin/AdminUsers';
import Dashboard from './Admin/Dashboard';
import Search from './Search/Search';
import { getClientRole } from './Services/accountServices';
import Tweet from './Home/Components/Tweet';
import getUserInfo from './Services/UserServices';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  useEffect(() => {
    (async () => {
      if (localStorage.token) {
        setIsLoggedIn(true);
        const resp = await getClientRole();
        if (resp.role === 'Admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          if (!userInfo) {
            setUserInfo(await getUserInfo(localStorage.userId));
          }
        }
      }
    })();
    document.getElementsByTagName('body')[0].style.setProperty('overflow-y', 'scroll');
  });
  const mainPage = () => {
    if (isLoggedIn) {
      if (isAdmin) {
        return <AdminFoundation setIsLoggedIn={setIsLoggedIn} />;
      }
      return <Foundation setIsLoggedIn={setIsLoggedIn} userInfo={(userInfo) || undefined} />;
    }
    return <Start setIsLoggedIn={setIsLoggedIn} setisAdmin={setIsAdmin} />;
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
      <Route path="users" element={<AdminUsers state="" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="blocked-users" element={<AdminUsers state="Banned" />} />
    </>
  );
  const startRoutes = () => (
    null
  );
  const userRoutes = () => (
    <>
      <Route path="Home" element={<Home />} />
      <Route path="Notifications" element={<Notifications />} />
      <Route path="ViewTweet" element={<ViewTweet />} />
      <Route path="Bookmarks" element={<Bookmarks />} />
      <Route path="tweet/:id" element={<Tweet />} />
      <Route path="Search" element={<Search />} />
      <Route path="Settings" element={<Settings />} />
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
          {selectingRoute()}
          <Route path="" element={<Navigate to={mainPath()} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
