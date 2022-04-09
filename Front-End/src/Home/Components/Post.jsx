import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import VerifiedIcon from '@mui/icons-material/Verified';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import BlockSharpIcon from '@mui/icons-material/BlockSharp';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import { Menu, MenuList } from '@mui/material';
// import BookmarkAddSharpIcon from '@mui/icons-material/BookmarkAddSharp';
// import LinkIcon from '@mui/icons-material/Link';
// import EditIcon from '@mui/icons-material/Edit';
// import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment, faBookmark,
} from '@fortawesome/free-regular-svg-icons';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import 'font-awesome/css/font-awesome.min.css';
// import axios from 'axios';
import styles from './Post.module.css';
import ImagePopUp from './ImagePopUp';
import PopupPage from './PopupPage';
import TweetBox from './TweetBox';
/**
 *
 * @param {Number} id     Post Id
 * @param {String} displayname      User posted display name (user first name).
 * @param {String} username     User posted user name (user full name).
 * @param {String} content      Posted text.
 * @param {String} img1     uploaded image-1 url.
 * @param {String} img2     uploaded image-2 url.
 * @param {String} img3     uploaded image-3 url.
 * @param {String} img4     uploaded image-4 url.
 *
 * @returns div element containing the whole whispered tweet
 */
function Post({
  id, displayname, username, content, img1, img2, img3,
  img4, isLiked, noOfLike,
  isRetweeted, noOfRetweets, noOfReplies,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [imagePopUp, setImagePopUp] = useState(false);
  const [replyPopUp, setReplyPopUp] = useState(false);
  const [like, setLike] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(noOfLike);
  // const [repliesCount, setRepliesCount] = useState(noOfReplies);
  // const [retweetCount, setRetweetCount] = useState(noOfRetweets);
  const [shareEl, setShareEl] = useState(null);
  const [retweetEl, setRetweetEl] = useState(null);

  // const handleRetweets = () => {

  // };
  /**
   *@returns get the number of the post likes.
   */
  const handellikes = () => {
    if (like) {
      setLikeCount(likeCount - 1);
      // axios.post(localurl, {
      //   likes: (likeCount - 1),
      //   isLiked: false,
      //   id,
      // })
      //   .then((response) => {
      //     setLikeCount(response.data[0].likes);
      //     setLike(response.data[0].isLiked);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    } else {
      setLikeCount(likeCount + 1);
      // axios.post(localurl, {
      //   likes: (likeCount + 1),
      //   isLiked: true,
      // })
      //   .then((response) => {
      //     console.log(response);
      //     setLikeCount(response.data[0].likes);
      //     setLike(response.data[0].isLiked);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
    setLike(!like);
  };

  const handelOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handelCloseMenu = () => {
    setAnchorEl(null);
  };

  const handelOpenShare = (e) => {
    setShareEl(e.currentTarget);
  };
  const handelCloseShare = () => {
    setShareEl(null);
  };

  const handelOpenRetweet = (e) => {
    setRetweetEl(e.currentTarget);
  };
  const handelCloseRetweet = () => {
    setRetweetEl(null);
  };
  // const trial = () => {
  //   let response = '';
  //   try {
  //     response = axios.put('http://localhost:8000/posts', {
  //       id,

  //     });
  //     return (response);
  //   } catch (error) {
  //     if (error.response) {
  //       return (error.response);
  //     }

  //     return (response);
  //   }
  // };

  return (
    <div data-testid="post-render-test" className={styles.post}>
      {/* <div>
        <FontAwesomeIcon icon={faCoffee} />
      </div> */}
      {/* {
         Data && Data.map((post) => ( */}
      <div className={styles.postbody} key={id}>
        <div className={styles.postheader}>

          <div className={styles.postheadertext}>

            <h3>
              <div data-testid="post-avatar-render-test" className={styles.postavatar}>

                <AccountCircleIcon />

                {displayname}
                {' '}
                <span className={styles.postheaderSpecial}>
                  {true && <VerifiedIcon className={styles.postbadge} />}
                  {' '}
                  @
                  {username}

                </span>
                <MoreHorizIcon aria-controls="menu" onClick={handelOpenMenu} className={`${styles.postblue} ${styles.posthoricon}`} />

                <Menu data-testid="menu-render-test" className={styles.dropdown} id="menu" onClose={handelCloseMenu} anchorEl={anchorEl} open={Boolean(anchorEl)}>

                  <MenuList className={styles['dropdown-content']}>
                    <div className={styles['label-out']}>
                      {'    '}
                      <VolumeOffOutlinedIcon className={styles['dropdown-content']} />
                      <p className={styles.label}>
                        {' '}
                        Mute @
                        {displayname}
                      </p>
                    </div>
                  </MenuList>
                  <MenuList className={styles['dropdown-content']}>
                    <div className={styles['label-out']}>
                      {'    '}
                      <BlockSharpIcon className={styles['dropdown-content']} />
                      <p className={styles.label}>
                        {' '}
                        Block @
                        {displayname}
                      </p>
                    </div>
                  </MenuList>
                  {/* <MenuList className={styles['dropdown-content']}>
                    <div className={styles['label-out']}>
                      {'    '}
                      <FollowTheSignsIcon className={styles['dropdown-content']} />
                      {' '}
                      <p className={styles.label}>
                        {' '}
                        Follow @
                        {displayname}

                      </p>
                    </div>
                  </MenuList> */}
                </Menu>

                <Menu className="" id="share" onClose={handelCloseShare} anchorEl={shareEl} open={Boolean(shareEl)}>
                  <MenuList className={styles['dropdown-content']}>
                    {'    '}
                    <div className={styles['label-out']}>
                      <FontAwesomeIcon
                        fontSize="large"
                        className={styles['dropdown-content']}
                        icon={faBookmark}
                      />
                      {/* <BookmarkAddSharpIcon className={styles['dropdown-content']} /> */}
                      {' '}
                      <p className={styles.label}>Bookmark</p>
                    </div>
                  </MenuList>
                  {/*
                  <MenuList className={styles['dropdown-content']}>
                    {'    '}
                    <LinkIcon className={styles['dropdown-content']} />
                    {' '}
                    Copy link to Tweet
                  </MenuList> */}

                </Menu>

                <Menu className=" " id="retweet" onClose={handelCloseRetweet} anchorEl={retweetEl} open={Boolean(retweetEl)}>
                  <MenuList className={styles['dropdown-content']}>
                    {'    '}
                    <RepeatIcon className={styles['dropdown-content']} />
                    {' '}
                    Retweet
                  </MenuList>

                  <MenuList className={styles['dropdown-content']}>
                    <div className={styles['label-out']}>
                      {'    '}
                      <EditOutlinedIcon className={styles['dropdown-content']} />
                      {' '}

                      <p className={styles.label}>Quote Tweet</p>
                    </div>
                  </MenuList>

                </Menu>

              </div>
            </h3>
          </div>

          <div data-testid="content-render-test" className={styles.postheaderdescription}>
            <p>{content}</p>
          </div>
        </div>
        <div data-testid="images-render-test">
          <a href="# " onClick={() => setImagePopUp(!imagePopUp)}><img src={img1} alt="pic1" /></a>
          <a href="# " onClick={() => setImagePopUp(!imagePopUp)}><img src={img2} alt="pic1" /></a>
          <a href="# " onClick={() => setImagePopUp(!imagePopUp)}><img src={img3} alt="pic1" /></a>
          <a href="# " onClick={() => setImagePopUp(!imagePopUp)}><img src={img4} alt="pic1" /></a>
        </div>
        <div>
          <ImagePopUp trigger={imagePopUp} setTrigger={setImagePopUp}>
            <Carousel>

              <div>
                <img className={styles.imgpopup} src={img1} alt="pic1" />
              </div>

              <div>
                <img className={styles.imgpopup} src={img2} alt="pic1" />
              </div>

              <div>
                <img className={styles.imgpopup} src={img3} alt="pic1" />
              </div>

              <div>
                <img className={styles.imgpopup} src={img4} alt="pic1" />
              </div>

            </Carousel>
          </ImagePopUp>
        </div>

        <PopupPage trigger={replyPopUp} SetTrigger={setReplyPopUp} isCloseEnabled={false}>
          <TweetBox replyId={id} placeHolder="Tweet your reply" className={styles.retweet} />
        </PopupPage>

        <div data-testid="footer-render-test" className={styles.postfooter}>

          <div className={styles.like}>
            <FontAwesomeIcon
              className={styles.postblue}
              fontSize="large"
              onClick={() => setReplyPopUp(true)}
              icon={faComment}
            />
            <p>{noOfReplies}</p>
          </div>

          <div className={styles.like}>
            <RepeatIcon
              style={(isRetweeted) ? { color: 'rgb(18 180 26)' } : { color: '' }}
              className={styles.postgreen}
              fontSize="small"
              aria-controls="retweet"
              onClick={handelOpenRetweet}
            />
            <p>{noOfRetweets}</p>
          </div>
          <div className={styles.like}>
            <FavoriteBorderIcon
              style={(like) ? { color: '#f02896' } : { color: '' }}
              className={styles.postpink}
              fontSize="small"
              onClick={handellikes}
            />
            <p>{likeCount}</p>
          </div>

          <IosShareOutlinedIcon
            className={styles.postblue}
            fontSize="small"
            aria-controls="share"
            onClick={handelOpenShare}
          />

        </div>

      </div>

    </div>
  );
}

Post.propTypes = {
  id: PropTypes.number.isRequired,
  displayname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  img1: PropTypes.string.isRequired,
  img2: PropTypes.string.isRequired,
  img3: PropTypes.string.isRequired,
  img4: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  noOfLike: PropTypes.number.isRequired,
  isRetweeted: PropTypes.bool.isRequired,
  noOfRetweets: PropTypes.number.isRequired,
  noOfReplies: PropTypes.number.isRequired,
};

export default Post;
