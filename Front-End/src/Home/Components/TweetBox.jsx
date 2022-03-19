import React, { createRef, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';

import ImageBox from './ImageBox';
import PopupGif from './PopupGif';

import './TweetBox.css';

function TweetBox() {
  const inputFile = createRef();
  const [images, setImages] = useState([]);
  const [imageCount, setImageCount] = useState(1);
  const [isGifOpen, setIsGifOpen] = useState(false);

  const deleteImage = (id) => {
    const newImages = images.filter((image) => image.id !== id);
    setImages(newImages);
  };
  const autoGrow = (element) => {
    // eslint-disable-next-line no-param-reassign
    element.target.style.height = 'inherit';
    // eslint-disable-next-line no-param-reassign
    element.target.style.height = `${element.target.scrollHeight < 101 ? element.target.scrollHeight - 22 : element.target.scrollHeight}px`;
  };
  const onSelectFIle = () => {
    inputFile.current.click();
  };

  const handleFileInput = (event) => {
    if (event.target.files.length + imageCount - 1 > 4) {
      return;
    }
    const tempImages = [...images];
    let tempCounter = imageCount;
    if (event.target.files && event.target.files[0]) {
      Array.from(event.target.files).forEach((file) => {
        tempImages.push({
          id: tempCounter,
          imageUrl: URL.createObjectURL(file),
        });
        tempCounter += 1;
      });
      setImageCount(tempCounter);
      setImages(tempImages);
    }
  };

  const onOpenGif = () => {
    setIsGifOpen(!isGifOpen);
  };
  return (
    <div>
      <PopupGif trigger={isGifOpen} />
      <div className="tweet-box">
        <a href="#top" className="icon-button">
          <AccountCircleIcon className="icon" />
        </a>
        <div className="text-area">
          <div>
            <textarea placeholder="What's Happening?" className="tweet-input" onInput={autoGrow} />
          </div>
          <ImageBox images={images} onDeleteImage={deleteImage} />
          <div className="text-area-icons">
            <div className="media-icons">
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <div role="button" tabIndex="0" onClick={onSelectFIle}>
                <PhotoOutlinedIcon className="media-icon" />
                <input type="file" id="file" multiple="multiple" accept=".jpg, .png" ref={inputFile} onChange={handleFileInput} style={{ display: 'none' }} />
              </div>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <div role="button" tabIndex="0" onClick={onOpenGif}>
                <GifBoxOutlinedIcon className="media-icon" />
              </div>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <div role="button" tabIndex="0" onClick={onSelectFIle}>
                <SentimentSatisfiedOutlinedIcon className="media-icon" />
              </div>
            </div>
            <button type="submit" className="tweet-icons-button">whisp</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetBox;
