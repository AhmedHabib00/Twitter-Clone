import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import styles from './LoginPassword.module.css';
import usePasswordForm from './components/usePasswordForm';

/**
 * In this function the user will type his password
 * @param {function}  handleAfterSignin used to manage the username selection step status
 * @param {string}  email used to be able to send the password to the backend with it
 * @returns Password form
 */

function LoginPassword({ email, handleAfterSignin }) {
  const {
    handleChange, values, handleSubmit, errors,
  } = usePasswordForm(email, handleAfterSignin);
  const [fieldvalues, setfieldvalues] = useState({
    password: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setfieldvalues({ ...fieldvalues, showPassword: !fieldvalues.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className={styles['password-container']} id="login-modal-step-password">
      <form
        className={styles['signup-form']}
        onSubmit={handleSubmit}
      >
        <div className={styles.body}>
          <h1 className={styles.title}>Create your account</h1>
          <label className="start-modals-form-label" htmlFor="emailOrUsername">
            <input
              data-testid="input-email"
              className="start-modals-form-input"
              type="text"
              id="email"
              name="emailOrUsername"
              placeholder=" "
              value={email}
              disabled
              onChange={handleChange}
            />
            <span>Email or Username</span>
          </label>
          <label htmlFor="password">
            <input
              className="start-modals-form-input"
              type={fieldvalues.showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder=" "
            />
            <span>Password</span>
            <div className={styles['password-adornment']}>
              <InputAdornment
                position="end"
              >
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {fieldvalues.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            </div>

          </label>
          {errors.password
           && (
           <p
             className="start-modals-form-errors"
             id="login-password-error"
           >
             {errors.password}
           </p>
           )}
          <div className="start-modals-button-container">
            <Button
              id="next-login-password-button"
              data-testid="next-button"
              variant="outlined"
              className={styles['singin-button']}
              type="submit"
            >
              Log in
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPassword;
LoginPassword.propTypes = {
  email: PropTypes.string.isRequired,
  handleAfterSignin: PropTypes.func.isRequired,
};
