import React from 'react';
import styles from './Feed.module.css';
import Post from './Post';

function Feed() {
  return (
    <div className={styles.feed}>
      <Post />
    </div>
  );
}

export default Feed;
