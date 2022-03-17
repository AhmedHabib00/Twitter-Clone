import React from 'react';
import './SignUp.css';
import PropTypes from 'prop-types';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import CloseIcon from '@mui/icons-material/Close';
// import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
// import DatePicker from '../Components/DatePicker';
import StepOne from './StepOne';

function SignUp({ closeSignup }) {
  const handleCloseSignup = (e) => {
    closeSignup(e);
  };

  return (
    <div className="signup-background">
      <div className="signup-container">
        <StepOne handleCloseSignup={handleCloseSignup} />
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
