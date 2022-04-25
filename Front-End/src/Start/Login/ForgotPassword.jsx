import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './ForgotPassword.module.css';
import useForgetPasswordForm from './components/useForgotPasswordForm';
/**
 * This function is used to make a email or username form for the forgot
 * my password process
 * @param {string} setEmail Sets the info of the user trying to get his password
 * @param {function} setForgotPassword Manages the status of the forgot password modal
 * @param {function} setVerifyCode Manages the verification code modal
 * @returns email or username form
 */

function ForgotPassword({ setForgotPassword, setEmail, setVerifyCode }) {
  const {
    handleChange, values, handleSubmit, errors,
  } = useForgetPasswordForm(setEmail, setForgotPassword, setVerifyCode);
  return (
    <div className={styles['forgot-password-container']} id="login-modal-forgot-password">
      <form
        className={styles['forgot-password-form']}
        onSubmit={handleSubmit}
      >
        <div className={styles.body}>
          <h1 className={styles.title}>Find your Twitter account</h1>
          <label className="start-modals-form-label" htmlFor="emailOrUsername">
            <input
              data-testid="input-email"
              className="start-modals-form-input"
              type="text"
              id="Find-Twitter-account-emailOrUsername"
              name="emailOrUsername"
              value={values.emailOrUsername}
              placeholder=" "
              onChange={handleChange}
            />
            <span>Enter your Email or username</span>
          </label>
          {errors.emailOrUsername
             && (
             <p
               className="start-modals-form-errors"
               id="forgot-password-emailor-username-error"
             >
               {errors.emailOrUsername}
             </p>
             )}
          <div className="start-modals-button-container">
            <Button
              id="search-email-button"
              data-testid="search-email-button"
              variant="outlined"
              className={styles['forgot-password-button']}
              type="submit"
            >
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
ForgotPassword.propTypes = {
  setForgotPassword: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setVerifyCode: PropTypes.func.isRequired,
};
