import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Feed from './Components/Feed';
import styles from './Home.module.css';
import TweetBox from './Components/TweetBox';

function Home() {
  const [postData, setPostData] = useState();
  // const [notificationData, setNotificationData] = useState();

  useEffect(() => {
    axios.get('http://localhost:8000/posts')
      .then((resp) => {
        setPostData(resp.data);
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles['home-header']}>
        <h2>Home</h2>
      </div>
      <TweetBox placeHolder="What's happening" boxId="home" />
      <hr className={styles['home-hor-hr']} />
      <Feed className={styles.feed} data={postData} />
    </div>
  );
}

export default Home;
