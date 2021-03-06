import { useState, React } from 'react';
import NotiFeed from './SettingsComponents/YourAccountFeed';
import styles from './Settings.module.css';
import AllData from './SettingsComponents/YourAccount.json';
// import MentionData from './NotiComponents/MentionData.json';
// import GetNotificationsArray from '../Services/NotificationServices';
function Settings() {
  const [passedData, setpassedData] = useState(AllData);
  console.log(setpassedData);
  // const [allData, setAllData] = useState();
  // const [mentionData, setMentionData] = useState();
  // const handleAll = () => {
  //   setpassedData(AllData);
  // };

  // const handleMention = () => {
  //   setpassedData();
  // };
  return (
    <div className={styles.notifications}>
      <section className={styles.header1}>
        Your Account
        {' '}
        <p className={styles.header2}>
          See information about your account, download an archive of your data,
          or learn about your account deactivation options

        </p>
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
