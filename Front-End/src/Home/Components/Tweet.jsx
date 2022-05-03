import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
// import { useParams, useNavigate } from 'react-router-dom';
import RepeatIcon from '@mui/icons-material/Repeat';
import styles from './Tweet.module.css';
import PostHeader from './PostHeader';
import UsersFeed from '../../Components/ListofUsers/UsersFeed';
import User from '../../Components/ListofUsers/User';
import PopupPage from './PopupPage';
import GetRepliesArray from '../../Services/tweetpageServices';
// import Post from './Post';

/**
 *
 * @returns Tweet Page initial layout
 */
function Tweet() {
  // const { id } = useParams();
  const navigate = useNavigate();
  const [replyingToId, setReplyingToId] = useState([]);
  const [userSelectionPopUp, setUserSelectionPopUp] = useState(false);
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const resp = await GetRepliesArray();
      if (resp.status === 200) {
        console.log(resp.data);
        setListOfUsers(resp.data);
      }
    })();
  }, []);
  const handleButtonOnClickReplying = (event) => {
    const tempReplyingToId = [...replyingToId];
    tempReplyingToId.push(event);
    setReplyingToId(tempReplyingToId);
  };
  return (
    <div className={styles.tweet}>
      <div className={styles.postfooter}>
        <KeyboardBackspaceIcon className={styles['back-btn']} role="button" tabIndex={0} onClick={() => navigate('/home')} />
        <h2 className={styles['tweet-header']}>Tweet</h2>
      </div>

      <PostHeader username="Noha Tarek EL-Boghdady" displayname="Neha" />
      <PopupPage
        trigger={userSelectionPopUp}
        SetTrigger={setUserSelectionPopUp}
        isCloseEnabled={false}
      >

        <User />
        <UsersFeed
          data={listOfUsers}
          onButtonClick={handleButtonOnClickReplying}
        />

      </PopupPage>
      <RepeatIcon
        className={styles.postgreen}
        fontSize="small"
        aria-controls="retweet"
        onClick={() => setUserSelectionPopUp(true)}
      />

    </div>
  );
}

export default Tweet;
