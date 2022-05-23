import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BlockIcon from '@mui/icons-material/Block';
import PropTypes from 'prop-types';
// import { Route, Link, BrowserRouter, withRouter } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import styles from './NotiContent.module.css';

/**
 * @param {Number} id      Id
 * @param {Number} entityId
 * @param {Number} profileid
 * @param {String} senderName      User display name (user first name).
 * @param {String} content       text.
 * @param {String} reason     different notifications icons.
 * @param {String} date
 /**
 return notifications content inside feed insidd notifications component
 */

function NotiContent({
  id, entityId, profileid, senderName, content, reason, date, blockDuration, from, to,
}) {
  const navigate = useNavigate();
  let icon = null;
  let statement1 = null;
  let statement2 = null;
  let statement3 = null;
  console.log(blockDuration);
  console.log(from);
  console.log(to);
  console.log(date);
  if (reason === 'like') {
    icon = <FavoriteRoundedIcon className={styles['like-icon']} />;
    statement2 = ' liked your Tweet';
  } else if (reason === 'retweet') {
    icon = <RepeatRoundedIcon className={styles['retweet-icon']} />;
    statement2 = ' Retweeted your Tweet';
  } else if (reason === 'missed') {
    icon = <AutoAwesomeIcon className={styles['missed-icon']} />;
    statement1 = 'In case you missed ';
    statement2 = '\'s tweet';
  } else if (reason === 'followed') {
    icon = <PersonRoundedIcon className={styles['followed-icon']} />;
    statement2 = ' followed you';
  } else if (reason === 'login') {
    icon = <TwitterIcon className={styles['login-icon']} />;
    statement1 = 'There was a login to your account @';
    statement2 = ' from a new device on';
    statement3 = '. Review it now.';
  } else if (reason === 'news') {
    icon = <FlashOnRoundedIcon className={styles['news-icon']} />;
    // statement = ' Liked your Tweet';
  } else if (reason === 'block') {
    icon = <BlockIcon className={styles['block-icon']} />;
    statement1 = 'You have been blocked by the admin for ';
    statement2 = blockDuration;
    statement3 = ' days.';
    // eslint-disable-next-line no-param-reassign
    senderName = '';
  } else {
    icon = null;
  }

  // eslint-disable-next-line consistent-return
  const handleOpenNoti = () => {
    // console.log(entityId);
    // console.log(profileid);
    if (reason === 'like' || reason === 'retweet' || reason === 'missed') {
      return navigate(`/tweet/${entityId}`);
    } if (reason === 'followed') {
      return navigate('/Profile', {
        state: {
          profileid,
        },
      });
    }
    // setShareEl(e.currentTarget);
  };

  let pp = <AccountCircleIcon />;
  if (reason === 'login' || reason === 'news') {
    // console.log('pppppppppp');
    if (reason === 'news') {
      statement1 = content;
    }
    pp = null;
    return (
      <button id="single-notification" className={styles.wrapper} type="button" onClick={handleOpenNoti}>
        <div id="single-notification-container" className={styles.wrapper2}>
          <div id="single-notification-icon" data-testid="reason-render-test">
            {icon}
          </div>
          {/* <AccountCircleIcon /> */}
          <div id="single-notification-statment" className={styles['login-news']}>
            {statement1}
            {/* <b>{senderName}</b> */}
            {statement2}
            <br />
            {/* {date} */}
            {statement3}
          </div>
        </div>

        {' '}
        <div data-testid="content-render-test">
          <br />
        </div>
      </button>
    );
  }
  console.log(id);
  // console.log(styles);
  return (
    <button id="single-notification" className={styles.wrapper} type="button" onClick={handleOpenNoti}>
      <div id="single-notification-container" className={styles.wrapper2}>
        <div id="single-notification-icon" data-testid="reason-render-test">
          {icon}
        </div>
        {/* <AccountCircleIcon /> */}
        <div data-testid="noticontent-avatar-render-test" className={styles.postavatar}>
          {pp}
        </div>
      </div>
      <div id="single-notification-statment" className={styles['display-name']}>
        {statement1}
        <b>{senderName}</b>
        {statement2}
        {statement3}

      </div>
      {' '}
      <div id="single-notification-content" data-testid="content-render-test">
        <br />
        <div className={styles.content2}>
          {content}
        </div>
      </div>
    </button>
  );
}

NotiContent.propTypes = {
  id: PropTypes.number.isRequired,
  entityId: PropTypes.number.isRequired,
  profileid: PropTypes.number.isRequired,
  senderName: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  reason: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  blockDuration: PropTypes.string.isRequired,
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
};

export default NotiContent;
