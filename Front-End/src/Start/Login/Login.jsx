import { React, useState } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import styles from './Login.module.css';
import LoginStepOne from './LoginStepOne';
import LoginPassword from './LoginPassword';
import ForgotPassword from './ForgotPassword';
import VerifyForgotPasswordCode from './VerifyForgotPasswordCode';
import SetPassword from './SetPassword';

/**
 * This Function manages Login and its states.
 * @param {boolean} closeLogin boolen to close signup modal
 * @param {function} handleLoginStatus function to manage authorization
 * @returns Login modal
 */

function Login({ closeLogin, handleLoginStatus }) {
  const [stepOne, setStepOne] = useState(true);
  const [stepLoginPassword, setLoginPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [verifyCode, setVerifyCode] = useState(false);
  const [settingPassword, setSettingPassword] = useState(false);
  const [email, setEmail] = useState(' ');
  const handleAfterSignin = (logged, admin) => {
    handleLoginStatus(logged, admin);
  };
  return (
    <div className={styles['login-background']} id="login-modal">
      <div id="signup-modals" className="start-modals-container">
        <div className="start-modals-header">
          <div>
            <IconButton onClick={() => {
              closeLogin(false);
              document.body.style.overflow = 'unset';
            }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className={styles['login-icon']}>
            <TwitterIcon className="start-modals-icon-size" />
          </div>
        </div>
        {stepOne
        && (
        <LoginStepOne
          setStepOne={setStepOne}
          setLoginPassword={setLoginPassword}
          setForgotPassword={setForgotPassword}
          setEmail={setEmail}
        />
        )}
        {stepLoginPassword && (
        <LoginPassword
          email={email}
          setLoginPassword={setLoginPassword}
          handleAfterSignin={handleAfterSignin}
        />
        )}
        {forgotPassword && (
        <ForgotPassword
          setForgotPassword={setForgotPassword}
          setVerifyCode={setVerifyCode}
          setEmail={setEmail}
        />
        )}
        {verifyCode
         && (
         <VerifyForgotPasswordCode
           setVerifyCode={setVerifyCode}
           email={email}
           setSettingPassword={setSettingPassword}
         />
         )}
        {settingPassword
         && (
         <SetPassword
           setSettingPassword={setSettingPassword}
           handleAfterSignin={handleAfterSignin}
         />
         )}
      </div>
    </div>
  );
}

export default Login;
Login.propTypes = {
  closeLogin: PropTypes.func.isRequired,
  handleLoginStatus: PropTypes.func.isRequired,
};
