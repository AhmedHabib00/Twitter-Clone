import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Menu } from '@mui/material';
// import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
// import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PropTypes from 'prop-types';
import styles from './NotiContent.css';
// import ImagePopUp from './ImagePopUp';
// import PopupPage from './PopupPage';
// import TweetBox from './TweetBox';

/**
 *
 * @param {Number} id     Post Id
 * @param {String} displayname      User posted display name (user first name).
 * @param {String} content      Posted text.
 *@param {String} notitype     different notifications icons.
 * @returns div element containing the whole whispered tweet
 */
function NotiContent({
  id, displayname, content,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  // const [imagePopUp, setImagePopUp] = useState(false);
  // const [replyPopUp, setReplyPopUp] = useState(false);
  // const [like, setLike] = useState(false);
  // const [likeCount, setLikeCount] = useState(0);
  // const [shareEl, setShareEl] = useState(null);
  // const [retweetEl, setRetweetEl] = useState(null);
  // const localurl = 'http://localhost:8000/NotiContent?id=1';
  /**
   *@returns get the number of the post likes.
   */
  const handelOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handelCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div data-testid="post-render-test" className={styles.post}>
      {/* {
         Data && Data.map((post) => ( */}
      <div className={styles.postbody} key={id}>
        <div className={styles.postheader}>

          <div className={styles.postheadertext}>

            <h3>
              <div data-testid="post-avatar-render-test" className={styles.postavatar}>

                <FavoriteRoundedIcon className="like-icon" />

                <AccountCircleIcon />

                {displayname}
                {' '}

                <MoreHorizIcon aria-controls="menu" onClick={handelOpenMenu} className={`${styles.postblue} ${styles.posthoricon}`} />

                <Menu data-testid="menu-render-test" className={styles.dropdown} id="menu" onClose={handelCloseMenu} anchorEl={anchorEl} open={Boolean(anchorEl)} />

              </div>
            </h3>
          </div>

          <div data-testid="content-render-test" className={styles.postheaderdescription}>
            <p>{content}</p>
          </div>
        </div>

      </div>

    </div>
  );
}

NotiContent.propTypes = {
  id: PropTypes.number.isRequired,
  displayname: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default NotiContent;
