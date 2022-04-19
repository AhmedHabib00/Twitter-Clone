import React from 'react';
// import { useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import styles from './Tweet.module.css';
import Post from './Post';

/**
 *
 * @returns Tweet Page initial layout
 */
function Tweet() {
  // const { id } = useParams();
  return (
    <div className={styles.tweet}>
      <div>
        <KeyboardBackspaceIcon className={styles['back-btn']} />
        <h2 className={styles['tweet-header']}>Tweet</h2>
      </div>
      <Post />
    </div>
  );
}

export default Tweet;
