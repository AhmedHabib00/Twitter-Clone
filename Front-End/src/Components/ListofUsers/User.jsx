import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './User.module.css';

/**
 * @param {Number} profileid      Id
 * @param {String} displayname    User display name (user first and second name).
 * @param {String} username       User username.
 * @param {String} description    User's bio.
 * @param {String} url
 *
 /**
 return list of searched users
 */

function User({
  profileid, displayname, username, description, url, buttonStyle,
  buttonStyleClicked, isButtonActive, onButtonClick, onProfileClick,
  hasCheckbox, isButtonDisabled, enableStyleSwitching,
}) {
  let isClicked = false;
  const [isButtonClicked, setIsButtonClicked] = useState(isButtonActive);

  const handleOpenProfile = () => {
    if (!isClicked) {
      onProfileClick(profileid);
    }
    isClicked = false;
  };

  // <button className={styles.wrapper} type="button" onCklick={handleOpenProfile}>
  return (
    <div className={styles.wrapper} role="button" tabIndex={0} onClick={handleOpenProfile}>
      <div className={styles['button-container']}>
        <img
          className={styles['profile-img']}
          alt=""
          src={url}
        />
      </div>

      <div className={styles['text-container']}>
        <b>{displayname}</b>
        <div className={styles.username}>
          @
          {username}
        </div>
        <div className={styles.description}>
          {description}
        </div>
      </div>
      <div className={styles['button-container']}>
        {(hasCheckbox)
          ? (
            <input
              className={styles['checkbox-button']}
              type="checkbox"
              disabled={isButtonDisabled}
              checked={isButtonClicked}
              onChange={() => {
                onButtonClick(profileid, !isButtonClicked);
                isClicked = true;
                setIsButtonClicked(!isButtonClicked);
              }}
            />
          ) : (
            <button
              className={[(enableStyleSwitching)
                ? (styles[(isButtonClicked) ? buttonStyleClicked : buttonStyle])
                : styles[buttonStyle],
              styles['default-button']].join(' ')}
              type="button"
              id="followbutton"
              onClick={() => {
                onButtonClick(profileid);
                isClicked = true;
                setIsButtonClicked(!isButtonClicked);
              }}
              disabled={isButtonDisabled}
            >
              <span />
            </button>
          )}
      </div>
    </div>
  );
}

User.propTypes = {
  profileid: PropTypes.string.isRequired,
  displayname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string.isRequired,
  buttonStyle: PropTypes.string,
  buttonStyleClicked: PropTypes.string,
  isButtonActive: PropTypes.bool,
  onButtonClick: PropTypes.func,
  onProfileClick: PropTypes.func,
  hasCheckbox: PropTypes.bool.isRequired,
  isButtonDisabled: PropTypes.bool,
  enableStyleSwitching: PropTypes.bool,
};

User.defaultProps = {
  isButtonActive: false,
  buttonStyle: 'tweetfollowbutton',
  buttonStyleClicked: 'tweetfollowingbutton',
  description: '',
  isButtonDisabled: false,
  enableStyleSwitching: true,
  onButtonClick: function tempFunc() {},
  onProfileClick: function tempFunc() {},
};

export default User;
