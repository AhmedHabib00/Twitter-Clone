import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';

import { useNavigate } from 'react-router-dom';
import ImageBox from './ImageBox';
import PopupPage from './PopupPage';
import SearchBar from '../../Search/SearchBar/SearchBar';

import styles from './TweetBox.module.css';
import { PostTweet, GetGifs } from '../../Services/tweetBoxServices';

/**
 * This components takes a text input from user and a maximum of 4 media items
 * (local images or gifs).
 * it uses gif's developer GET api, search, to get an array of gifs as the user types characters.
 */
function TweetBox({ replyId, placeHolder, boxId }) {
  const navigate = useNavigate();
  const inputFile = createRef();
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [isGifOpen, setIsGifOpen] = useState(false);
  const [gifs, setGifs] = useState();
  const [mediaDisabled, setMediaDisabled] = useState(false);
  const [gifDisabled, setGifDisabled] = useState(false);
  const [imageId, setImageId] = useState(0);
  const [wordsCount, setWordsCount] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);

  const onSearchChange = (value) => {
    let url;
    if (value === '') {
      url = 'http://api.giphy.com/v1/gifs/trending?api_key=3Tq937jtd7Hyq33VveHBIZsJABFPz1vF';
    } else {
      url = `http://api.giphy.com/v1/gifs/search?q=${value}&limit=20&api_key=3Tq937jtd7Hyq33VveHBIZsJABFPz1vF`;
    }
    (async () => {
      const resp = await GetGifs(url);
      setGifs(resp.data);
    })();
  };
  useEffect(() => {
    const timeOutId = setTimeout(() => onSearchChange(query), 2000);
    return () => clearTimeout(timeOutId);
  }, [query]);
  const deleteImage = (id) => {
    if (images.find((image) => image.id === id).type === 'gif') {
      setMediaDisabled(true);
      setGifDisabled(true);
    }
    const newImages = images.filter((image) => image.id !== id);
    if (newImages.length === 0) {
      setMediaDisabled(false);
      setGifDisabled(false);
    }
    setImages(newImages);
    setImageCount(imageCount - 1);
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
    if (event.target.files.length + imageCount > 4) {
      return;
    }
    const tempImages = [...images];
    let tempCounter = imageId;
    if (event.target.files && event.target.files[0]) {
      Array.from(event.target.files).forEach((file, index) => {
        tempImages.push({
          type: 'img',
          id: tempCounter,
          imageUrl: URL.createObjectURL(file),
          imgFile: document.getElementById(`media-selection-from-pc-${boxId}`).files[index],
        });
        tempCounter += 1;
      });
      setImageCount(event.target.files.length + imageCount);
      setImageId(tempCounter);
      setImages(tempImages);
      setGifDisabled(true);
      document.getElementById(`media-selection-from-pc-${boxId}`).value = '';
    }
  };

  const onOpenGif = () => {
    if (imageCount - 1 < 4) {
      setIsGifOpen(!isGifOpen);
      onSearchChange('');
    }
  };

  const onSelectGif = (url) => {
    setImages([...images,
      {
        type: 'gif',
        id: imageId,
        imageUrl: url,
      }]);
    setMediaDisabled(true);
    setGifDisabled(true);
    setImageId(imageId + 1);
    setImageCount(imageCount + 1);
    setIsGifOpen(!isGifOpen);
    setGifs([]);
    document.getElementsByTagName('body')[0].style.setProperty('overflow', 'scroll');
  };

  const handleSendData = () => {
    const { value } = document.getElementById(`twbox-text-area-${boxId}`);
    document.getElementById(`twbox-text-area-${boxId}`).value = '';
    document.getElementById(`twbox-text-area-${boxId}`).style.height = '53px';
    setImages([]);
    setGifs([]);
    setImageCount(0);
    setImageId(0);
    setGifDisabled(false);
    setMediaDisabled(false);
    setWordsCount(0);

    if (value !== '' || images.length !== 0) {
      (async () => {
        await PostTweet({ value, images, replyId });
      })();
      navigate('/');
    }
  };

  const maxWordsNoValidation = () => {
    const count = document.getElementById(`twbox-text-area-${boxId}`).value.length;
    setWordsCount(count);
    if (count > 280) setIsEnabled(false);
    else setIsEnabled(true);
  };
  return (
    <div id="Tweet-box">
      <PopupPage trigger={isGifOpen} SetTrigger={setIsGifOpen} widthpercentage={40}>
        <div className={styles['inner-gif']}>
          <SearchBar searchValue={setQuery} placeHolder="Search for GIFs" />
          <div className={styles['popup-imgs-container']}>
            {gifs && gifs.map((gif) => ((gifs.length === 0) ? '' : (
              <div role="button" tabIndex={0} onClick={() => onSelectGif(gif.images.original.url)} key={gif.id}>
                <img
                  id={`gif-popup-children-${gif.id}`}
                  className={styles['popup-img']}
                  alt=""
                  src={gif.images.original.url}
                />
              </div>
            )))}
          </div>
        </div>
      </PopupPage>

      <div className={styles['tweet-box']}>
        <a href="#top" className={styles['icon-button']}>
          <AccountCircleIcon className={styles.icon} />
        </a>
        <div className={styles['text-area']}>
          <div>
            <textarea
              onChange={maxWordsNoValidation}
              id={`twbox-text-area-${boxId}`}
              placeholder={placeHolder}
              className={styles['tweet-input']}
              onInput={autoGrow}
            />
          </div>
          <ImageBox images={images} onDeleteImage={deleteImage} />
          <div className={styles['text-area-icons']}>
            <div className={styles['media-icons']}>
              <div role="button" tabIndex="0" onClick={(mediaDisabled) ? undefined : onSelectFIle}>
                <PhotoOutlinedIcon
                  className={[(mediaDisabled) ? styles['disabled-div'] : styles.cursor, styles['media-icon']].join(' ')}
                />
                <input
                  id={`media-selection-from-pc-${boxId}`}
                  type="file"
                  multiple="multiple"
                  accept=".jpg, .png"
                  ref={inputFile}
                  onChange={handleFileInput}
                  style={{ display: 'none' }}
                />
              </div>
              <div role="button" tabIndex="0" onClick={(gifDisabled) ? undefined : onOpenGif}>
                <GifBoxOutlinedIcon
                  className={[(gifDisabled) ? styles['disabled-div'] : styles.cursor, styles['media-icon']].join(' ')}
                />
              </div>
            </div>
            <div className={styles['whisp-button-container']}>
              <div
                className={styles['words-count']}
                style={{ color: (wordsCount <= 280) ? 'rgb(29 155 240)' : 'red' }}
              >
                {280 - wordsCount}

              </div>
              <button
                id="twbox-submit"
                type="submit"
                className={styles['tweet-icons-button']}
                onClick={handleSendData}
                disabled={!isEnabled}
              >
                whisp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TweetBox.propTypes = {
  replyId: PropTypes.string,
  placeHolder: PropTypes.string,
  boxId: PropTypes.string.isRequired,
};

TweetBox.defaultProps = {
  replyId: '',
  placeHolder: '',
};

export default TweetBox;
