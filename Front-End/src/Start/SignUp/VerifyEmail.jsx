import { React } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropTypes from 'prop-types';
import styles from './VerifyEmail.module.css';
import useFormCode from '../Components/useFormCode';

function VerifyEmail({
  handleGoToStepOne, setStepPassword, setStepVerify, email,
}) {
  const {
    handleChange, values, handleSubmit, errors,
  } = useFormCode(setStepPassword, setStepVerify, email);
  return (
    <div>
      <div className={styles.header}>
        <div className={styles['close-signup']}>
          <IconButton onClick={handleGoToStepOne}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className={styles['code-logo']}>
          <TwitterIcon className={styles['signup-icon-size']} />
        </div>
      </div>
      <div className={styles['title-container']}>
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
        <div className={styles.body}>
          <label htmlFor="verificationCode">
            <input
              type="text"
              id="verificationCode"
              name="code"
              value={values.code}
              placeholder=" "
              onChange={handleChange}
            />
            <span>Verification Code</span>
          </label>
          {errors.code && <p>{errors.code}</p>}
        </div>
        <div className={styles['signup-button-container']}>
          <Button
            variant="outlined"
            className={styles['signup-button']}
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
