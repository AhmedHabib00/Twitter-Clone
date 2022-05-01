import React from 'react';
import PropTypes from 'prop-types';
import styles from './UsersFeed.module.css';
import User from './User';

/**
 * @param {array} data array containing our posts.
 * @param {Boolean} dataType
 * @returns map through the post array data and starts passing the posts props
 * to display posts in the feed component.
 */
function UsersFeed({
  data, buttonStyle, buttonStyleClicked, onButtonClick, onProfileClick,
}) {
  return (
    <div data-testid="feed-render-test" className={styles.notifeed}>
      <div className={styles.parent}>
        {
          data && data.map((content) => (
            <User
              key={content.id}
              profileid={content.id}
              displayname={content.displayName}
              username={content.userName}
              description={content.description}
              url={content.url}
              isButtonActive={content.active}
              buttonStyle={buttonStyle}
              buttonStyleClicked={buttonStyleClicked}
              onButtonClick={onButtonClick}
              onProfileClick={onProfileClick}
            />
          ))
        }
      </div>
    </div>
  );
}

UsersFeed.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    active: PropTypes.bool,
  })).isRequired,
  onButtonClick: PropTypes.func.isRequired,
  onProfileClick: PropTypes.func,
  buttonStyle: PropTypes.string,
  buttonStyleClicked: PropTypes.string,
};

UsersFeed.defaultProps = {
  buttonStyle: 'tweetfollowbutton',
  buttonStyleClicked: 'tweetfollowingbutton',
  onProfileClick: function tempFunc() {},
};
export default UsersFeed;
