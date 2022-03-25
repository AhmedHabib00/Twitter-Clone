import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DatePicker from '../Components/DatePicker';
import styles from './StepOne.module.css';
import useForm from '../Components/useForm';
// import validateInfo from '../Components/validateInfo';

function StepOne({ handleCloseSignup }) {
  const {
    handleChange, values, handleSubmit, errors,
  } = useForm();
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
      <form
        className={styles['signup-form']}
        onSubmit={handleSubmit}
      >
        <div className={styles.body}>
          <label htmlFor="name">
            <input
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
          {errors.name && <p>{errors.name}</p>}
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" "
              value={values.email}
              onChange={handleChange}
            />
            <span>Email</span>
            {errors.email && <p>{errors.email}</p>}
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
};
