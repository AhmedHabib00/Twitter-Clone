import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuList } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RepeatIcon from '@mui/icons-material/Repeat';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment, faBookmark,
} from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router';
import styles from './Post.module.css';
import PopupPage from './PopupPage';
import TweetBox from './TweetBox';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import { handleLikes, addToBookmark, SendRetweets } from '../../Services/postServices';

/**
 *
 * @param {Number} id     Post Id
 * @param {String} displayName      User posted display name (user first name).
 * @param {String} userName     User posted user name (user full name).
 * @param {Array} URLs      array of the urls which will contain images & gifs.
 * @param {Bool} isLiked     flag to know if post was initially liked.
 * @param {Number} noOfLike     number of likes for this post.
 * @param {Bool} isRetweeted     flag to know if post was initially retweeted.
 * @param {Number} noOfRetweets     number of retweets for this post.
 * @param {Number} noOfReplies     number of replies for this post.
 * @param {Bool} isReplying     bool to check if it's a reply.
 * @param {String} url      user profile image.
 * @param {Bool} isBlocked      bool to check if the user is blocked or no.
 *
 * @returns div element containing the whispered tweet footer.
 */

function PostFooter({
  id, displayName, userName, URLs, isLiked, noOfLike,
  isRetweeted, noOfRetweets, noOfReplies, content, url,
  isBlocked,
}) {
  const navigate = useNavigate();
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

  const handelCloseShare = () => {
    setShareEl(null);
  };

  const handelCloseRetweet = () => {
    setRetweetEl(null);
  };
  const handellikes = () => {
    if (like) {
      handleLikes(id).then(() => {
        setLikeCount(likeCount - 1);
        setLike(!like);
      });
    } else {
      handleLikes(id).then(() => {
        setLikeCount(likeCount + 1);
        setLike(!like);
      });
    }
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
      SendRetweets(id).then(() => {
        setRetweetCount(retweetCount - 1);
        setRetweet(!retweet);
        navigate('/');
      });
    } else {
      SendRetweets(id).then(() => {
        setRetweetCount(retweetCount + 1);
        setRetweet(!retweet);
        navigate('/');
      });
    }
  };
  return (
    <div>
      <PopupPage trigger={replyPopUp} SetTrigger={setReplyPopUp} isCloseEnabled={false}>
        <div>
          <div className={styles.postbody} key={id}>
            <PostHeader id={id} displayName={displayName} userName={userName} url={url} />
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
          <TweetBox replyId={id} users={replyingToId} boxId="reply" placeHolder="Tweet your reply" className={styles.retweet} canTweet={!isBlocked} />
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
          <Button disabled={isBlocked}>
            <RepeatIcon
              style={(retweet) ? { color: 'rgb(18 180 26)' } : { color: 'rgb(0 0 0)' }}
              className={styles.postgreen}
              fontSize="small"
              aria-controls="retweet"
              onClick={handelRetweeets}
            />
          </Button>
          <p>{retweetCount}</p>
        </div>
        <div className={styles.like}>
          <Button disabled={isBlocked}>
            <FavoriteBorderIcon
              style={(like) ? { color: '#f02896' } : { color: 'rgb(0 0 0)' }}
              className={styles.postpink}
              fontSize="small"
              onClick={handellikes}
            />
          </Button>
          <p>{likeCount}</p>
        </div>
        <Button disabled={isBlocked}>
          <IosShareOutlinedIcon
            className={styles.postblue}
            fontSize="small"
            aria-controls="share"
            onClick={handelOpenShare}
          />
        </Button>

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
  isBlocked: PropTypes.bool,
};

PostFooter.defaultProps = {
  isBlocked: false,
};

export default PostFooter;
