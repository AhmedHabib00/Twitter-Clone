import React from 'react';
import './SignUp.css';
import PropTypes from 'prop-types';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DatePicker from '../Components/DatePicker';

function SignUp({ closeSignup }) {
  return (
    <div className="signup-background">
      <div className="signup-container">
        <div className="header">
          <div className="close-signup">
            <IconButton onClick={() => {
              closeSignup(false);
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
        <div className="button">
          <Button
            variant="outlined"
            className="next-button"
            // onClick={() => { setSignup(true); }}
          >
            Next
          </Button>
        </div>
      </div>

    </div>
  );
}

export default SignUp;
SignUp.propTypes = {
  closeSignup: PropTypes.func.isRequired,
};
