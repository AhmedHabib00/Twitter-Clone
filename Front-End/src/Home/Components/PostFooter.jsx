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
import { handleLikes } from '../../Services/postServices';

function PostFooter({
  id, displayname, username, URLs, isLiked, noOfLike,
  isRetweeted, noOfRetweets, noOfReplies, content,
}) {
  const [retweetEl, setRetweetEl] = useState(null);
  const [shareEl, setShareEl] = useState(null);
  const [like, setLike] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(noOfLike);
  const [replyPopUp, setReplyPopUp] = useState(false);
  const handelOpenShare = (e) => {
    setShareEl(e.currentTarget);
  };
  const handelOpenRetweet = (e) => {
    setRetweetEl(e.currentTarget);
  };
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
  return (
    <div>
      <PopupPage trigger={replyPopUp} SetTrigger={setReplyPopUp} isCloseEnabled={false}>
        <div>
          <div className={styles.postbody} key={id}>
            <PostHeader displayname={displayname} username={username} />
            <PostBody id={id} URLs={URLs} content={content} />
          </div>
          <TweetBox replyId={id} boxId="reply" placeHolder="Tweet your reply" className={styles.retweet} />
        </div>
      </PopupPage>
      <Menu className="" id="share" onClose={handelCloseShare} anchorEl={shareEl} open={Boolean(shareEl)}>
        <MenuList className={styles['dropdown-content']}>
          {'    '}
          <div className={styles['label-out']}>
            <FontAwesomeIcon
              fontSize="large"
              className={styles['dropdown-content']}
              icon={faBookmark}
            />
            {/* <BookmarkAddSharpIcon className={styles['dropdown-content']} /> */}
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
            onClick={handelOpenRetweet}
          />
          <p>{noOfRetweets}</p>
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
  id: PropTypes.number.isRequired,
  displayname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  URLs: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLiked: PropTypes.bool.isRequired,
  isRetweeted: PropTypes.bool.isRequired,
  noOfLike: PropTypes.number.isRequired,
  noOfRetweets: PropTypes.number.isRequired,
  noOfReplies: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,

};
export default PostFooter;
