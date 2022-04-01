import { React, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SignUp.module.css';
import StepOne from './StepOne';
import StepPassword from './StepPassword';
import VerifyEmail from './VerifyEmail';
import UserName from './UserName';

/**
 * This Function manages signup and its states.
 * @param {boolean} closeSignup [boolen to close signup modal]
 * @returns SignUp modal
 */
function SignUp({ closeSignup }) {
  const [stepOne, setStepOne] = useState(true);
  const [stepPassword, setStepPassword] = useState(false);
  const [stepVerify, setStepVerify] = useState(false);
  const [stepUsername, setStepUsername] = useState(false);
  const [email, setEmail] = useState('');
  const handleCloseSignup = (e) => {
    closeSignup(e);
  };
  const handleGoToStepOne = () => {
    setStepOne(true);
    setStepVerify(false);
    setStepPassword(false);
    setStepUsername(false);
  };
  return (
    <div className={styles['signup-background']}>
      <div id="signup-modals" className="start-modals-container">
        {stepOne && (
        <StepOne
          handleCloseSignup={handleCloseSignup}
          setStepOne={setStepOne}
          setStepVerify={setStepVerify}
          setEmail={setEmail}
        />
        )}
        {stepVerify && (
        <VerifyEmail
          handleGoToStepOne={handleGoToStepOne}
          setStepPassword={setStepPassword}
          setStepVerify={setStepVerify}
          email={email}
        />
        )}
        {stepPassword && (
        <StepPassword
          setStepUsername={setStepUsername}
          setStepPassword={setStepPassword}
          email={email}
        />
        )}
        {stepUsername && (
        <UserName
          data-testid="username"
          email={email}
        />
        )}
      </div>

    </div>
  );
}

export default SignUp;
SignUp.propTypes = {
  closeSignup: PropTypes.func.isRequired,
};
