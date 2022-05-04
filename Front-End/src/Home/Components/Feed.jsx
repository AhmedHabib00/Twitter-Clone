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
    <div data-testid="feed-render-test" className={styles.feed}>

      {
        data && data.map((post) => (

          <Post
            key={post.id}
            id={post.id}
            displayName={post.displayName}
            userName={post.userName}
            content={post.content}
            URLs={post.URLs}
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
    id: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    URLs: PropTypes.arrayOf(PropTypes.string).isRequired,
    isLiked: PropTypes.bool.isRequired,
    noOfLike: PropTypes.number.isRequired,
    isRetweeted: PropTypes.bool.isRequired,
    noOfReplies: PropTypes.number.isRequired,
    noOfRetweets: PropTypes.number.isRequired,
  })).isRequired,
};
export default Feed;
