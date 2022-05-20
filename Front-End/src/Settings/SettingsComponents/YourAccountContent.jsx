import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';
// import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import KeyIcon from '@mui/icons-material/Key';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import IoKeyOutline from 'react-icons/io';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
// import BlockIcon from '@mui/icons-material/Block';
import PropTypes from 'prop-types';
// import { Route, Link, BrowserRouter, withRouter } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import styles from './YourAccountContent.module.css';

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
  title1, title2,
//   id, entityId, profileid, senderName, content, reason, date,
}) {
  const navigate = useNavigate();
  let icon = null;
  //   const statement1 = null;
  //   const statement2 = null;
  //   const statement3 = null;
  // console.log(content);
  if (title1 === 'Account information') {
    icon = <PersonOutlineIcon className={styles['retweet-icon']} />;
  } else if (title1 === 'Change your password') {
    icon = <KeyIcon className={styles['retweet-icon']} />;
  } else if (title1 === 'Download an archive of your data') {
    icon = <FileDownloadOutlinedIcon className={styles['retweet-icon']} />;
  } else if (title1 === 'TweetDeck Teams') {
    icon = <PeopleOutlineIcon className={styles['retweet-icon']} />;
  } else if (title1 === 'Deactivate your account') {
    icon = <HeartBrokenOutlinedIcon className={styles['retweet-icon']} />;
  } else {
    icon = null;
  }

  // eslint-disable-next-line consistent-return
  //   const handleOpenAcc = () => { navigate('/AccountInformation'); };
  // eslint-disable-next-line consistent-return
  const handleOpenAcc = () => {
    if (title1 === 'Account information') {
      return navigate('/AccountInformation', {
      });
    } if (title1 === 'Change your password') {
      return navigate('/ChangePassword', {
      });
    }
  };
  //   let pp = <AccountCircleIcon />;
  //   if (reason === 'login' || reason === 'news') {
  //     // console.log('pppppppppp');
  //     if (reason === 'news') {
  //       statement1 = content;
  //     }
  //     pp = null;
  //     return (
  //       <button className={styles.wrapper} type="button" onClick={handleOpenNoti}>
  //         <div className={styles.wrapper2}>
  //           <div data-testid="reason-render-test">
  //             {icon}
  //           </div>
  //           {/* <AccountCircleIcon /> */}
  //           <div className={styles['login-news']}>
  //             {statement1}
  //             <b>{senderName}</b>
  //             {statement2}
  //             <br />
  //             {date}
  //             {statement3}
  //           </div>
  //         </div>

  //         {' '}
  //         <div data-testid="content-render-test">
  //           <br />
  //         </div>
  //       </button>
  //     );
  //   }
  // console.log(styles);
  return (
    <button className={styles.wrapper} type="button" onClick={handleOpenAcc}>
      <div className={styles.wrapper2}>
        <div data-testid="reason-render-test">
          {icon}
          <ArrowForwardIosIcon className={styles.arrow} />

        </div>
        {/* <AccountCircleIcon /> */}
        <div className={styles.title1}>
          {title1}
          <br />
          <div className={styles.title2}>
            {title2}
          </div>
        </div>
      </div>
      {' '}
      <div data-testid="content-render-test">
        <br />
        <div className={styles.content2}>
          {}
        </div>
      </div>
    </button>
  );
}

NotiContent.propTypes = {
//   id: PropTypes.number.isRequired,
//   entityId: PropTypes.number.isRequired,
//   profileid: PropTypes.number.isRequired,
//   senderName: PropTypes.string.isRequired,
//   content: PropTypes.string.isRequired,
//   reason: PropTypes.string.isRequired,
  title1: PropTypes.string.isRequired,
  title2: PropTypes.string.isRequired,
  //   date: PropTypes.string.isRequired,

};

export default NotiContent;
