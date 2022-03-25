import React from 'react';
import Feed from './Components/Feed';
import styles from './Home.module.css';
import TweetBox from './Components/TweetBox';
import Data from './Components/PostData.json';

/**
 * consists of 3 main components.
 * Header, Tweetbox, Feed
 */
function Home() {
  return (
    <div className={styles.home}>
      <div className={styles['home-header']}>
        <h2>Home</h2>
      </div>
<<<<<<< HEAD
      <TweetBox />
      <hr className={styles['home-hor-hr']} />
      <Feed className={styles.feed} />
=======
      <TweetBox className="home-tweetbox" />
      <hr className="home-hor-hr" />
      <Feed className="feed" data={Data} />
>>>>>>> f0fbe1c... managed feed
    </div>
  );
}

export default Home;
