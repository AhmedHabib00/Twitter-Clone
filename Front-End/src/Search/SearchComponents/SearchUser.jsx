import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import PropTypes from 'prop-types';
// import { Route, Link, BrowserRouter, withRouter } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import styles from './SearchUser.module.css';
// import ReactRoundedImage from "react-rounded-image";
// import MyPhoto from "./images/me.jpg";

/**
 * @param {Number} profileid      Id
 * @param {String} displayname    User display name (user first and second name).
 * @param {String} username       User username.
 * @param {String} description    User's bio.
 * @param {String} profilePic
 *
 /**
 return list of searched users
 */

function SearchUser({
  profileid, name, username, description, profilePic, buttonStyle, id,
  buttonStyleClicked, isButtonActive,
}) {
  const navigate = useNavigate();
  let isClicked = false;
  const [isButtonClicked, setIsButtonClicked] = useState(isButtonActive);
  console.log(id);
  const handleOpenProfile = () => {
    if (!isClicked) {
      navigate('/Profile', {
        state: {
          profileid,
        },
      });
    }
    isClicked = false;
  };

  // <button className={styles.wrapper} type="button" onCklick={handleOpenProfile}>
  return (
    <div className={styles.wrapper} role="button" tabIndex={0} onClick={handleOpenProfile}>
      <div className={styles.wrapper2}>
        <img
          alt=""
          src={profilePic}
          style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
        />

        {/* <AccountCircleIcon /> */}
        <div className={styles.postavatar}>
          <b>{name}</b>
        </div>

      </div>
      <div className={styles.username}>

        {username}
        <button
          className={styles[(isButtonClicked) ? buttonStyleClicked : buttonStyle]}
          type="button"
          id="followbutton"
          onClick={() => {
            isClicked = true;
            setIsButtonClicked(!isButtonClicked);
          }}
        >
          <span />
        </button>
      </div>

      <div>
        <div className={styles.description}>
          {description}

        </div>

      </div>
      {' '}

      <div>
        <br />
      </div>
    </div>
  );
}

SearchUser.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  profileid: PropTypes.number.isRequired,
  buttonStyle: PropTypes.string,
  buttonStyleClicked: PropTypes.string,
  isButtonActive: PropTypes.bool,
};

SearchUser.defaultProps = {
  buttonStyle: 'tweetfollowbutton',
  buttonStyleClicked: 'tweetfollowingbutton',
  isButtonActive: false,
};

export default SearchUser;
