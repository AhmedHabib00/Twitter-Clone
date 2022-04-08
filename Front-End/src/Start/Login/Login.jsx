import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import styles from './Login.module.css';

function Login({ closeLogin }) {
  return (
    <div className={styles['login-background']}>
      <div id="signup-modals" className="start-modals-container">
        <div className="start-modals-header">
          <div>
            <IconButton onClick={() => {
              closeLogin(false);
              document.body.style.overflow = 'unset';
            }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className={styles['login-icon']}>
            <TwitterIcon className="start-modals-icon-size" />
          </div>
        </div>
        <div className={styles.body}>
          <h1>Sign in to Whisper</h1>
          <Button
            id="signup-google-button"
            data-testid="google-button"
            variant="outlined"
            className={styles['login-with-google']}
          >
            <img
              className={styles['google-logo']}
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="google logo"
            />
            Sign in with Google
          </Button>
          <Button
            id="signup-facebook-button"
            data-testid="facebook-button"
            variant="outlined"
            className={styles['login-with-google']}
          >
            <img
              className={styles['google-logo']}
              src="https://img.icons8.com/fluency/48/000000/facebook-new.png"
              alt="google logo"
            />
            Sign in with Facebook
          </Button>
          <form className={styles['login-form']}>
            <label className="start-modals-form-label" htmlFor="email">
              <input
                data-testid="login-email"
                type="email"
                id="login-email"
                name="email"
                placeholder=" "
              />
              <span>Email</span>
            </label>
            <div className={styles['login-buttons-container']}>
              <Button
                id="next-button"
                data-testid="next-button"
                variant="outlined"
                className={styles['login-next-button']}
                type="submit"
              >
                Next
              </Button>
              <Button
                id="signup-facebook-button"
                data-testid="facebook-button"
                variant="outlined"
                className={styles['login-with-google']}
              >
                Forgot password?
              </Button>
            </div>
          </form>
          <div>
            <p>
              Don&apos;t have an account?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
Login.propTypes = {
  closeLogin: PropTypes.func.isRequired,
};
