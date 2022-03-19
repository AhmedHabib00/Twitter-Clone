import React, { useState } from 'react';
import PropTypes from 'prop-types';
import request from 'superagent';
import SearchBar from './SearchBar';

import './PopupGif.css';

function PopupGif({ trigger }) {
  // eslint-disable-next-line no-unused-vars
  const [gifs, setGifs] = useState([]);
  const onSearchChange = (value) => {
    const url = `http://api.giphy.com/v1/gifs/search?q=${value}&api_key=3Tq937jtd7Hyq33VveHBIZsJABFPz1vF`;
    request.get(url, (err, res) => {
      setGifs(res.body.data);
    });
  };
  return (trigger) ? (
    <div className="popup-gif">
      <div className="inner-popup-gif">
        <SearchBar searchValue={onSearchChange} placeHolder="Search for GIFs" />
        <div className="popup-imgs-container">
          {gifs.map((gif) => ((gifs.length === 0) ? '' : <img className="popup-img" alt="" key={gif.id} src={gif.images.original.url} />))}
        </div>
      </div>
    </div>
  ) : '';
}

PopupGif.propTypes = {
  trigger: PropTypes.bool.isRequired,
};

export default PopupGif;
