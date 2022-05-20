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
  const [peopleData, setPeopleData] = useState([]);
  const [postData, setpostData] = useState();
  const [isPeopleTab, setIsPeopleTab] = useState(true);
  useEffect((Val) => {
    (async () => {
      console.log(Val);
      const resp = await GetUsersArray(Val);
      console.log(resp.data.Info[0].data);
      setPeopleData(resp.data.Info[0].data);
    })();
    document.getElementById('SearchBar').style.visibility = 'hidden';
    if (location.state !== null) {
      setSearchVal([...location.state.dataFiltered]);
    }
  }, []);
  console.log(setpostData);
  const handleSearchPeople = (Val) => {
    (async () => {
      console.log(Val);
      const resp = await GetUsersArray(Val);
      console.log(resp.data.Info[0].data);
      setPeopleData(resp.data.Info[0].data);
    })();
  };
  console.log(peopleData);
  const handleSearchWhisps = (Val) => {
    (async () => {
      const resp = await GetPostsArray(Val);
      // console.log(resp);
      setpostData(resp.data);
    })();
  };

  return (
    <div className={styles.notifications}>
      <section className={styles.header1}>
        <SearchBar
          searchValue={(isPeopleTab) ? handleSearchPeople
            : handleSearchWhisps}
          placeHolder="Search Whisper"
          enableDelay={false}
        />
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
        {searchVal && <SearchFeed className="notifeed" data={postData} UsersData={peopleData} dataType={isPeopleTab} />}
      </div>
    </div>

  );
}

export default Search;
