import React, { useState, useEffect } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DatePicker from './Components/DatePicker';
import styles from './StepOne.module.css';
import useForm from './Components/useForm';
import Loader from '../../Components/Loader/Loader';

/**
 * This is the first state in the signup form in which the user will
 * type the name, email and birthdate.
 * @param {function} handleCloseSignup [used to manage closing the modal]
 * @param {function} setEmail [sets the email of the user to be able to use
 * it in the up comming steps]
 * @param {function} setStepOne [used to manage the first step status]
 * @param {function} setStepVerify [used to manage the verification step]
 * @returns Name, Email , birthdate form
 */
function StepOne({
  handleCloseSignup, setEmail, setStepOne,
  setStepVerify,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState('');
  const today = new Date();
  const endYear = today.getFullYear();
  const startYear = endYear - 120;
  const {
    handleChange, values, handleSubmit, errors,
  } = useForm(date, setStepOne, setStepVerify, setIsLoading);
  useEffect(() => {
    setEmail(values.email);
  });
  return (
    <div data-testid="step-one" id="sign-up-modal-step-one">
      <div className="modal-loaders-container">
        {isLoading && <Loader />}
      </div>
      <div className="start-modals-header">
        <div>
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
              data-testid="input-name"
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
           && (
           <p
             className="start-modals-form-errors"
             id="sign-up-name-error"
           >
             {errors.name}
           </p>
           )}
          <label className="start-modals-form-label" htmlFor="email">
            <input
              data-testid="input-email"
              className="start-modals-form-input"
              type="email"
              id="email"
              name="email"
              placeholder=" "
              value={values.email}
              onChange={handleChange}
            />
            <span>Email</span>
          </label>
          {errors.email
             && (
             <p
               className="start-modals-form-errors"
               id="sign-up-email-error"
             >
               {errors.email}
             </p>
             )}
          <div className={styles['date-container']}>
            <h3>Date of birth</h3>
            <p className={styles['signup-form-text']}>
              This will not be shown publicly. Confirm your own age,
              even if this account is for a business, a pet, or something else.
            </p>
            <DatePicker setDate={setDate} endYear={endYear} startYear={startYear} />
          </div>
          {errors.birthdate
           && (
           <p
             className="start-modals-form-errors"
             id="sign-up-date-error"
           >
             {errors.birthdate}
           </p>
           )}
        </div>
        <div className="start-modals-button-container">
          <Button
            id="next-button"
            data-testid="next-button"
            variant="outlined"
            className="start-modals-button"
            type="submit"
            disabled={isLoading}
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
