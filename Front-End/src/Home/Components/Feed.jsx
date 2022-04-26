import React from 'react';
import PropTypes from 'prop-types';
import styles from './Feed.module.css';
import Post from './Post';

/**
 *
 * @param {array} data array containing our posts.
 *
 * @returns map through the post array data and starts passing the post props
 * to display the posts in the feed component.
 */
function Feed({ data }) {
  return (
    <div data-testid="feed-render-test" className={styles.feed} id="feed">

      {
        data && data.map((post) => (

          <Post
            key={post.id}
            id={post.id}
            displayname={post.displayName}
            username={post.userName}
            content={post.content}
            img1={post.img1}
            img2={post.img2}
            img3={post.img3}
            img4={post.img4}
            isLiked={post.isLiked}
            noOfLike={post.noOfLike}
            isRetweeted={post.isRetweeted}
            noOfReplies={post.noOfReplies}
            noOfRetweets={post.noOfRetweets}
          />
        ))

    }

    </div>
  );
}

Feed.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    img1: PropTypes.string.isRequired,
    img2: PropTypes.string.isRequired,
    img3: PropTypes.string.isRequired,
    img4: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    noOfLike: PropTypes.number.isRequired,
    isRetweeted: PropTypes.bool.isRequired,
    noOfReplies: PropTypes.number.isRequired,
    noOfRetweets: PropTypes.number.isRequired,
  })).isRequired,
};
export default Feed;
