import React from 'react';
import Feed from './Components/Feed';
import styles from './Home.module.css';
import TweetBox from './Components/TweetBox';

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles['home-header']}>
        <h2>Home</h2>
      </div>
      <TweetBox />
      <hr className={styles['home-hor-hr']} />
      <Feed className={styles.feed} />
    </div>
  );
}

export default Home;
