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
import styles from './NotiContent.module.css';
/**
 * @param {Number} id      Id
 * @param {String} displayname      User display name (user first name).
 * @param {String} content1       text.
 * @param {String} content2      text.
 * @param {String} content3       text.
 * @param {String} content4      text.
 * @param {String} content5       text.
 * @param {String} content6      text.
 * @param {String} content11      tweets.
 * @param {String} content22      tweets.
 * @param {String} content55       text.
 *@param {String} notitype     different notifications icons.
 /**
 return notifications content inside feed insidd notifications component
 */
function NotiContent({
  id, displayname, content1, content11, content2, content22, content3, content4,
  content5, content55, content6, notitype,
}) {
  let icon = null;
  // console.log(content);
  if (notitype === 'like') {
    icon = <FavoriteRoundedIcon className={styles['like-icon']} />;
  } else if (notitype === 'retweet') {
    icon = <RepeatRoundedIcon className={styles['retweet-icon']} />;
  } else if (notitype === 'missed') {
    icon = <AutoAwesomeIcon className={styles['missed-icon']} />;
  } else if (notitype === 'followed') {
    icon = <PersonRoundedIcon className={styles['followed-icon']} />;
  } else if (notitype === 'login') {
    icon = <TwitterIcon className={styles['login-icon']} />;
  } else if (notitype === 'news') {
    icon = <FlashOnRoundedIcon className={styles['news-icon']} />;
  } else {
    icon = null;
  }
  let pp = <AccountCircleIcon />;
  if (notitype === 'login' || notitype === 'news') {
    console.log('pppppppppp');
    pp = null;
  }
  console.log(id);
  console.log(styles);
  return (
    <div data-testid="noticontent-render-test" className={styles.parent}>
      {/* {
         Data && Data.map((post) => ( */}
      <div data-testid="notitype-render-test">
        {icon}
      </div>
      {/* <AccountCircleIcon /> */}
      <div data-testid="noticontent-avatar-render-test" className={styles.postavatar}>
        {pp}
      </div>
      <div className={styles['display-name']}>
        {displayname}
      </div>
      {' '}
      <div data-testid="content-render-test">
        <div className={styles.content1}>
          {content1}
        </div>
        <div className={styles.content11}>
          {content11}
        </div>
        <div className={styles.content2}>
          {content2}
        </div>
        <div className={styles.content22}>
          {content22}
        </div>
        <div className={styles.content3}>
          {content3}
        </div>
        <div className={styles.content4}>
          {content4}
        </div>
        <div className={styles.content5}>
          {content5}
        </div>
        <div className={styles.content55}>
          {content55}
        </div>
        <div className={styles.content6}>
          {content6}
        </div>
      </div>
    </div>
  );
}

NotiContent.propTypes = {
  id: PropTypes.number.isRequired,
  displayname: PropTypes.string.isRequired,
  content1: PropTypes.string.isRequired,
  content11: PropTypes.string.isRequired,
  content2: PropTypes.string.isRequired,
  content22: PropTypes.string.isRequired,
  content3: PropTypes.string.isRequired,
  content4: PropTypes.string.isRequired,
  content5: PropTypes.string.isRequired,
  content55: PropTypes.string.isRequired,
  content6: PropTypes.string.isRequired,
  notitype: PropTypes.string.isRequired,
};

export default NotiContent;
