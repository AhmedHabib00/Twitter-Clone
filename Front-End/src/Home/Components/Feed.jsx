import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './Feed.module.css';
import Post from './Post';
import Loader from '../../Components/Loader/Loader';

/**
 *
 * @param {array} data array containing our posts.
 * @param {Bool} isReplying bool to check if it's a reply.
 * @param {Bool} canScrollUpdate bool to handel hasMore in infiniteScroll component.
 * @param {Function} updateData function that calls the api request for more data.
 * @param {Bool} isEndOfFeed bool no more data to handel hasMore.
 * @param {Bool} isBlocked bool to check if the user is blocked or no.
 * @returns map through the post array data and starts passing the post props
 * to display the posts in the feed component.
 */
function Feed({
  data, isReplying, canScrollUpdate, updateData, isEndOfFeed, isBlocked,
}) {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    setPostData(data);
  }, [data]);

  return (
    <div data-testid="feed-render-test" className={styles.feed}>
      <InfiniteScroll
        dataLength={postData.length}
        next={updateData}
        hasMore={(canScrollUpdate) ? !isEndOfFeed : false}
        loader={<div className={styles['loader-container']}><Loader dimension={30} /></div>}
        endMessage={(
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        )}
      >
        {
        postData && postData.map((post) => (
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
            isReplying={isReplying}
            url={post.url}
            isBlocked={isBlocked}
            whoRetweeted={post.whoRetweeted}
          />
        ))

      }
      </InfiniteScroll>
    </div>
  );
}
Feed.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    URLs: PropTypes.arrayOf(PropTypes.string).isRequired,
    isLiked: PropTypes.bool.isRequired,
    noOfLike: PropTypes.number.isRequired,
    isRetweeted: PropTypes.bool.isRequired,
    noOfReplies: PropTypes.number.isRequired,
    noOfRetweets: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    whoRetweeted: PropTypes.string,
  })).isRequired,
  isReplying: PropTypes.bool,
  isEndOfFeed: PropTypes.bool,
  canScrollUpdate: PropTypes.bool,
  updateData: PropTypes.func,
  isBlocked: PropTypes.bool,
};

Feed.defaultProps = {
  canScrollUpdate: false,
  isReplying: false,
  isEndOfFeed: false,
  updateData: () => {},
  isBlocked: false,
};
export default Feed;
