import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import styles from './LoginPassword.module.css';
import usePasswordForm from './components/usePasswordForm';

function LoginPassword({ email, handleAfterSignin }) {
  const {
    handleChange, values, handleSubmit,
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
    <div className={styles['password-container']}>
      <form
        className={styles['signup-form']}
        onSubmit={handleSubmit}
      >
        <div className={styles.body}>
          <h1 className={styles.title}>Create your account</h1>
          <label className="start-modals-form-label" htmlFor="email">
            <input
              data-testid="input-email"
              className="start-modals-form-input"
              type="email"
              id="email"
              name="email"
              placeholder=" "
              value={email}
              disabled="true"
              onChange={handleChange}
            />
            <span>Email</span>
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
          <div className="start-modals-button-container">
            <Button
              id="next-button"
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
