import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useParams, useNavigate } from 'react-router-dom';
import RepeatIcon from '@mui/icons-material/Repeat';
import Feed from './Feed';
import feedStyles from './Feed.module.css';
import styles from './Tweet.module.css';
// import PostHeader from './PostHeader';
import UsersFeed from '../../Components/ListofUsers/UsersFeed';
import User from '../../Components/ListofUsers/User';
import PopupPage from './PopupPage';
import GetUsersArray, { GetRelpiesArray } from '../../Services/tweetpageServices';

// import Post from './Post';

/**
 *
 * @returns Tweet Page initial layout
 */
function Tweet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [replyingToId, setReplyingToId] = useState([]);
  const [userSelectionPopUp, setUserSelectionPopUp] = useState(false);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [repliesData, setRepliesData] = useState([]);
  // const [postData, setPostData] = useState({});

  useEffect(() => {
    (async () => {
      const usersArray = await GetUsersArray();
      const repliesArray = await GetRelpiesArray();
      // const trailPost = await trail();
      if (usersArray.status === 200) {
        setListOfUsers(usersArray.data);
      }
      if (repliesArray.status === 200) {
        setRepliesData(repliesArray.data.Replies);
        // setPostData(repliesArray.data.post);
        // console.log(postData);
        // setPostData(repliesArray.data.post);
        // <Post
        //   id={repliesArray.data.post.id}
        //   displayName={repliesArray.data.post.displayName}
        //   userName={repliesArray.data.post.userName}
        //   content={repliesArray.data.post.content}
        //   URLs={repliesArray.data.post.URLs}
        //   isLiked={repliesArray.data.post.isLiked}
        //   noOfLike={repliesArray.data.post.noOfLike}
        //   isRetweeted={repliesArray.data.post.isRetweeted}
        //   noOfReplies={repliesArray.data.post.noOfReplies}
        //   noOfRetweets={repliesArray.data.post.noOfRetweets}
        // />;
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
      {/* <Post
        id={postData.post.id}
        displayName={postData.post.displayName}
        userName={postData.post.userName}
        content={postData.post.content}
        URLs={postData.post.URLs}
        isLiked={postData.post.isLiked}
        noOfLike={postData.post.noOfLike}
        isRetweeted={postData.post.isRetweeted}
        noOfReplies={postData.post.noOfReplies}
        noOfRetweets={postData.post.noOfRetweets}
      /> */}
      ;
      {repliesData && <Feed className={feedStyles.feed} data={repliesData} />}

      {/* <PostHeader username="Noha Tarek EL-Boghdady" displayname="Neha" /> */}

      <PopupPage
        trigger={userSelectionPopUp}
        SetTrigger={setUserSelectionPopUp}
        isCloseEnabled={false}
        isUserSelector
      >

        <User
          profileid={id}
          displayname="Neha"
          username="Noha Tarek EL-Boghdady"
          url="https://pbs.twimg.com/profile_images/1476639100895588365/1UyMRgI6_400x400.jpg"
          isButtonActive
          hasCheckbox
          isButtonDisabled
        />
        <hr />
        <h2 className={styles['tweet-header']}>Others in this conversation</h2>
        <UsersFeed
          data={listOfUsers}
          onButtonClick={handleButtonOnClickReplying}
          hasCheckbox
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
