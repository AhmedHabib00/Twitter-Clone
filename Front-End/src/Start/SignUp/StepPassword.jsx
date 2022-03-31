import { React, useState } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './StepPassword.module.css';
import useFormPassword from '../Components/useFormPassword';

/**
 * In this function the user will type his password
 * @param {function}  setStepPassword [used to manage the password step status]
 * @param {function}  setStepUsername [used to manage the username selection step status]
 * @param {string}  email [used to be able to send the password to the backend with it]
 * @returns Password form
 */
function StepPassword({ setStepPassword, setStepUsername, email }) {
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
  const {
    handleChange, values, handleSubmit, errors,
  } = useFormPassword(setStepPassword, setStepUsername, email);
  return (
    <div data-testid="password">
      <div className={styles.header}>
        <div className={styles['password-logo']}>
          <TwitterIcon className="start-modals-icon-size" />
        </div>
      </div>
      <div className="start-modals-title-container">
        <h1 className={styles.title}> You&apos;ll need a pssword</h1>
        <p className={styles.subtitle}>Make sure it&apos;s 8 characters or more.</p>
      </div>
      <form
        className={styles['password-form']}
        onSubmit={handleSubmit}
      >
        <div className="start-modals-body">
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
          {errors.password
           && <p className="start-modals-form-errors">{errors.password}</p>}
        </div>
        <div className="start-modals-button-container">
          <Button
            variant="outlined"
            className="start-modals-button"
            type="submit"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}

export default StepPassword;
StepPassword.propTypes = {
  email: PropTypes.string.isRequired,
  setStepPassword: PropTypes.string.isRequired,
  setStepUsername: PropTypes.string.isRequired,
};
