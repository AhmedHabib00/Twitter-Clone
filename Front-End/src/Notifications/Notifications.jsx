import React from 'react';
import NotiFeed from './NotiComponents/NotiFeed';
import styles from './Notifications.module.css';
import Data from './NotiComponents/NotiData.json';
/**
 *
 * @returns shows everything in the notifications component
 */
function Notifications() {
  return (
    <div className={styles.notifications}>
      <section className={styles.header1}>
        Notifications
      </section>
      <section className={styles.flex1}>
        <button className={styles['flex-container']} type="button">All</button>
        <button className={styles['flex-container']} type="button">Mentions</button>
      </section>
      {/* <div>
        <h1>helloooooo</h1>
      </div> */}
      <div>
        <NotiFeed className="notifeed" data={Data} />
      </div>
    </div>

  );
}
export default Notifications;
