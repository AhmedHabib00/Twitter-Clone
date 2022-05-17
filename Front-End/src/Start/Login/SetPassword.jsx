import { React, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './SetPassword.module.css';
import useSetPasswordForm from './components/useSetPasswordForm';
import Loader from '../../Components/Loader/Loader';
/**
 * This function is used to make a set password form for the forgot
 * my password process
 * @param {function} setSettingPassword Manages the status of the sitting password modal
 * @param {function} handleAfterSignin Handles the routing and authorization
 * @returns set password form
 */

function SetPassword({ setSettingPassword, handleAfterSignin }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleChange, values, handleSubmit, errors1, errors2,
  } = useSetPasswordForm(setSettingPassword, handleAfterSignin, setIsLoading);
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
    <div className={styles['forgot-password-container']} id="login-modal-set-new-password">
      <div className="modal-loaders-container">
        {isLoading && <Loader />}
      </div>
      <form
        className={styles['forgot-password-form']}
        onSubmit={handleSubmit}
      >
        <div className={styles.body}>
          <h1 className={styles.title}>Reset your password</h1>
          <p className={styles.subtitle}>
            You will receive a code to verify here so you
            can reset your acount password.

          </p>
          <div>
            <label htmlFor="password1">
              <input
                className="start-modals-form-input"
                type={fieldvalues.showPassword ? 'text' : 'password'}
                id="password1"
                name="password1"
                value={values.password1}
                onChange={handleChange}
                placeholder=" "
              />
              <span>Password</span>
              <div className={styles['password-adornment']}>
                <InputAdornment>
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {fieldvalues.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              </div>

            </label>
            {errors1.password1
          && (
          <p
            className="start-modals-form-errors"
            id="forgot-password-set-password1-error"
          >
            {errors1.password1}
          </p>
          )}
          </div>
          <label htmlFor="password2">
            <input
              className="start-modals-form-input"
              type={fieldvalues.showPassword ? 'text' : 'password'}
              id="password2"
              name="password2"
              value={values.password2}
              onChange={handleChange}
              placeholder=" "
            />
            <span>Password</span>
            <div className={styles['password-adornment']}>
              <InputAdornment>
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {fieldvalues.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            </div>

          </label>
          {errors2.password2
          && (
          <p
            className="start-modals-form-errors"
            id="forgot-password-set-password2-error"
          >
            {errors2.password2}
          </p>
          )}
          <div className="start-modals-button-container">
            <Button
              id="verify-new-password-button"
              data-testid="verify-email-button"
              variant="outlined"
              className={styles['forgot-password-button']}
              type="submit"
              disabled={isLoading}
            >
              Verify
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SetPassword;
SetPassword.propTypes = {
  setSettingPassword: PropTypes.func.isRequired,
  handleAfterSignin: PropTypes.func.isRequired,
};
