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
  if (dataType) {
    return (
      <div data-testid="feed-render-test" className={styles.notifeed}>
        <div className={styles.parent}>
          {
            data && data.map((content) => (
              <SearchUser
                key={content.id}
                profileid={content.id}
                displayname={content.displayName}
                username={content.userName}
                description={content.description}
                url={content.url}
                isButtonActive={content.active}
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
      <div className={styles.parent} id="FeedContainer">
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
    id: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  })).isRequired,
  dataType: PropTypes.bool.isRequired,
};
export default SearchFeed;
