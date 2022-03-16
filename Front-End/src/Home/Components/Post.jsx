import React, { useState } from 'react';
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

                <Menu className="postdropmenu " id="menu" onClose={handelCloseMenu} anchorEl={anchorEl} open={Boolean(anchorEl)}>
                  <MenuList className="dropdown-content ">
                    {'    '}
                    <PlaylistAddSharpIcon />
                    {' '}
                    Add/remove @Noha from Lists
                  </MenuList>

                  <MenuList className="dropdown-content">
                    {'    '}
                    <VolumeOffSharpIcon />
                    {' '}
                    Mute @Noha
                  </MenuList>
                  <MenuList className="dropdown-content">
                    {'    '}
                    <BlockSharpIcon />
                    {' '}
                    Block @Noha
                  </MenuList>
                </Menu>

                <Menu className="postdropmenu " id="share" onClose={handelCloseShare} anchorEl={shareEl} open={Boolean(shareEl)}>
                  <MenuList className="dropdown-content ">
                    {'    '}
                    <BookmarkAddSharpIcon />
                    {' '}
                    Bookmark
                  </MenuList>

                  <MenuList className="dropdown-content">
                    {'    '}
                    <LinkIcon />
                    {' '}
                    Copy link to Tweet
                  </MenuList>

                </Menu>

                <Menu className=" postdropmenu " id="retweet" onClose={handelCloseRetweet} anchorEl={retweetEl} open={Boolean(retweetEl)}>
                  <MenuList className="dropdown-content">
                    {'    '}
                    <RepeatIcon />
                    {' '}
                    Retweet
                  </MenuList>

                  <MenuList className="dropdown-content">

                    {'    '}
                    <EditIcon />
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

        <img
          src="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
          alt=""
        />

        <div className="postfooter">
          <ChatBubbleIcon className="postblue" fontSize="small" />
          <RepeatIcon className="postgreen" fontSize="small" aria-controls="retweet" onClick={handelOpenRetweet} />
          <FavoriteBorderIcon className="postpink" fontSize="small" />
          <PublishIcon fontSize="small" aria-controls="share" onClick={handelOpenShare} className="postblue posthoricon" />
        </div>
      </div>
    </div>
  );
}

export default Post;
