import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Post.css';
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
import ImagePopUp from './ImagePopUp';

// import Trial from './Trial';

function Post() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handelOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handelCloseMenu = () => {
    setAnchorEl(null);
  };

  const [shareEl, setShareEl] = useState(null);
  const handelOpenShare = (e) => {
    setShareEl(e.currentTarget);
  };
  const handelCloseShare = () => {
    setShareEl(null);
  };

  const [retweetEl, setRetweetEl] = useState(null);
  const handelOpenRetweet = (e) => {
    setRetweetEl(e.currentTarget);
  };
  const handelCloseRetweet = () => {
    setRetweetEl(null);
  };

  const [imagePopUp, setImagePopUp] = useState(false);

  return (
    <div className="post">

      <div className="postbody">
        <div className="postheader">

          <div className="postheadertext">

            <h3>
              <div className="postavatar">
                <AccountCircleIcon />

                Noha
                {' '}
                <span className="postheaderSpecial">
                  {true && <VerifiedIcon className="postbadge" />}
                  {' '}
                  @Noha EL-Boghdady

                </span>
                <MoreHorizIcon aria-controls="menu" onClick={handelOpenMenu} className="postblue posthoricon" />

                <Menu className="dropdown  " id="menu" onClose={handelCloseMenu} anchorEl={anchorEl} open={Boolean(anchorEl)}>
                  <MenuList className="dropdown-content ">
                    {'    '}
                    <PlaylistAddSharpIcon className="dropdown-content" />
                    {' '}
                    Add/remove @Noha from Lists
                  </MenuList>

                  <MenuList className="dropdown-content">
                    {'    '}
                    <VolumeOffSharpIcon className="dropdown-content" />
                    {' '}
                    Mute @Noha
                  </MenuList>
                  <MenuList className="dropdown-content">
                    {'    '}
                    <BlockSharpIcon className="dropdown-content" />
                    {' '}
                    Block @Noha
                  </MenuList>
                  <MenuList className="dropdown-content">
                    {'    '}
                    <FollowTheSignsIcon className="dropdown-content" />
                    {' '}
                    Follow @Noha
                  </MenuList>
                </Menu>

                <Menu className="" id="share" onClose={handelCloseShare} anchorEl={shareEl} open={Boolean(shareEl)}>
                  <MenuList className="dropdown-content ">
                    {'    '}
                    <BookmarkAddSharpIcon className="dropdown-content" />
                    {' '}
                    Bookmark
                  </MenuList>

                  <MenuList className="dropdown-content">
                    {'    '}
                    <LinkIcon className="dropdown-content" />
                    {' '}
                    Copy link to Tweet
                  </MenuList>

                </Menu>

                <Menu className=" " id="retweet" onClose={handelCloseRetweet} anchorEl={retweetEl} open={Boolean(retweetEl)}>
                  <MenuList className="dropdown-content">
                    {'    '}
                    <RepeatIcon className="dropdown-content" />
                    {' '}
                    Retweet
                  </MenuList>

                  <MenuList className="dropdown-content">

                    {'    '}
                    <EditIcon className="dropdown-content" />
                    {' '}

                    Quote Tweet

                  </MenuList>

                </Menu>

              </div>
            </h3>
          </div>

          <div className="postheaderdescription">
            <p>Hope This Will Work ISA.</p>
          </div>
        </div>

        <div>
          <a href="# " onClick={() => setImagePopUp(true)}><img src="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319" alt="pic1" /></a>
          <a href="# " onClick={() => setImagePopUp(true)}><img src="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319" alt="pic1" /></a>
          <a href="# " onClick={() => setImagePopUp(true)}><img src="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319" alt="pic1" /></a>
          <a href="# " onClick={() => setImagePopUp(true)}><img src="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319" alt="pic1" /></a>
        </div>

        <ImagePopUp trigger={imagePopUp} setTrigger={setImagePopUp}>
          <Carousel>
            <div>
              <img className="imgpopup" src="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319" alt="pic1" />
            </div>
            <div>
              <img className="imgpopup" src="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319" alt="pic1" />
            </div>
            <div>
              <img className="imgpopup" src="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319" alt="pic1" />
            </div>
            <div>
              <img className="imgpopup" src="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319" alt="pic1" />
            </div>
          </Carousel>
          {/* <img className="imgpopup" src="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319" alt="pic1" /> */}
        </ImagePopUp>

        <div className="postfooter">
          <ChatBubbleIcon className="postblue" fontSize="small" />
          <RepeatIcon className="postgreen" fontSize="small" aria-controls="retweet" onClick={handelOpenRetweet} />
          <FavoriteBorderIcon className="postpink" fontSize="small" />
          <PublishIcon fontSize="small" aria-controls="share" onClick={handelOpenShare} className="postblue " />
        </div>

      </div>
    </div>
  );
}

export default Post;
