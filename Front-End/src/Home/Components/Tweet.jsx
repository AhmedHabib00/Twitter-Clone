import React, { useState, useEffect } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useParams, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Feed from './Feed';
import feedStyles from './Feed.module.css';
import styles from './Tweet.module.css';
import UsersFeed from '../../Components/ListofUsers/UsersFeed';
import User from '../../Components/ListofUsers/User';
import PopupPage from './PopupPage';
import GetUsersArray, { GetPost, GetRepliesArray } from '../../Services/tweetpageServices';
import Post from './Post';
import Loader from '../../Components/Loader/Loader';

/**
 * @param {Bool} isBlocked      bool to check if the user is blocked or no.
 * @returns Tweet Page, which contains tweeta & its replies.
 */
function Tweet({ isBlocked }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [replyingToId, setReplyingToId] = useState([]);
  const [userSelectionPopUp, setUserSelectionPopUp] = useState(false);
  const [listOfUsers, setListOfUsers] = useState();
  const [repliesData, setRepliesData] = useState([]);
  const [postData, setPostData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const post = await GetPost(id);
      const usersArray = await GetUsersArray(id);
      const repliesArray = await GetRepliesArray(id).then(setIsLoading(false));
      if (usersArray.status === 200) {
        if (usersArray.data !== 'no users available to reply to.') {
          setListOfUsers(usersArray.data);
        }
      }
      if (post.status === 200) {
        setPostData(post.data);
      }
      if (repliesArray.status === 200) {
        if (repliesArray.data !== 'no replies found') { setRepliesData(repliesArray.data); } else { setRepliesData([]); }
      }
    })();
  }, [id]);
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
      {(isLoading) ? <div className={styles['loader-container']}><Loader /></div>
        : (
          <div>
            {postData
          && (
          <Post
            id={postData.id}
            displayName={postData.displayName}
            userName={postData.userName}
            content={postData.content}
            URLs={postData.URLs}
            isLiked={postData.isLiked}
            noOfLike={postData.noOfLike}
            isRetweeted={postData.isRetweeted}
            noOfReplies={postData.noOfReplies}
            noOfRetweets={postData.noOfRetweets}
            url={postData.url}
            isBlocked={isBlocked}
          />
          )}

            {repliesData && (
            <Feed
              className={feedStyles.feed}
              data={repliesData}
              isReplying
              isBlocked={isBlocked}
            />
            )}

            <PopupPage
              trigger={userSelectionPopUp}
              SetTrigger={setUserSelectionPopUp}
              isCloseEnabled={false}
              isUserSelector
            >
              <div>
                {postData && (
                <User
                  profileid={id}
                  displayname={postData.displayName}
                  username={postData.userName}
                  url={postData.url}
                  isButtonActive
                  hasCheckbox
                  isButtonDisabled
                />
                )}
                <hr />
                <h2 className={styles['tweet-header']}>Others in this conversation</h2>
                {listOfUsers && (
                <UsersFeed
                  data={listOfUsers}
                  onButtonClick={handleButtonOnClickReplying}
                  hasCheckbox
                />
                )}
              </div>
            </PopupPage>
          </div>
        ) }
    </div>

  );
}

Tweet.propTypes = {
  isBlocked: PropTypes.bool,
};

Tweet.defaultProps = {
  isBlocked: false,
};

export default Tweet;
