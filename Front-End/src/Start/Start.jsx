import { React, useState } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import styles from './Start.module.css';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import configData from '../config/production.json';

export const axiosApiCall = (url, method, body = {}) => axios({
  method,
  url: configData.SERVER_URL + url,
  data: body,
});
// import { authGoogle, authFacebook } from '../Services/accountServices';
/**
 * This functions renders the start page from which
 * user can login or signup with google, facebook, or email.
 * @returns Start page
 */
function Start({ setIsLoggedIn, setisAdmin }) {
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const onGoogleSuccess = (response) => {
    const { tokenId } = response;
    console.log(response);
    axiosApiCall(
      '/auth/google',
      'post',
      { tokenId },
    ).then((res) => {
      const token = res.data['x-auth-token'];
      localStorage.setItem('token', token);
      console.log(localStorage);
      setIsLoggedIn(true);
      // Save the JWT inside a cookie
      Cookie.set('token', token);
    }).catch((err) => {
      throw new Error(err);
    });
  };
  const onGoogleFailure = () => {};

  const handleLoginStatus = (logEvent, adminEvent) => {
    console.log('start routing');
    console.log(logEvent);
    console.log(adminEvent);
    console.log('start routing finish');
    setIsLoggedIn(logEvent);
    setisAdmin(adminEvent);
    navigate('/');
  };
  // const handleGoogleAuth = () => {
  //   // (async () => {
  //   //   const response = await authGoogle();
  //   //   if (response.status === 201) {
  //   //     const token = response.data['x-auth-token'];
  //   //     localStorage.setItem('token', token);
  //   //     // localStorage.setItem('logged', true);
  //   //     // localStorage.setItem('admin', false);
  //   //     // const logged = localStorage.getItem('logged');
  //   //     // const admin = localStorage.getItem('admin');
  //   //     // handleLoginStatus(JSON.parse(logged), JSON.parse(admin));
  //   //   }
  //   // })();
  // };
  const responseFacebook = (response) => {
    console.log(response);
    // Login failed
    if (response.status === 'unknown') {
      alert('Login failed!');
      return false;
    }
    console.log(response);

    return response;
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles['right-column-container']}>
          <div className={styles['right-group']}>
            <TwitterIcon className={styles['right-logo']} />
            <h1>Happening now</h1>
            <h2>Join Whisper today.</h2>
            <div className={styles['buttons-group']}>
              <GoogleLogin
                clientId={configData.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign in with Google"
                onSuccess={onGoogleSuccess}
                onFailure={onGoogleFailure}
                className={styles['signup-tweet-google']}
              />
              <FacebookLogin
                appId="535545001481656"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile,email,user_friends"
                callback={responseFacebook}
                textButton=" Sign up with Facebook"
                icon={(
                  <img
                    className={styles['google-logo']}
                    src="https://img.icons8.com/fluency/48/000000/facebook-new.png"
                    alt="google logo"
                  />
)}
                cssClass={styles['signup-tweet-google']}
              />

              <Button
                id="signup-email-button"
                data-testid="signup-button"
                variant="outlined"
                className={styles['signup-tweet']}
                onClick={() => {
                  setSignup(true);
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                  document.body.style.overflow = 'hidden';
                }}
              >
                Sign up with email
              </Button>
              <p>
                By signing up, you agree to the
                {' '}
                <span>Terms of Service</span>
                {' '}
                and
                {' '}
                <span>Privacy Policy</span>
                ,
                including
                {' '}
                <span>Cookie Use</span>
                .
              </p>
              <h3>Already have an acount?</h3>
              <Button
                id="signin-button"
                data-testid="signin-button"
                variant="outlined"
                className={styles['sign-in']}
                onClick={() => {
                  setLogin(true);
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                  document.body.style.overflow = 'hidden';
                }}
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
        <div className={styles['left-column-container']}>
          <div className={styles.logo}>
            <TwitterIcon className={styles['logo-size']} />
          </div>
        </div>
      </div>
      {signup && (
      <SignUp
        data-testid="signup-modal"
        closeSignup={setSignup}
        handleLoginStatus={handleLoginStatus}
      />
      )}
      {login && (
      <Login
        closeLogin={setLogin}
        handleLoginStatus={handleLoginStatus}
      />
      )}
    </div>
  );
}

export default Start;

Start.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  setisAdmin: PropTypes.func.isRequired,
};
