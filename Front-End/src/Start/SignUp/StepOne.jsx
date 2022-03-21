import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DatePicker from '../Components/DatePicker';
import styles from './StepOne.module.css';

function StepOne({ handleCloseSignup, setStepOne, setStepTwo }) {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles['close-signup']}>
          <IconButton onClick={() => {
            handleCloseSignup(false);
            document.body.style.overflow = 'unset';
          }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className={styles['signup-icon']}>
          <TwitterIcon className={styles['signup-icon-size']} />
        </div>
      </div>
      <h1 className={styles.title}>Create your account</h1>
      <form className={styles['signup-form']}>
        <div className={styles.body}>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              placeholder=" "
              maxLength="50"
            />
            <span>Name</span>
          </label>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              placeholder=" "
            />
            <span>Email</span>
          </label>
          <div className={styles['date-container']}>
            <h3>Date of birth</h3>
            <p>
              This will not be shown publicly. Confirm your own age,
              even if this account is for a business, a pet, or something else.
            </p>
            <DatePicker />
          </div>
        </div>
        <div className={styles['next-button-container']}>
          <Button
            variant="outlined"
            className={styles['next-button']}
            onClick={() => {
              setStepOne(false);
              setStepTwo(true);
            }}
          >
            Next
          </Button>
        </div>
      </form>

    </div>
  );
}

export default StepOne;
StepOne.propTypes = {
  handleCloseSignup: PropTypes.func.isRequired,
  setStepOne: PropTypes.func.isRequired,
  setStepTwo: PropTypes.func.isRequired,
};
