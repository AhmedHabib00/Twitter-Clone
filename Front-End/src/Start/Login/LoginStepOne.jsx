import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Cookie from 'js-cookie';
import axios from 'axios';
import useLoginForm from './components/useLoginForm';
import styles from './LoginStepOne.module.css';
import configData from '../../config/production.json';
import { getClientRole } from '../../Services/accountServices';

export const axiosApiCall = (url, method, body = {}) => axios({
  method,
  url: configData.SERVER_URL + url,
  data: body,
});
/**
 * This is the first state in the Login form in which the user will
 * type the username or email.
 * @param {function} setEmail sets the email of the user to be able to use
 * it in the up comming steps
 * @param {function} setStepOne used to manage the first step status
 * @param {function} setLoginPassword used to manage the password step
 * @param {function} setForgotPassword used to manage the forgot password step
 * @returns Email or username form
 */

function LoginStepOne({
  setStepOne, setLoginPassword, setEmail, setForgotPassword, handleAfterSignin,
}) {
  const {
    handleChange, values, handleSubmit, errors,
  } = useLoginForm(setStepOne, setEmail, setLoginPassword);
  const onGoogleSuccess = (response) => {
    const { tokenId } = response;
    axiosApiCall(
      '/auth/google',
      'post',
      { tokenId },
    ).then((res) => {
      const token = res.data['x-auth-token'];
      localStorage.setItem('token', token);
      (async () => {
        if (localStorage.token) {
          const resp = await getClientRole();
          console.log(resp);
          document.body.style.overflowY = 'scroll';
          if (resp.role === 'Admin') {
            handleAfterSignin(true, true);
          } else {
            handleAfterSignin(true, false);
          }
        }
      })();
      // Save the JWT inside a cookie
      Cookie.set('token', token);
    }).catch((err) => {
      throw new Error(err);
    });
  };
  const onGoogleFailure = () => {};
  const responseFacebook = (response) => {
    console.log(response);
    // Login failed
    if (response.status === 'unknown') {
      return false;
    }

    return response;
  };
  return (
    <div id="login-modal-step-one">
      <div className={styles.body}>
        <h1>Sign in to Whisper</h1>
        <GoogleLogin
          clientId={configData.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Sign in with Google"
          onSuccess={onGoogleSuccess}
          onFailure={onGoogleFailure}
          className={styles['login-with-google']}
        />
        <FacebookLogin
          appId={configData.REACT_APP_FACEBOOK_APP_ID}
          autoLoad={false}
          fields="name,email"
          callback={responseFacebook}
          textButton=" Sign in with Facebook"
          icon={(
            <img
              className={styles['google-logo']}
              src="https://img.icons8.com/fluency/48/000000/facebook-new.png"
              alt="google logo"
            />
)}
          cssClass={styles['login-with-google']}
        />

        <form
          className={styles['login-form']}
          onSubmit={handleSubmit}
        >
          <label className="start-modals-form-label" htmlFor="emailOrUsername">
            <input
              data-testid="login-email"
              type="text"
              id="login-email"
              name="emailOrUsername"
              value={values.emailOrUsername}
              placeholder=" "
              onChange={handleChange}
            />
            <span>Email or Username</span>
          </label>
          {errors.emailOrUsername
             && (
             <p
               className={styles['login-form-errors']}
               id="login-emailor-username-error"
             >
               {errors.emailOrUsername}
             </p>
             )}
          <div className={styles['login-buttons-container']}>
            <Button
              id="next-button"
              data-testid="next-button"
              variant="outlined"
              className={styles['login-next-button']}
              type="submit"
            >
              Next
            </Button>
          </div>
        </form>
        <Button
          id="login-forgot-password-button"
          variant="outlined"
          className={styles['forgot-password-button']}
          onClick={() => {
            setStepOne(false);
            setForgotPassword(true);
          }}
        >
          Forgot password?
        </Button>

      </div>
    </div>
  );
}

export default LoginStepOne;
LoginStepOne.propTypes = {
  setStepOne: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setLoginPassword: PropTypes.func.isRequired,
  setForgotPassword: PropTypes.func.isRequired,
  handleAfterSignin: PropTypes.func.isRequired,
};
