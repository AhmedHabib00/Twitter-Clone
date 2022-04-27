import { useState, React } from 'react';
import NotiFeed from './NotiComponents/NotiFeed';
import styles from './Notifications.module.css';
import AllData from './NotiComponents/NotiData.json';
import MentionData from './NotiComponents/MentionData.json';
/**
 *
 * @returns shows everything in the notifications component
 */
function Notifications() {
  const [passedData, setpassedData] = useState(AllData);
  const handleAll = () => {
    setpassedData(AllData);
  };

  const handleMention = () => {
    setpassedData(MentionData);
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
        <NotiFeed className={styles.notifeed} data={passedData} />
      </div>
    </div>

  );
}
export default Notifications;
