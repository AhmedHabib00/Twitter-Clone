// import React from 'react';
// import NotiFeed from './SettingsComponents/YourAccountFeed';
import { useNavigate } from 'react-router-dom';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import styles from './ChangePassword.module.css';
// import AllData from './SettingsComponents/YourAccount.json';
// import MentionData from './NotiComponents/MentionData.json';
// import GetNotificationsArray from '../Services/NotificationServices';
import React from 'react';
// import PropTypes from 'prop-types';
// import Visibility from '@mui/icons-material/Visibility';
// import InputAdornment from '@mui/material/InputAdornment';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './ChangePassword.module.css';
import usePasswordForm from '../Start/Login/components/usePasswordForm';

function Settings() {
  const navigate = useNavigate();

  //   const [passedData, setpassedData] = useState(AllData);
  //   console.log(setpassedData);
  // const [allData, setAllData] = useState();
  // const [mentionData, setMentionData] = useState();
  // const handleAll = () => {
  //   setpassedData(AllData);
  // };

  // const handleMention = () => {
  //   setpassedData();
  // };
  // const handleOpen = () => { navigate('/Settings'); };
  const {
    handleChange, values,
  } = usePasswordForm();
  const handleOpen = () => { navigate('/Settings'); };

  return (
    <div>
      <form
        className={styles['signup-form']}
      >
        <div>
          <h1 className={styles.header1}>Change your password</h1>
          <div
            className={styles.backarrow}
            role="button"
            tabIndex={0}
            onClick={handleOpen}
          >
            <ArrowBackIcon />
          </div>
          {' '}
          <label htmlFor="password">
            <input
              className="start-modals-form-input"
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder=" "
            />
            <span>Current Password</span>

          </label>
          <label htmlFor="New password">
            <input
              className="start-modals-form-input"
              type="password"
              id="New password"
              name="New password"
              value={values.password}
              onChange={handleChange}
              placeholder=" "
            />
            <span>New Password</span>
          </label>
          <label htmlFor="Confirm password">
            <input
              className="start-modals-form-input"
              type="password"
              id="Confirm password"
              name="Confirm password"
              value={values.password}
              onChange={handleChange}
              placeholder=" "
            />
            <span>Confirm Password</span>
          </label>
          <div>
            <Button
              id="next-login-password-button"
              data-testid="next-button"
              variant="outlined"
              className={styles['singin-button']}
              type="submit"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
    // <div>
    //   <section className={styles.header1}>
    //     Change your password
    //     {' '}
    //     <div
    //       className={styles.backarrow}
    //       role="button"
    //       tabIndex={0}
    //       onClick={handleOpen}
    //     >
    //       <ArrowBackIcon />

  //     </div>
  //   </section>
  //   <section className={styles.flex1} />
  // </div>

  );
}
export default Settings;
Settings.propTypes = {
  // email: PropTypes.string.isRequired,
  // handleAfterSignin: PropTypes.func.isRequired,
};
