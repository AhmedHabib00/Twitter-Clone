import React from 'react';
// import { useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import styles from './Tweet.module.css';
import Post from './Post';

/**
 *
 * @returns Tweet Page initial layout
 */
function Tweet() {
  // const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className={styles.tweet}>
      <div className={styles.postfooter}>
        <KeyboardBackspaceIcon className={styles['back-btn']} role="button" tabIndex={0} onClick={() => navigate('/home')} />
        <h2 className={styles['tweet-header']}>Tweet</h2>
      </div>
      <Post />
    </div>
  );
}

export default Tweet;
