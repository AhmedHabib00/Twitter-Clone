import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PropTypes from 'prop-types';
import styles from './SearchUserDropDown.module.css';
import { Route, Link, BrowserRouter, withRouter } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ReactRoundedImage from "react-rounded-image";
// import MyPhoto from "./images/me.jpg";


/**
 * @param {Number} profile_id      Id
 * @param {String} displayname      User display name (user first name).
 * @param {String} username      User display name (user first name).
 * @param {String} description       text.
 * @param {String} url
 * 
 /**
 return notifications content inside feed insidd notifications component
 */

function SearchUser({
  profile_id, displayname, username, description, url,
}) {
  const navigate = useNavigate();
  let icon = null;
  let statement1 = null;
  let statement2 = null;
  let statement3 = null;
  // console.log(content);

  const handleOpenProfile = (e) => {
    console.log(profile_id)
    return navigate("/Profile", {
      state: {
        profile_id: profile_id
      }
    });
  };

  const handlefollow = (e) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    if (e.target.className == styles.tweetfollowbutton){
      e.target.className = styles.tweetfollowingbutton;
      e.target.textContent = "Following";
    }
    else{
      e.target.className = styles.tweetfollowbutton;
      e.target.textContent = "Follow";
    }

  };

  const handleEnter = (e) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    if (e.target.className == styles.tweetfollowingbutton){
      e.target.textContent = "Unfollow";
      e.target.className = styles.tweetfollowingbuttonHover;
    }
  };

  const handleLeave = (e) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    if (e.target.className == styles.tweetfollowingbuttonHover){
      e.target.textContent = "Following";
      e.target.className = styles.tweetfollowingbutton;
    }
  };


  let pp = <AccountCircleIcon />;

  return (
    <div className={styles.wrapper} onClick={handleOpenProfile}>
      <div className={styles.wrapper2}>
        <img
          src={url}
          style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
        />

        {/* <AccountCircleIcon /> */}
        <div data-testid="noticontent-avatar-render-test" className={styles.postavatar}>
          <b>{displayname}</b>
        </div>

      </div>


      <div className={styles['username']}>
        @{username}
      </div>

      <div >
        <div className={styles['description']}>
          {description}

        </div>

      </div>
      {' '}

      <div data-testid="content-render-test">
        <br></br>
      </div>
    </div>
  );
}

SearchUser.propTypes = {
  profile_id: PropTypes.number.isRequired,
  displayname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,

};

export default SearchUser;
