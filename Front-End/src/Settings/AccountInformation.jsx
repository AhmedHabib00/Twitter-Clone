import { useState, React } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import NotiFeed from './SettingsComponents/AccountInformationFeed';
import styles from './AccountInformation.module.css';
import AllData from './SettingsComponents/AccountInformation.json';
// import MentionData from './NotiComponents/MentionData.json';
// import GetNotificationsArray from '../Services/NotificationServices';

function Settings() {
  const [passedData, setpassedData] = useState(AllData);
  const navigate = useNavigate();
  console.log(setpassedData);
  // const [allData, setAllData] = useState();
  // const [mentionData, setMentionData] = useState();
  // const handleAll = () => {
  //   setpassedData(AllData);
  // };

  // const handleMention = () => {
  //   setpassedData();
  // };
  const handleOpen = () => { navigate('/Settings'); };

  return (
    <div className={styles.notifications}>
      <section className={styles.header1}>
        Account information

        <div
          className={styles.backarrow}
          role="button"
          tabIndex={0}
          onClick={handleOpen}
        >
          <ArrowBackIcon />

        </div>

      </section>
      <section className={styles.flex1} />
      {/* <div>
       <h1>helloooooo</h1>
     </div> */}
      <div>
        <NotiFeed className={styles.notifeed} data={passedData} />
      </div>
    </div>

  );
}
export default Settings;
