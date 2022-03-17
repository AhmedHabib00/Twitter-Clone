import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import DatePicker from '../Components/DatePicker';

function StepOne({ handleCloseSignup }) {
  return (
    <div>
      <div className="header">
        <div className="close-signup">
          <IconButton onClick={() => {
            handleCloseSignup(false);
            document.body.style.overflow = 'unset';
          }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className="signup-icon">
          <TwitterIcon className="signup-icon-size" />
        </div>
      </div>
      <div className="body">
        <div className="title">Create your account</div>
        <form className="signup-form">
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
          <div className="date-container">
            <h3>Date of birth</h3>
            <p>
              This will not be shown publicly. Confirm your own age,
              even if this account is for a business, a pet, or something else.
            </p>
            <DatePicker />
          </div>
        </form>
      </div>

    </div>
  );
}

export default StepOne;
StepOne.propTypes = {
  handleCloseSignup: PropTypes.func.isRequired,
};
