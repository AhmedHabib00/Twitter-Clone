import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import VolumeOffSharpIcon from '@mui/icons-material/VolumeOffSharp';
import BlockSharpIcon from '@mui/icons-material/BlockSharp';
import { Menu, MenuList } from '@mui/material';
import BookmarkAddSharpIcon from '@mui/icons-material/BookmarkAddSharp';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import axios from 'axios';
import PropTypes from 'prop-types';
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
  id, displayname, username, content, img1, img2, img3, img4, isLiked,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [imagePopUp, setImagePopUp] = useState(false);
  const [replyPopUp, setReplyPopUp] = useState(false);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shareEl, setShareEl] = useState(null);
  const [retweetEl, setRetweetEl] = useState(null);
  const localurl = `http://localhost:8000/posts?id=${id}`;

  useEffect(() => {
    axios.get(localurl)
      .then((resp) => {
        console.log(resp.data);
        setLikeCount(resp.data[0].likes);
        setLike(isLiked);
      }).catch((error) => {
        console.log(error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

  return (
    <div data-testid="post-render-test" className={styles.post}>
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
                <MoreHorizIcon aria-controls="menu" onClick={handelOpenMenu} className={[styles.postblue, styles.posthoricon]} />

                <Menu data-testid="menu-render-test" className={styles.dropdown} id="menu" onClose={handelCloseMenu} anchorEl={anchorEl} open={Boolean(anchorEl)}>
                  <MenuList className={styles['dropdown-content ']}>
                    {'    '}
                    <PlaylistAddSharpIcon className={styles['dropdown-content']} />
                    {' '}
                    Add/remove @
                    {displayname}
                    {' '}
                    from Lists
                  </MenuList>

                  <MenuList className={styles['dropdown-content']}>
                    {'    '}
                    <VolumeOffSharpIcon className={styles['dropdown-content']} />
                    {' '}
                    Mute @
                    {displayname}
                  </MenuList>
                  <MenuList className={styles['dropdown-content']}>
                    {'    '}
                    <BlockSharpIcon className={styles['dropdown-content']} />
                    {' '}
                    Block @
                    {displayname}
                  </MenuList>
                  <MenuList className={styles['dropdown-content']}>
                    {'    '}
                    <FollowTheSignsIcon className={styles['dropdown-content']} />
                    {' '}
                    Follow @
                    {displayname}
                  </MenuList>
                </Menu>

                <Menu className="" id="share" onClose={handelCloseShare} anchorEl={shareEl} open={Boolean(shareEl)}>
                  <MenuList className={styles['dropdown-content']}>
                    {'    '}
                    <BookmarkAddSharpIcon className={styles['dropdown-content']} />
                    {' '}
                    Bookmark
                  </MenuList>

                  <MenuList className={styles['dropdown-content']}>
                    {'    '}
                    <LinkIcon className={styles['dropdown-content']} />
                    {' '}
                    Copy link to Tweet
                  </MenuList>

                </Menu>

                <Menu className=" " id="retweet" onClose={handelCloseRetweet} anchorEl={retweetEl} open={Boolean(retweetEl)}>
                  <MenuList className={styles['dropdown-content']}>
                    {'    '}
                    <RepeatIcon className={styles['dropdown-content']} />
                    {' '}
                    Retweet
                  </MenuList>

                  <MenuList className={styles['dropdown-content']}>

                    {'    '}
                    <EditIcon className={styles['dropdown-content']} />
                    {' '}

                    Quote Tweet

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
        {/* <div>
          {
             images && images.map((src) => (

             ))

           }

        </div>

        <ImagePopUp trigger={imagePopUp} setTrigger={setImagePopUp}>
          <Carousel>
            {
          images && images.map((src) => (
            <div key={src.id}>
              <img className={styles.imgpopup} src={src.src} alt="pic1" />
            </div>
          ))
           }
          </Carousel>
        </ImagePopUp> */}

        <PopupPage trigger={replyPopUp} SetTrigger={setReplyPopUp}>
          <TweetBox />
        </PopupPage>

        <div data-testid="footer-render-test" className={styles.postfooter}>
          <ChatBubbleIcon
            className={styles.postblue}
            fontSize="small"
            onClick={() => setReplyPopUp(true)}
          />
          <RepeatIcon
            className={styles.postgreen}
            fontSize="small"
            aria-controls="retweet"
            onClick={handelOpenRetweet}
          />
          <div className={styles.like}>
            <FavoriteBorderIcon
              style={(like) ? { color: '#f02896' } : { color: '' }}
              className={styles.postpink}
              fontSize="small"
              onClick={handellikes}
            />
            <p>{likeCount}</p>
          </div>
          <PublishIcon fontSize="small" aria-controls="share" onClick={handelOpenShare} className={styles.postblue} />
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
};

export default Post;
