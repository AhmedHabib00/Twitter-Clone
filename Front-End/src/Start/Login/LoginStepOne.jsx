import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import useLoginForm from './components/useLoginForm';
import styles from './LoginStepOne.module.css';

/**
 * This is the first state in the Login form in which the user will
 * type the username or email.
 * @param {function} setEmail sets the email of the user to be able to use
 * it in the up comming steps
 * @param {function} setStepOne used to manage the first step status
 * @param {function} setLoginPassword used to manage the password step
 * @param {function} setForgotPassword used to manage the forgot password step
 * @returns Email or username form
 */

function LoginStepOne({
  setStepOne, setLoginPassword, setEmail, setForgotPassword,
}) {
  const {
    handleChange, values, handleSubmit, errors,
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
          <label className="start-modals-form-label" htmlFor="emailOrUsername">
            <input
              data-testid="login-email"
              type="text"
              id="login-email"
              name="emailOrUsername"
              value={values.emailOrUsername}
              placeholder=" "
              onChange={handleChange}
            />
            <span>Email or Username</span>
          </label>
          {errors.emailOrUsername
             && <p className={styles['login-form-errors']}>{errors.emailOrUsername}</p>}
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
          onClick={() => {
            setStepOne(false);
            setForgotPassword(true);
          }}
        >
          Forgot password?
        </Button>

      </div>
    </div>
  );
}

export default LoginStepOne;
LoginStepOne.propTypes = {
  setStepOne: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setLoginPassword: PropTypes.func.isRequired,
  setForgotPassword: PropTypes.func.isRequired,
};
