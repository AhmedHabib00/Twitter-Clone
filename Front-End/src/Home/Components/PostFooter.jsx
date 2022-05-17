import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuList } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RepeatIcon from '@mui/icons-material/Repeat';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment, faBookmark,
} from '@fortawesome/free-regular-svg-icons';
import styles from './Post.module.css';
import PopupPage from './PopupPage';
import TweetBox from './TweetBox';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import { handleLikes, addToBookmark, SendRetweets } from '../../Services/postServices';

function PostFooter({
  id, displayName, userName, URLs, isLiked, noOfLike,
  isRetweeted, noOfRetweets, noOfReplies, content, url,
}) {
  const [retweetEl, setRetweetEl] = useState(null);
  const [shareEl, setShareEl] = useState(null);
  const [like, setLike] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(noOfLike);
  const [replyPopUp, setReplyPopUp] = useState(false);
  const [replyingToId, setReplyingToId] = useState([]);
  const [retweet, setRetweet] = useState(isRetweeted);
  const [retweetCount, setRetweetCount] = useState(noOfRetweets);

  const handelOpenShare = (e) => {
    setShareEl(e.currentTarget);
  };
  // const handleRetweet = () => {
  //   SendRetweets(id);
  // };
  const handelCloseShare = () => {
    setShareEl(null);
  };

  const handelCloseRetweet = () => {
    setRetweetEl(null);
  };
  const handellikes = () => {
    if (like) {
      handleLikes(id);
      setLikeCount(likeCount - 1);
    } else {
      handleLikes(id);
      setLikeCount(likeCount + 1);
    }
    setLike(!like);
  };

  const handleAddToBookmark = () => {
    (async () => {
      await addToBookmark(id);
    })();
  };
  const handleButtonOnClickReplying = (selectedUsers) => {
    const updateArrayOfIds = selectedUsers.map((user) => (user.id));
    setReplyingToId(updateArrayOfIds);
  };
  const handelRetweeets = () => {
    if (retweet) {
      SendRetweets(id);
      setRetweetCount(retweetCount - 1);
    } else {
      SendRetweets(id);
      setRetweetCount(retweetCount + 1);
    }
    setRetweet(!retweet);
  };
  return (
    <div>
      <PopupPage trigger={replyPopUp} SetTrigger={setReplyPopUp} isCloseEnabled={false}>
        <div>
          <div className={styles.postbody} key={id}>
            <PostHeader displayName={displayName} userName={userName} url={url} />
            <PostBody
              id={id}
              URLs={URLs}
              content={content}
              isReplying
              switchEnabled
              userName={userName}
              displayName={displayName}
              url={url}
              onReplyButtonClick={handleButtonOnClickReplying}
            />
          </div>
          <TweetBox replyId={id} users={replyingToId} boxId="reply" placeHolder="Tweet your reply" className={styles.retweet} />
        </div>
      </PopupPage>
      <Menu className="" id="share" onClose={handelCloseShare} anchorEl={shareEl} open={Boolean(shareEl)}>
        <MenuList className={styles['dropdown-content']}>
          {'    '}
          <div onClick={handleAddToBookmark} role="button" tabIndex={0} className={styles['label-out']}>
            <FontAwesomeIcon
              fontSize="large"
              className={styles['dropdown-content']}
              icon={faBookmark}
            />
            {' '}
            <p className={styles.label}>Bookmark</p>
          </div>
        </MenuList>

      </Menu>

      <Menu className=" " id="retweet" onClose={handelCloseRetweet} anchorEl={retweetEl} open={Boolean(retweetEl)}>
        <MenuList className={styles['dropdown-content']}>
          {'    '}
          <RepeatIcon className={styles['dropdown-content']} />
          {' '}
          Retweet
        </MenuList>

        <MenuList className={styles['dropdown-content']}>
          <div className={styles['label-out']}>
            {'    '}
            <EditOutlinedIcon className={styles['dropdown-content']} />
            {' '}

            <p className={styles.label}>Quote Tweet</p>
          </div>
        </MenuList>

      </Menu>

      <div data-testid="footer-render-test" className={styles.postfooter}>
        <div className={styles.like}>
          <FontAwesomeIcon
            className={styles.postblue}
            fontSize="large"
            onClick={() => setReplyPopUp(true)}
            icon={faComment}
          />
          <p>{noOfReplies}</p>
        </div>

        <div className={styles.like}>
          <RepeatIcon
            style={(isRetweeted) ? { color: 'rgb(18 180 26)' } : { color: '' }}
            className={styles.postgreen}
            fontSize="small"
            aria-controls="retweet"
            onClick={handelRetweeets}
          />
          <p>{retweetCount}</p>
        </div>
        <div className={styles.like}>
          <FavoriteBorderIcon
            style={(like) ? { color: '#f02896' } : { color: '' }}
            className={styles.postpink}
            fontSize="small"
            onClick={handellikes}
          />
          <p>{likeCount}</p>
        </div>

        <IosShareOutlinedIcon
          className={styles.postblue}
          fontSize="small"
          aria-controls="share"
          onClick={handelOpenShare}
        />

      </div>
    </div>
  );
}

PostFooter.propTypes = {
  id: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  URLs: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLiked: PropTypes.bool.isRequired,
  isRetweeted: PropTypes.bool.isRequired,
  noOfLike: PropTypes.number.isRequired,
  noOfRetweets: PropTypes.number.isRequired,
  noOfReplies: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,

};
export default PostFooter;
