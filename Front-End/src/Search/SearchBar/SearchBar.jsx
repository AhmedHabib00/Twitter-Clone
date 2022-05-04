import { useState, React } from 'react';
// import PropTypes from 'prop-types';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import Downshift from 'downshift';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';
import data from '../../Home/Components/UsersData.json';
import SearchUserDropDown from '../SearchComponents/SearchUserDropDown';
// import { AutoComplete } from 'antd';

/**
 * a text input component that enables user to type a search value
 * @param {string} placeHolder placeholder for searchbox
 * @param {string} searchValue function passed from parent that gets the searched
 * value on value change
 */
function SearchBar() {
  const navigate = useNavigate();
  const [dataFiltered, setdataFiltered] = useState(data);

  // const updateGifs = () => {
  //   const { value } = document.getElementsByClassName(styles['searchbar-input'])[0];
  //   searchValue(value);
  // };

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    // console.log(string, results);
    setdataFiltered(results);
    // searchValue(string);
    // console.log('hereeee');
  };

  // const handleOnHover = (result) => {
  //   the item hovered
  //   console.log(result);
  // };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
    return navigate('/Search', {
      state: {
        dataFiltered,
      },
    });
  };

  const handleOnFocus = () => {
    // console.log('Focused');
  };

  // console.log(myVal);
  // eslint-disable-next-line arrow-body-style
  const formatResult = (item) => {
    return (
      <div className={styles.notifeed}>
        <div className={styles.parent}>
          <SearchUserDropDown
            profileid={item.id}
            displayname={item.displayName}
            username={item.userName}
            description={item.description}
            url={item.url}
          />
          <div className={styles.emptyspace} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <header>
        <div style={{ width: 350 }}>
          <ReactSearchAutocomplete
            className={styles.searchbartop}
            items={data}
            placeholder="Search Whisper"
            onSearch={handleOnSearch}
            showClear
            // onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus={false}
            formatResult={formatResult}
            fuseOptions={
              {
                keys: [
                  'displayName', 'userName',
                ],
              }
          }
            resultStringKeyName="displayName"
            // styling={
            //     {
            //       backgroundColor: "black"
            //     }
            //   }
            showIcon={false}
          />
        </div>
      </header>
    </div>
  );
}

// SearchBar.propTypes = {
//   placeHolder: PropTypes.string.isRequired,
//   searchValue: PropTypes.func.isRequired,
// };
export default SearchBar;
