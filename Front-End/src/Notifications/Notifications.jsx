import { useState, React, useEffect } from 'react';
import NotiFeed from './NotiComponents/NotiFeed';
import styles from './Notifications.module.css';
// import AllData from './NotiComponents/NotiData.json';
// import MentionData from './NotiComponents/MentionData.json';
import GetNotificationsArray from '../Services/NotificationServices';

/**
 *
 * @returns shows everything in the notifications component
 */
function Notifications() {
  // const [passedData, setpassedData] = useState(AllData);
  const [allData, setAllData] = useState();
  // const [mentionData, setMentionData] = useState();
  useEffect(() => {
    (async () => {
      const resp = await GetNotificationsArray();
      console.log(resp.data);
      setAllData(resp.data);
    })();
  }, []);
  const handleAll = () => {
    (async () => {
      const resp = await GetNotificationsArray();
      console.log(resp.data);
      setAllData(resp.data);
    })();
  };

  const handleMention = () => {
    // setAllData(null);
  };
  return (
    <div className={styles.notifications}>
      <section className={styles.header1}>
        Notifications
      </section>
      <section className={styles.flex1}>
        <button className={styles['flex-container']} type="button" onClick={handleAll}>All</button>
        <button className={styles['flex-container']} type="button" onClick={handleMention}>Mentions</button>
      </section>
      {/* <div>
        <h1>helloooooo</h1>
      </div> */}
      <div>
        {allData && <NotiFeed className={styles.notifeed} data={allData} />}
      </div>
    </div>

  );
}
export default Notifications;
