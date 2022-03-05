import React from 'react';
import './Post.css';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Post() {
  return (
    <div className="post">
      <div className="postavatar">
        <AccountCircleIcon />
      </div>
      <div className="postbody">
        <div className="postheader">
          <div className="postheadertext">
            <h3>
              Noha
              {' '}
              <span className="postheaderSpecial">
                {true && <VerifiedIcon className="postbadge" />}
                {' '}
                @
                Noha EL-Boghdady

              </span>
            </h3>
          </div>
          <div className="postheaderdescription">
            <p>Hope This Will Work ISA.</p>
          </div>
        </div>

        <div className="postfooter">
          <ChatBubbleIcon fontSize="small" />
          <RepeatIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" />
          <PublishIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
}

export default Post;
