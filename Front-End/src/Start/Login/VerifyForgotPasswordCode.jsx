import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import styles from './VerifyForgetPasswordCode.module.css';
import useVerifyCodeForm from './components/useVerifyCodeForm';
import Loader from '../../Components/Loader/Loader';
/**
 * This function is used to make a verification code form for the forgot
 * my password process
 * @param {string} email The info of the user trying to get his password
 * @param {function} setSettingPassword Manages the status of the setting password modal
 * @param {function} setVerifyCode Manages the verification code modal
 * @returns verification code form
 */

function VerifyForgotPasswordCode({ email, setVerifyCode, setSettingPassword }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleChange, values, handleSubmit, errors,
  } = useVerifyCodeForm(email, setVerifyCode, setSettingPassword, setIsLoading);
  return (
    <div className={styles['forgot-password-container']} id="login-modal-verify-code">
      <div className="modal-loaders-container">
        {isLoading && <Loader />}
      </div>
      <form
        className={styles['forgot-password-form']}
        onSubmit={handleSubmit}
      >
        <div className={styles.body}>
          <h1 className={styles.title}>Check your email</h1>
          <p className={styles.subtitle}>
            You will receive a code to verify here so you
            can reset your acount password.

          </p>
          <label className="start-modals-form-label" htmlFor="code">
            <input
              data-testid="input-email"
              className="start-modals-form-input"
              type="text"
              id="login-verification-code"
              name="code"
              value={values.code}
              placeholder=" "
              onChange={handleChange}
            />
            <span>Enter your Code</span>
          </label>
          {errors.code
             && (
             <p
               className="start-modals-form-errors"
               id="forgot-password-verify-error"
             >
               {errors.code}
             </p>
             )}
          <div className="start-modals-button-container">
            <Button
              id="verify-email-button"
              data-testid="verify-email-button"
              variant="outlined"
              className={styles['forgot-password-button']}
              type="submit"
              disabled={isLoading}
            >
              Verify
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default VerifyForgotPasswordCode;
VerifyForgotPasswordCode.propTypes = {
  email: PropTypes.string.isRequired,
  setVerifyCode: PropTypes.func.isRequired,
  setSettingPassword: PropTypes.func.isRequired,
};
