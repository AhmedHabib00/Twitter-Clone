import React from 'react';
import './TweetBox.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function TweetBox() {
  return (
    <div>
      <div className="tweet-box">
        <a href="#top" className="icon-button">
          <AccountCircleIcon className="icon" />
        </a>
        <input type="text" placeholder="What's happening?" className="tweet-input" />
      </div>
    </div>
  );
}

export default TweetBox;
