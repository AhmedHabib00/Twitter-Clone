import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import Foundation from './Foundation/Foundation';
import Notifications from './Notifications/Notifications';
import Bookmarks from './Bookmarks/Bookmarks';
import Lists from './Lists/Lists';
import Profile from './Profile/Profile';
import More from './More/More';
import Home from './Home/Home';
import Start from './Start/Start';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Foundation />}>
          <Route path="" element={<Navigate to="/Home" />} />
          <Route path="Home" element={<Home />} />
          <Route path="Notifications" element={<Notifications />} />
          <Route path="Bookmarks" element={<Bookmarks />} />
          <Route path="Lists" element={<Lists />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="More" element={<More />} />
          <Route path="Start" element={(<Start />)} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
