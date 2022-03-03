import React from 'react';
import './Start.css';
import TwitterIcon from '@mui/icons-material/Twitter';

function Start() {
  return (
    <div className="container">
      <div className="right-column-container">
        <div className="right-group">
          <TwitterIcon className="right-logo" />
          <h1>Happening now</h1>
          <h2>Join Twitter today</h2>
          <button type="submit">Sign up with email</button>
        </div>
      </div>
      <div className="left-column-container">
        <div className="logo">
          <TwitterIcon className="logo-size" />
        </div>
      </div>
    </div>
  );
}

export default Start;
