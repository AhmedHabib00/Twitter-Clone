import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import PropTypes from 'prop-types';
// import { Route, Link, BrowserRouter, withRouter } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// import ReactRoundedImage from "react-rounded-image";
import styles from './SearchUserDropDown.module.css';
// import MyPhoto from "./images/me.jpg";

/**
 * @param {Number} profileid      Id
 * @param {String} displayname   User display name (user first and second name).
 * @param {String} username      User usernamename.
 * @param {String} description   User's bio.
 * @param {String} url
 /**
 return suggestions of users
 */

function SearchUser({
  displayname, username, description, url,
}) {
  // const navigate = useNavigate();
  // const icon = null;
  // const statement1 = null;
  // const statement2 = null;
  // const statement3 = null;
  // console.log(content);

  // const handleOpenProfile = () => {
  //   console.log(profileid);
  //   return navigate('/Profile', {
  //     state: {
  //       profileid,
  //     },
  //   });
  // };

  // const pp = <AccountCircleIcon />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper2}>
        <img
          alt=""
          src={url}
          style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
        />

        {/* <AccountCircleIcon /> */}
        <div className={styles.postavatar}>
          <b>{displayname}</b>
        </div>

      </div>

      <div className={styles.username}>
        @
        {username}
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
  // profileid: PropTypes.number.isRequired,
  displayname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,

};

export default SearchUser;
