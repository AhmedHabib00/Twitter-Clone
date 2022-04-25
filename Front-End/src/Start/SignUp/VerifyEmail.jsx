import { React } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropTypes from 'prop-types';
import styles from './VerifyEmail.module.css';
import useFormCode from './Components/useFormCode';
/**
 * In this function the user will type his verification code
 * @param {function}  handleGoToStepOne [used to manage the back arrow to step one]
 * @param {function}  setStepPassword [used to manage the password step status]
 * @param {function}  setStepVerify [used to manage the verification code step status]
 * @param {string}  email [used to be able to send the password to the backend with it]
 * @returns Verfication email form
 */

function VerifyEmail({
  handleGoToStepOne, setStepPassword, setStepVerify, email,
}) {
  const {
    handleChange, values, handleSubmit, errors,
  } = useFormCode(setStepPassword, setStepVerify, email);
  return (
    <div data-testid="verify-email" id="sign-up-modal-step-verify">
      <div className="start-modals-header">
        <div className={styles['close-signup']}>
          <IconButton onClick={handleGoToStepOne}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className={styles['code-logo']}>
          <TwitterIcon className="start-modals-icon-size" />
        </div>
      </div>
      <div className="start-modals-title-container">
        <h1 className={styles.title}> We sent you a code</h1>
        <p className={styles.subtitle}>
          Enter it below to verify
          {' '}
          {email}
        </p>
      </div>
      <form
        className={styles['code-form']}
        onSubmit={handleSubmit}
      >
        <div className="start-modals-body">
          <label htmlFor="verificationCode">
            <input
              className="start-modals-form-input"
              type="text"
              id="verificationCode"
              name="code"
              value={values.code}
              placeholder=" "
              onChange={handleChange}
            />
            <span>Verification Code</span>
          </label>
          {errors.code
           && (
           <p
             className="start-modals-form-errors"
             id="sign-up-verify-error"
           >
             {errors.code}
           </p>
           )}
        </div>
        <div className="start-modals-button-container">
          <Button
            id="signup-submit-verification-code"
            variant="outlined"
            className="start-modals-button"
            type="submit"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}

export default VerifyEmail;
VerifyEmail.propTypes = {
  handleGoToStepOne: PropTypes.func.isRequired,
  setStepVerify: PropTypes.func.isRequired,
  setStepPassword: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};
