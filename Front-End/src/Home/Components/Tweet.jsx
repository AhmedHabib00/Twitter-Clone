import React from 'react';
// import { useParams } from 'react-router-dom';
import styles from './Tweet.module.css';
import Post from './Post';

function Tweet() {
  // const { id } = useParams();
  return (
    <div className={styles.tweet}>
      <div className={styles['tweet-header']}>
        <h2>Tweet</h2>
      </div>
      <Post />
    </div>
  );
}

export default Tweet;
