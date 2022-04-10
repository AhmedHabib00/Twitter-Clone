import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import useLoginForm from './components/useLoginForm';
import styles from './LoginStepOne.module.css';

function LoginStepOne({ setStepOne, setLoginPassword, setEmail }) {
  const {
    handleChange, values, handleSubmit,
  } = useLoginForm(setStepOne, setEmail, setLoginPassword);
  return (
    <div>
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
        <form
          className={styles['login-form']}
          onSubmit={handleSubmit}
        >
          <label className="start-modals-form-label" htmlFor="email">
            <input
              data-testid="login-email"
              type="email"
              id="login-email"
              name="email"
              value={values.email}
              placeholder=" "
              onChange={handleChange}
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
          </div>
        </form>
        <Button
          id="signup-facebook-button"
          data-testid="facebook-button"
          variant="outlined"
          className={styles['login-with-google']}
        >
          Forgot password?
        </Button>
        <div className={styles['login-text']}>
          <p className={styles['dont-have-acount']}>
            Don&apos;t have an account?
            <span className={styles['login-text-span']}> Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginStepOne;
LoginStepOne.propTypes = {
  setStepOne: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setLoginPassword: PropTypes.func.isRequired,
};
