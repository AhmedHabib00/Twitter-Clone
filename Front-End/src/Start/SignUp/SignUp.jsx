import React from 'react';
import './SignUp.css';
import PropTypes from 'prop-types';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function SignUp({ closeSignup }) {
  return (
    <div className="signup-background">
      <div className="signup-container">
        <div className="header">
          <div className="close-signup">
            <IconButton onClick={() => closeSignup(false)}>
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
            </div>
          </form>
        </div>
      </div>
      <div className="footer">footer</div>

    </div>
  );
}

export default SignUp;
SignUp.propTypes = {
  closeSignup: PropTypes.func.isRequired,
};
