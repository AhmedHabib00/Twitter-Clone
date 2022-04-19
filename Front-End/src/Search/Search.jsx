import { useState,React} from 'react';
import NotiFeed from '../Notifications/NotiComponents/NotiFeed.jsx';
import styles from '../Search/Search.module.css';
import PostData from '../Home/Components/PostData.json';
import SearchBar from '../Search/SearchBar/SearchBar';
import UsersData from '../Home/Components/UsersData.json';
/**
 *
 * @returns shows everything in the notifications component
 */
function Notifications() {

  const [passedData, setpassedData] = useState(PostData);


  const handleAll = (e) => {
     setpassedData(AllData)
    // forceUpdate();
     }

     const handleMention = (e) => {
      setpassedData(MentionData)
      // forceUpdate();
       }  


  return (
    <div className={styles.notifications}>
      <section className={styles.header1}>
      <SearchBar placeHolder="Search Twitter" />
      </section>
      <section className={styles.flex1}>
        <button className={styles['flex-container']} type="button" onClick={handleAll}>People</button>
        <button className={styles['flex-container']} type="button" onClick={handleMention}>Whispers</button>
      </section>
      {/* <div>
        <h1>helloooooo</h1>
      </div> */}
      {/* <div>
        <NotiFeed className="notifeed" data={passedData} />
      </div> */}
    </div>

  );
}
export default Notifications;
