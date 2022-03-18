import { React, useState } from 'react';
import './SignUp.css';
import PropTypes from 'prop-types';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import CloseIcon from '@mui/icons-material/Close';
// import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
// import DatePicker from '../Components/DatePicker';
import StepOne from './StepOne';

function SignUp({ closeSignup }) {
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const handleCloseSignup = (e) => {
    closeSignup(e);
  };

  return (
    <div className="signup-background">
      <div className="signup-container">
        {stepOne && (
        <StepOne
          handleCloseSignup={handleCloseSignup}
          setStepOne={setStepOne}
          setStepTwo={setStepTwo}
        />
        )}
        {stepTwo && <div>Step two </div>}
      </div>

    </div>
  );
}

export default SignUp;
SignUp.propTypes = {
  closeSignup: PropTypes.func.isRequired,
};
