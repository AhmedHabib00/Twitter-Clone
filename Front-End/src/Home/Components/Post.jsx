import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';
import styles from './Post.module.css';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import PostBody from './PostBody';

/**
 *
 * @param {Number} id     Post Id
 * @param {String} displayname      User posted display name (user first name).
 * @param {String} username     User posted user name (user full name).
 * @param {String} content      Posted text.
 * @param {String} img1     uploaded image-1 url.
 * @param {String} img2     uploaded image-2 url.
 * @param {String} img3     uploaded image-3 url.
 * @param {String} img4     uploaded image-4 url.
 * @param {Bool} isLiked     flag to know if post was initially liked.
 * @param {Number} noOfLike     number of likes for this post.
 * @param {Bool} isRetweeted     flag to know if post was initially retweeted.
 * @param {Number} noOfRetweets     number of retweets for this post.
 * @param {Number} noOfReplies     number of replies for this post.
 *
 * @returns div element containing the whole whispered tweet
 */
function Post({
  id, displayname, username, content, URLs, isLiked, noOfLike,
  isRetweeted, noOfRetweets, noOfReplies,
}) {
  return (
    <div data-testid="post-render-test" className={styles.post} id="post">
      <div className={styles.postbody}>
        <PostHeader displayname={displayname} username={username} />
        <PostBody id={id} content={content} URLs={URLs} />
        <PostFooter
          id={id}
          displayname={displayname}
          username={username}
          content={content}
          URLs={URLs}
          isLiked={isLiked}
          noOfLike={noOfLike}
          isRetweeted={isRetweeted}
          noOfRetweets={noOfRetweets}
          noOfReplies={noOfReplies}
        />
      </div>
    </div>
  );
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  displayname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  URLs: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLiked: PropTypes.bool.isRequired,
  noOfLike: PropTypes.number.isRequired,
  isRetweeted: PropTypes.bool.isRequired,
  noOfRetweets: PropTypes.number.isRequired,
  noOfReplies: PropTypes.number.isRequired,
};

export default Post;
