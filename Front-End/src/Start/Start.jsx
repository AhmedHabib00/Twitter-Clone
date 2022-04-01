import { React, useState } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import Button from '@mui/material/Button';
import styles from './Start.module.css';
import SignUp from './SignUp/SignUp';
/**
 * This functions renders the start page from which
 * user can login or signup with google, facebook, or email.
 * @returns Start page
 */
function Start() {
  const [signup, setSignup] = useState(false);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles['right-column-container']}>
          <div className={styles['right-group']}>
            <TwitterIcon className={styles['right-logo']} />
            <h1>Happening now</h1>
            <h2>Join Whisper today.</h2>
            <div className={styles['buttons-group']}>
              <Button
                id="signup-google-button"
                data-testid="google-button"
                variant="outlined"
                className={styles['signup-tweet-google']}
              >
                <img
                  className={styles['google-logo']}
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="google logo"
                />
                Sign up with Google
              </Button>
              <Button
                id="signup-facebook-button"
                data-testid="facebook-button"
                variant="outlined"
                className={styles['signup-tweet-google']}
              >
                <img
                  className={styles['google-logo']}
                  src="https://img.icons8.com/fluency/48/000000/facebook-new.png"
                  alt="google logo"
                />
                Sign up with Facebook
              </Button>
              <Button
                id="signup-email-button"
                data-testid="signup-button"
                variant="outlined"
                className={styles['signup-tweet']}
                onClick={() => {
                  setSignup(true);
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                  document.body.style.overflow = 'hidden';
                }}
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
                id="signin-button"
                data-testid="signin-button"
                variant="outlined"
                className={styles['sign-in']}
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
        <div className={styles['left-column-container']}>
          <div className={styles.logo}>
            <TwitterIcon className={styles['logo-size']} />
          </div>
        </div>
      </div>
      {signup && (
      <SignUp
        data-testid="signup-modal"
        closeSignup={setSignup}
      />
      )}
    </div>
  );
}

export default Start;
