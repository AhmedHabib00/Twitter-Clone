import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Start from './Start/Start';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={(<Home />)} />
        <Route path="/Start" element={(<Start />)} />
      </Routes>
    </Router>
  );
}

export default App;
