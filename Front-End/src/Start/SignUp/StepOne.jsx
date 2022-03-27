import React, { useState } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DatePicker from '../Components/DatePicker';
import styles from './StepOne.module.css';
import useForm from '../Components/useForm';

function StepOne({
  handleCloseSignup, setEmail, setStepOne,
  setStepVerify,
}) {
  const [date, setDate] = useState();
  const {
    handleChange, values, handleSubmit, errors,
  } = useForm(date, setStepOne, setStepVerify);
  setEmail(values.email);
  return (
    <div>
      <div className="start-modals-header">
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
          <TwitterIcon className="start-modals-icon-size" />
        </div>
      </div>
      <h1 className={styles.title}>Create your account</h1>
      <form
        className={styles['signup-form']}
        onSubmit={handleSubmit}
      >
        <div className={styles.body}>
          <label className="start-modals-form-label" htmlFor="name">
            <input
              className="start-modals-form-input"
              type="text"
              id="name"
              name="name"
              placeholder=" "
              maxLength="50"
              value={values.name}
              onChange={handleChange}
            />
            <span>Name</span>
          </label>
          {errors.name
           && <p className="start-modals-form-errors">{errors.name}</p>}
          <label className="start-modals-form-label" htmlFor="email">
            <input
              className="start-modals-form-input"
              type="email"
              id="email"
              name="email"
              placeholder=" "
              value={values.email}
              onChange={handleChange}
            />
            <span>Email</span>
            {errors.email
             && <p className="start-modals-form-errors">{errors.email}</p>}
          </label>
          <div className={styles['date-container']}>
            <h3>Date of birth</h3>
            <p className={styles['signup-form-text']}>
              This will not be shown publicly. Confirm your own age,
              even if this account is for a business, a pet, or something else.
            </p>
            <DatePicker setDate={setDate} />
          </div>
        </div>
        <div className="start-modals-button-container">
          <Button
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

export default StepOne;
StepOne.propTypes = {
  handleCloseSignup: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setStepOne: PropTypes.func.isRequired,
  setStepVerify: PropTypes.func.isRequired,

};
