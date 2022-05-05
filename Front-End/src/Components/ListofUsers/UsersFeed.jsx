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
  data, buttonStyle, buttonStyleClicked, onButtonClick, onProfileClick, hasCheckbox,
}) {
  return (
    <div data-testid="feed-render-test" className={styles.notifeed}>
      <div className={styles.parent}>
        {
          data && data.map((content) => (
            <User
              key={content.id}
              profileid={content.id}
              displayname={content.name}
              username={content.username}
              description={content.description}
              url={content.profilePic}
              isButtonActive={content.banned}
              buttonStyle={buttonStyle}
              buttonStyleClicked={buttonStyleClicked}
              onButtonClick={onButtonClick}
              onProfileClick={onProfileClick}
              hasCheckbox={hasCheckbox}
            />
          ))
        }
      </div>
    </div>
  );
}

UsersFeed.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    description: PropTypes.string,
    profilePic: PropTypes.string.isRequired,
    banned: PropTypes.bool,
  })).isRequired,
  onButtonClick: PropTypes.func.isRequired,
  onProfileClick: PropTypes.func,
  buttonStyle: PropTypes.string,
  buttonStyleClicked: PropTypes.string,
  hasCheckbox: PropTypes.bool,
};

UsersFeed.defaultProps = {
  buttonStyle: 'tweetfollowbutton',
  buttonStyleClicked: 'tweetfollowingbutton',
  onProfileClick: function tempFunc() {},
  hasCheckbox: false,
};
export default UsersFeed;
