import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Feed from './Components/Feed';
import styles from './Home.module.css';
import TweetBox from './Components/TweetBox';
import GetPostsArray from '../Services/postServices';

function Home() {
  const [postData, setPostData] = useState();

  useEffect(() => {
    (async () => {
      const resp = await GetPostsArray();
      if (resp.status === 200) {
        setPostData(resp.data);
      }
    })();
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles['home-header']}>
        <h2>Home</h2>
      </div>
      <TweetBox placeHolder="What's happening" boxId="home" />
      <hr className={styles['home-hor-hr']} />
      {postData && <Feed className={styles.feed} data={postData} />}
    </div>
  );
}

export default Home;
