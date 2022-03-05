import React from 'react';
import './Start.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import Button from '@mui/material/Button';

function Start() {
  return (
    <div className="container">
      <div className="right-column-container">
        <div className="right-group">
          <TwitterIcon className="right-logo" />
          <h1>Happening now</h1>
          <h2>Join Whisper today.</h2>
          <div className="buttons-group">
            <Button
              variant="outlined"
              className="signup-tweet-google"
            >
              <img
                className="google-logo"
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="google logo"
              />
              Sign up with Google
            </Button>
            <Button
              variant="outlined"
              className="signup-tweet"
            >
              Sign up with email
            </Button>
            <p>
              By signing up, you agree to the
              {' '}
              <span>Terms of Service</span>
              {' '}
              and
              {' '}
              <span>Privacy Policy</span>
              ,
              including
              {' '}
              <span>Cookie Use</span>
              .
            </p>
            <h3>Already have an acount?</h3>
            <Button
              variant="outlined"
              className="sign-in"
            >
              Sign in
            </Button>
          </div>
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
