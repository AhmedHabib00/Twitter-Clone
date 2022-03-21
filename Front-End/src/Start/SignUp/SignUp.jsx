import { React, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SignUp.module.css';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import CloseIcon from '@mui/icons-material/Close';
// import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
// import DatePicker from '../Components/DatePicker';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

function SignUp({ closeSignup }) {
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const handleCloseSignup = (e) => {
    closeSignup(e);
  };

  return (
    <div className={styles['signup-background']}>
      <div className={styles['signup-container']}>
        {stepOne && (
        <StepOne
          handleCloseSignup={handleCloseSignup}
          setStepOne={setStepOne}
          setStepTwo={setStepTwo}
        />
        )}
        {stepTwo && <StepTwo />}
      </div>

    </div>
  );
}

export default SignUp;
SignUp.propTypes = {
  closeSignup: PropTypes.func.isRequired,
};
