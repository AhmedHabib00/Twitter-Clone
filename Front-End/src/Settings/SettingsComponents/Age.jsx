import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
// import NotiFeed from './AccountInformationFeed';
import styles from './Age.module.css';
// import AllData from './AccountInformation.json';
// import MentionData from './NotiComponents/MentionData.json';
// import GetNotificationsArray from '../Services/NotificationServices';
function Settings() {
//   const [passedData, setpassedData] = useState(AllData);
  const navigate = useNavigate();
  // const [allData, setAllData] = useState();
  // const [mentionData, setMentionData] = useState();
  // const handleAll = () => {
  //   setpassedData(AllData);
  // };

  // const handleMention = () => {
  //   setpassedData();
  // };
  const handleOpen = () => { navigate('/AccountInformation'); };

  return (
    <div className={styles.notifications}>
      <section className={styles.header1}>
        Age
        <div
          className={styles.backarrow}
          role="button"
          tabIndex={0}
          onClick={handleOpen}
        >
          <ArrowBackIcon />
        </div>
        <p className={styles.header2}>
          If you haven’t provided a date of birth,
          we’ve provided an age range based on your Twitter profile and activity.
          Age information is used to personalize your experience.
          {' '}

        </p>
        <hr className={styles.header2} />
        <div className={styles.header2}>21</div>
        <hr className={styles.header2} />
        <p className={styles.header2}>
          Not right? You can add your date of birth to your profile without sharing
          it publicly.

        </p>
      </section>

      <section className={styles.header2} />

    </div>

  );
}
export default Settings;
