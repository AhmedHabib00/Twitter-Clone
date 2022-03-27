import { React } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './UserName.module.css';
import useFormUserName from '../Components/useFormUserName';

function UserName({ email }) {
  const {
    handleChange, values, handleSubmit, errors,
  } = useFormUserName(email);
  return (
    <div>
      <div className={styles.header}>
        <div className={styles['username-logo']}>
          <TwitterIcon className={styles['signup-icon-size']} />
        </div>
      </div>
      <div className={styles['title-container']}>
        <h1 className={styles.title}>What should we call you?</h1>
        <p className={styles.subtitle}>
          Your @username is unique. You can always change it later.
        </p>
      </div>
      <form
        className={styles['username-form']}
        onSubmit={handleSubmit}
      >
        <div className={styles.body}>
          <label htmlFor="username">
            <input
              type="text"
              id="username"
              name="username"
              value={values.username}
              placeholder=" "
              onChange={handleChange}
            />
            <span>Username</span>
          </label>
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className={styles['signup-button-container']}>
          <Button
            variant="outlined"
            className={styles['signup-button']}
            type="submit"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserName;
UserName.propTypes = {
  email: PropTypes.string.isRequired,
};
