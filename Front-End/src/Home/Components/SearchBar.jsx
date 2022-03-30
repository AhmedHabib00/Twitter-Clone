import React from 'react';
import PropTypes from 'prop-types';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import styles from './SearchBar.module.css';
/**
 * a text input cmponent that enables user to type a search value
 * @param {string} placeHolder placeholder for searchbox
 * @param {string} searchValue function passed from parent that gets the searched
 * value on value change
 */
function SearchBar({ placeHolder, searchValue }) {
  const updateGifs = () => {
    const { value } = document.getElementsByClassName(styles['searchbar-input'])[0];
    searchValue(value);
  };
  return (
    <div className={styles.searchbar}>
      <SearchOutlinedIcon className={styles['searchbar-icon']} />
      <input type="search" placeholder={placeHolder} className={styles['searchbar-input']} onChange={updateGifs} />
    </div>
  );
}

SearchBar.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  searchValue: PropTypes.func.isRequired,
};
export default SearchBar;
