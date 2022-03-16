import React from 'react';
import './TweetBox.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';

function TweetBox() {
  const autoGrow = (element) => {
    // eslint-disable-next-line no-param-reassign
    element.target.style.height = 'inherit';
    // eslint-disable-next-line no-param-reassign
    element.target.style.height = `${element.target.scrollHeight < 101 ? element.target.scrollHeight - 22 : element.target.scrollHeight}px`;
  };
  const textEmpty = (element) => {
    console.log(element.data);
  };
  return (
    <div>
      <div className="tweet-box">
        <a href="#top" className="icon-button">
          <AccountCircleIcon className="icon" />
        </a>
        <div className="text-area">
          <div>
            <textarea placeholder="What's Happening?" className="tweet-input" onInput={autoGrow} onBeforeInput={textEmpty} />
          </div>
          <div className="text-area-icons">
            <div className="media-icons">
              <PhotoOutlinedIcon className="media-icon" />
              <GifBoxOutlinedIcon className="media-icon" />
              <EventAvailableOutlinedIcon className="media-icon" />
            </div>
            <button type="submit" className="tweet-icons-button">whisp</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetBox;
