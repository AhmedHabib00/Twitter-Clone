import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import styles from './SearchBar.module.css';
/**
 * a text input cmponent that enables user to type a search value
 * @param {string} placeHolder placeholder for searchbox
 * @param {string} searchValue function passed from parent that gets the searched
 * value on value change
 */
function SearchBar({ placeHolder, searchValue, delay }) {
  const [query, setQuery] = useState('');
  useEffect(() => {
    const timeOutId = setTimeout(() => searchValue(query), delay);
    return () => clearTimeout(timeOutId);
  }, [query]);
  const updateText = () => {
    const { value } = document.getElementsByClassName(styles['searchbar-input'])[0];
    setQuery(value);
  };
  return (
    <div className={styles.searchbar}>
      <SearchOutlinedIcon className={styles['searchbar-icon']} />
      <input id="searchbar-input-element" type="search" placeholder={placeHolder} className={styles['searchbar-input']} onChange={updateText} />
    </div>
  );
}

SearchBar.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  searchValue: PropTypes.func.isRequired,
  delay: PropTypes.number.isRequired,
};
export default SearchBar;
