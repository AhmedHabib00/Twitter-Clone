import { React, useState } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import styles from './Login.module.css';
import LoginStepOne from './LoginStepOne';
import LoginPassword from './LoginPassword';

function Login({ closeLogin }) {
  const [stepOne, setStepOne] = useState(true);
  const [stepLoginPassword, setLoginPassword] = useState(false);
  const [email, setEmail] = useState(' ');
  return (
    <div className={styles['login-background']}>
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
          setEmail={setEmail}
        />
        )}
        {stepLoginPassword && (
        <LoginPassword
          email={email}
          setLoginPassword={setLoginPassword}
        />
        )}
      </div>
    </div>
  );
}

export default Login;
Login.propTypes = {
  closeLogin: PropTypes.func.isRequired,
};
