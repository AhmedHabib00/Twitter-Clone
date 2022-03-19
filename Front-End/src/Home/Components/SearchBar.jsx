import React from 'react';
import PropTypes from 'prop-types';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import './SearchBar.css';

function SearchBar({ placeHolder, searchValue }) {
  const updateGifs = () => {
    const { value } = document.getElementsByClassName('searchbar-input')[0];
    searchValue(value);
  };
  return (
    <div className="searchbar">
      <SearchOutlinedIcon className="searchbar-icon" />
      <input type="search" placeholder={placeHolder} className="searchbar-input" onChange={updateGifs} />
    </div>
  );
}

SearchBar.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  searchValue: PropTypes.func.isRequired,
};
export default SearchBar;
