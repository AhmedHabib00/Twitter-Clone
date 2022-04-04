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
            id={post.id}
            displayname={post.displayname}
            username={post.username}
            content={post.content}
            img1={post.img1}
            img2={post.img2}
            img3={post.img3}
            img4={post.img4}
            isLiked={post.isLiked}
          />
        ))
    }

    </div>
  );
}

Feed.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    displayname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    img1: PropTypes.string.isRequired,
    img2: PropTypes.string.isRequired,
    img3: PropTypes.string.isRequired,
    img4: PropTypes.string.isRequired,
    isLike: PropTypes.bool.isRequired,
    // images: PropTypes.arrayOf(PropTypes.shape({
    //   id: PropTypes.number.isRequired, src: PropTypes.string.isRequired,
    // })).isRequired,
  })).isRequired,
};
export default Feed;
