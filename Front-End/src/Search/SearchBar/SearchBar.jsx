import {useState,React} from 'react';
import PropTypes from 'prop-types';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import Downshift from 'downshift';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import styles from './SearchBar.module.css';
import data from '../../Home/Components/UsersData.json';
import SearchUserDropDown from '../SearchComponents/SearchUserDropDown';
import { AutoComplete } from 'antd';
import { useNavigate } from 'react-router-dom';

/**
 * a text input cmponent that enables user to type a search value
 * @param {string} placeHolder placeholder for searchbox
 * @param {string} searchValue function passed from parent that gets the searched
 * value on value change
 */
function SearchBar({ placeHolder, searchValue }) {
  const navigate = useNavigate();
  const [dataFiltered, setdataFiltered] = useState(data);



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
    setdataFiltered(results)
    // searchValue(string);
    console.log('hereeee')
  

  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log("ssssss")
    return navigate("/Search",{
      state: {
        dataFiltered: dataFiltered
      }
     });
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  function getUrlVars() {
    var vars = [], hashes;
    var hash = window.location.href;

    hashes = hash.split('/');
    vars = hashes[hashes.length - 1];

    return vars;
  }

  var myVal = null;

  window.onload = function () {
    myVal = getUrlVars();

    console.log(myVal)

    if (myVal == "Search") {
      //   document.getElementById('SearchBar').style.visibility = "hidden";
      //   console.log("hereee")
      // } else {
      //   document.getElementById('SearchBar').style.visibility = "visible";
      // }
    }

  }

  console.log(myVal)


  const formatResult = (item) => {

    return (
      <div data-testid="notifeed-render-test" className={styles.notifeed}>
          <div data-testid="noticontent-render-test" className={styles.parent} >
              {
                      <SearchUserDropDown
                          profile_id={item.id}
                          displayname={item.displayName}
                          username={item.userName}
                          description={item.description}
                          url={item.url}
                      />
              }
              <div className={styles.emptyspace}>
              </div>
          </div>
      </div>
  );

    // return (
    //   <>
    //     {/* <span style={{ display: 'flexbox', textAlign: 'left' }}>id: {item.id}</span> */}
    //     <span style={{ display: 'block', textAlign: 'left' }}>
    //       {item.displayName}
    //     </span>
    //   </>
    // )
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 350 }}>
          <ReactSearchAutocomplete className={styles['searchbarTop']}
            items={data}
            placeholder='Search Twitter'
            onSearch={handleOnSearch}
            showClear={true}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus={false}
            formatResult={formatResult}
            fuseOptions=
            {
              {
          //     shouldSort: true,
          // threshold: 0.6,
          // location: 0,
          // distance: 100,
          // maxPatternLength: 32,
          // minMatchCharLength: 1,
          keys: [
          "displayName", "userName"
          ]
         
        }
          }
          resultStringKeyName="displayName"
            // styling={
            //     {
            //       backgroundColor: "black"
            //     }
            //   }
            showIcon = {false}
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

// SearchBar.propTypes = {
//   placeHolder: PropTypes.string.isRequired,
//   searchValue: PropTypes.func.isRequired,
// };
export default SearchBar;
