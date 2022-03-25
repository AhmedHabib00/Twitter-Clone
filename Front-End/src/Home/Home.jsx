import React from 'react';
import Feed from './Components/Feed';
import styles from './Home.module.css';
import TweetBox from './Components/TweetBox';
import Data from './Components/PostData.json';

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles['home-header']}>
        <h2>Home</h2>
      </div>
      <TweetBox className="home-tweetbox" />
      <hr className="home-hor-hr" />
      <Feed className="feed" data={Data} />
    </div>
  );
}

export default Home;
