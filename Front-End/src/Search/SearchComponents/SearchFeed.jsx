import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchFeed.module.css';
import SearchUser from './SearchUser';
// import data from '../../Home/Components/PostData.json';
import Post from '../../Home/Components/Post';

/**
 * @param {array} data array containing our posts.
 * @param {Boolean} dataType
 * @returns map through the post array data and starts passing the posts props
 * to display posts in the feed component.
 */
function SearchFeed({ data, dataType }) {
  console.log(dataType);

  if (dataType) {
    return (
      <div data-testid="feed-render-test" className={styles.notifeed}>
        <div data-testid="content-render-test" className={styles.parent}>
          {
            data && data.map((content) => (
              <SearchUser
                profileid={content.id}
                displayname={content.displayName}
                username={content.userName}
                description={content.description}
                url={content.url}
              />
            ))
            }
          <div className={styles.emptyspace} />
        </div>
      </div>
    );
  }
  return (
    <div data-testid="feed-render-test" className={styles.notifeed}>
      <div data-testid="content-render-test" className={styles.parent} id="FeedContainer">
        {
                        data && data.map((content) => (
                          <Post
                            id={content.id}
                            displayname={content.displayName}
                            username={content.userName}
                            content={content.content}
                            img1={content.img1}
                            img2={content.img2}
                            img3={content.img3}
                            img4={content.img4}
                            isLiked={content.isLiked}
                            noOfLike={content.noOfLike}
                            isRetweeted={content.isRetweeted}
                            noOfReplies={content.noOfReplies}
                            noOfRetweets={content.noOfRetweets}
                          />
                        ))
                    }
        <div className={styles.emptyspace} />
      </div>
    </div>

  );
}
SearchFeed.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    profileid: PropTypes.number.isRequired,
    displayname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  dataType: PropTypes.string.isRequired,
};
export default SearchFeed;
