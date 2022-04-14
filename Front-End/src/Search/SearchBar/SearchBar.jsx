import React from 'react';
import PropTypes from 'prop-types';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import Downshift from 'downshift';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import styles from './SearchBar.module.css';
import { AutoComplete } from 'antd';
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

  const items = [
    {
      id: 0,
      name: 'Cobol'
    },
    {
      id: 1,
      name: 'JavaScript'
    },
    {
      id: 2,
      name: 'Basic'
    },
    {
      id: 3,
      name: 'PHP'
    },
    {
      id: 4,
      name: 'Java'
    }
  ]

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
    console.log('hereeee')

  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'flexbox', textAlign: 'left' }}>id: {item.id}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>
          {item.name}
        </span>
      </>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 350 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            // styling={
            //     {
            //       padding: '0 0 15 15px'
            //     }
            //   }
            showIcon= {false}
          />
        </div>
      </header>
    </div>
  )

  // return (
  //   <div>
  //   <div className={styles.searchbar}>
  //     <SearchOutlinedIcon className={styles['searchbar-icon']} />
  //     <input id="searchbar-input-element" type="search" placeholder={placeHolder} className={styles['searchbar-input']} onChange={updateGifs} />
  //               </div>
  //               <section className={styles.flex1}>
  //               <button className={styles['flex-container']}></button>
  //     </section>
              
  //               </div>
  // );

}

SearchBar.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  searchValue: PropTypes.func.isRequired,
};
export default SearchBar;
