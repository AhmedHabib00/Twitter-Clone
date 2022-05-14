import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './Feed.module.css';
import Post from './Post';
import GetPostsArray from '../../Services/postServices';

/**
 *
 * @param {array} data array containing our posts.
 *
 * @returns map through the post array data and starts passing the post props
 * to display the posts in the feed component.
 */
function Feed({ data, isReplying }) {
  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPostData(data);
  }, [data]);

  const fetchData = () => {
    (async () => {
      setPage(page + 1);
      const resp = await GetPostsArray(page + 1);
      if (resp.status === 200) {
        setPostData([...postData, ...resp.data]);
      }
    })();
  };

  return (
    <div data-testid="feed-render-test" className={styles.feed}>
      <InfiniteScroll
        dataLength={postData.length}
        next={fetchData}
        hasMore
        loader={<h4>Loading...</h4>}
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
  })).isRequired,
  isReplying: PropTypes.bool,

};

Feed.defaultProps = {
  isReplying: false,
};
export default Feed;
