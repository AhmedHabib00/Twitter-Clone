import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';
// import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
// import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
// import KeyIcon from '@mui/icons-material/Key';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import IoKeyOutline from 'react-icons/io';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
// import BlockIcon from '@mui/icons-material/Block';
import PropTypes from 'prop-types';
// import { Route, Link, BrowserRouter, withRouter } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import styles from './AccountInformationContent.module.css';

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
  acctitle1, acctitle2,
//   id, entityId, profileid, senderName, content, reason, date,
}) {
  const navigate = useNavigate();
  const icon = null;
  //   const statement1 = null;
  //   const statement2 = null;
  //   const statement3 = null;
  // console.log(content);
  // if (acctitle1 === 'Username' || acctitle1 === 'Phone' || acctitle1 === 'Email'
  //  || acctitle1 === 'Age' || acctitle1 === 'Gender' || acctitle1 === 'Country') {
  //   icon = <ArrowForwardIosIcon className={styles.arrow} />;
  // } else {
  //   icon = null;
  // }
  //   } else if (title1 === 'Download an archive of your data') {
  //     icon = <FileDownloadOutlinedIcon className={styles['retweet-icon']} />;
  //   } else if (title1 === 'TweetDeck Teams') {
  //     icon = <PeopleOutlineIcon className={styles['retweet-icon']} />;
  //   } else if (title1 === 'Deactivate your account') {
  //     icon = <HeartBrokenOutlinedIcon className={styles['retweet-icon']} />;
  //   } else {
  //     icon = null;
  //   }

  // eslint-disable-next-line consistent-return
  const handleOpen = () => {
    if (acctitle1 === 'Age') {
      return navigate('/Age', {
      });
    } if (acctitle1 === 'Change your password') {
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
    <button className={styles.wrapper} type="button" onClick={handleOpen}>
      <div className={styles.wrapper2}>
        <div data-testid="reason-render-test">
          {icon}
          <ArrowForwardIosIcon className={styles.arrow} />

        </div>
        <div className={styles.title1}>
          {acctitle1}
          <br />
          <div className={styles.title2}>
            {acctitle2}
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
  acctitle1: PropTypes.string.isRequired,
  acctitle2: PropTypes.string.isRequired,
  //   date: PropTypes.string.isRequired,

};

export default NotiContent;
