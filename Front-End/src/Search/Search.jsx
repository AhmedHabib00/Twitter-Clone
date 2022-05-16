import { useState, React, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchFeed from './SearchComponents/SearchFeed';
import styles from './Search.module.css';
import PostData from '../Home/Components/PostData.json';
import UsersData from '../Home/Components/UsersData.json';
import GetPostsArray, { GetUsersArray } from '../Services/searchServices';
import SearchBar from '../Components/SearchBar/Searchbar';

/**
 *
 * @returns shows everything in the search component
 */
function Search() {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [postData, setpostData] = useState([]);
  const { dataFiltered } = location.state || { dataFiltered: '' };
  const [isPeopleTab, setIsPeopleTab] = useState(true);
  useEffect(() => {
    document.getElementById('SearchBar').style.visibility = 'hidden';

    if (location.state !== null) {
      setSearchValue([...location.state.dataFiltered]);
    }
  }, [dataFiltered]);

  const [dataType, setdataType] = useState(true);
  const handleSearchPeople = (searchVal) => {
    setIsPeopleTab(true);
    (async () => {
      const resp = await GetUsersArray(searchVal);
      console.log(resp);
    })();
    setpostData(UsersData);
    setdataType(true);
  };

  const handleSearchWhisps = (searchVal) => {
    setIsPeopleTab(false);
    (async () => {
      const resp = await GetPostsArray(searchVal);
      console.log(resp);
    })();
    setpostData(PostData);
    setdataType(false);
  };

  return (
    <div className={styles.notifications}>
      <section className={styles.header1}>
        <SearchBar
          placeHolder="Search Whisper"
          className={styles.searchbartop}
          searchValue={(isPeopleTab) ? handleSearchPeople(searchValue)
            : handleSearchWhisps(searchValue)}
          enableDelay={false}
        />
      </section>
      {/* <br></br> */}
      <section className={styles.flex1}>
        <button className={styles['flex-container']} type="button" onClick={() => handleSearchPeople(searchValue)}>People</button>
        <button className={styles['flex-container']} type="button" onClick={() => handleSearchWhisps(searchValue)}>Whispers</button>
      </section>
      {/* <div> //ai
        <h1>helloooooo</h1>
      </div> */}
      <div>
        <SearchFeed className="notifeed" data={postData} dataType={dataType} />
      </div>
    </div>

  );
}

export default Search;
