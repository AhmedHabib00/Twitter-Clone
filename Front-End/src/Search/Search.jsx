import { useState, React, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchFeed from './SearchComponents/SearchFeed';
import styles from './Search.module.css';
import GetPostsArray, { GetUsersArray } from '../Services/searchServices';
import SearchBar from '../Components/SearchBar/SearchBar';

/**
 *
 * @returns shows everything in the search component
 */
function Search() {
  const location = useLocation();
  const [searchVal, setSearchVal] = useState();
  const [postData, setpostData] = useState();
  const [isPeopleTab, setIsPeopleTab] = useState(true);
  useEffect(() => {
    if (false) { setpostData(); }
    document.getElementById('SearchBar').style.visibility = 'hidden';
    if (location.state !== null) {
      setSearchVal([...location.state.dataFiltered]);
    }
  }, []);

  const handleSearchPeople = (Val) => {
    console.log(Val);
    (async () => {
      const resp = await GetUsersArray(Val);
      console.log(resp);
      // m7tagen na5od el array of users mn el resp w n7otaha fe el state setter el commented t7t bs
      // setpostData();
    })();
  };

  const handleSearchWhisps = (Val) => {
    (async () => {
      const resp = await GetPostsArray(Val);
      console.log(resp);
      // m7tagen na5od el array of posts mn el resp w n7otaha fe el state setter el commented t7t bs
      // setpostData();
    })();
  };

  return (
    <div className={styles.notifications}>
      <section className={styles.header1}>
        {searchVal && (
        <SearchBar
          searchValue={(isPeopleTab) ? handleSearchPeople
            : handleSearchWhisps}
          placeHolder="Search Whisper"
          enableDelay={false}
        />
        )}
      </section>
      {/* <br></br> */}
      <section className={styles.flex1}>
        <button
          className={styles['flex-container']}
          type="button"
          onClick={() => {
            setIsPeopleTab(true);
            handleSearchPeople(searchVal);
          }}
        >
          People

        </button>
        <button
          className={styles['flex-container']}
          type="button"
          onClick={() => {
            setIsPeopleTab(false);
            handleSearchWhisps(searchVal);
          }}
        >
          Whispers

        </button>
      </section>
      <div>
        {postData && <SearchFeed className="notifeed" data={postData} dataType={isPeopleTab} />}
      </div>
    </div>

  );
}

export default Search;
