import { React, useState } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import styles from './StepTwo.module.css';

function StepTwo() {
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <div className={styles.header}>
        <div className={styles['password-logo']}>
          <TwitterIcon className={styles['signup-icon-size']} />
        </div>
      </div>
      <div className={styles['title-container']}>
        <h1 className={styles.title}> You&apos;ll need a pssword</h1>
        <p className={styles.subtitle}>Make sure it&apos;s 8 characters or more.</p>
      </div>
      <form className={styles['password-form']}>
        <label htmlFor="password">
          <input
            type={values.showPassword ? 'text' : 'password'}
            id="password"
            placeholder=" "
          />
          <span>Password</span>
          <div className={styles['password-adornment']}>
            <InputAdornment>
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          </div>

        </label>
        <div className={styles['signup-button-container']}>
          <Button
            variant="outlined"
            className={styles['signup-button']}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}

export default StepTwo;
