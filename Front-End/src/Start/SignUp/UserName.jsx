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
          <TwitterIcon className="start-modals-icon-size" />
        </div>
      </div>
      <div className="start-modals-title-container">
        <h1 className={styles.title}>What should we call you?</h1>
        <p className={styles.subtitle}>
          Your @username is unique. You can always change it later.
        </p>
      </div>
      <form
        className={styles['username-form']}
        onSubmit={handleSubmit}
      >
        <div className="start-modals-body">
          <label htmlFor="username">
            <input
              className="start-modals-form-input"
              type="text"
              id="username"
              name="username"
              value={values.username}
              placeholder=" "
              onChange={handleChange}
            />
            <span>Username</span>
          </label>
          {errors.username
           && <p className="start-modals-form-errors">{errors.username}</p>}
        </div>
        <div className="start-modals-button-container">
          <Button
            variant="outlined"
            className="start-modals-button"
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
