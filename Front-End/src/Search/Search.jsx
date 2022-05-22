import { useState, React, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchFeed from './SearchComponents/SearchFeed';
import styles from './Search.module.css';
import GetPostsArray, { GetUsersArray } from '../Services/searchServices';
import SearchBar from '../Components/SearchBar/SearchBar';
import Feed from '../Home/Components/Feed';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isContent, setIsContent] = useState(false);
  useEffect(() => {
    document.getElementById('SearchBar').style.visibility = 'hidden';
    if (location.state !== null) {
      (async () => {
        const resp = await GetUsersArray(location.state.dataFiltered);
        setPeopleData(resp.data.Info[0].data);
      })();
      setSearchVal(location.state.dataFiltered);
    }
  }, []);
  const handleSearchPeople = (Val) => {
    (async () => {
      const resp = await GetUsersArray(Val);
      setPeopleData(resp.data.Info[0].data);
    })();
    setSearchVal(Val);
  };
  const handleSearchWhisps = (Val) => {
    (async () => {
      setIsLoading(true);
      const resp = await GetPostsArray(Val);
      setIsLoading(false);
      setpostData(resp.data);
      if (resp.data !== 'No tweets found') {
        setIsContent(true);
      }
    })();
    setSearchVal(Val);
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
        {(isPeopleTab && searchVal) && <SearchFeed className="notifeed" data={postData} UsersData={peopleData} dataType={isPeopleTab} />}
        {(!isPeopleTab && searchVal && isContent)
        && <Feed data={postData} canScrollUpdate={isLoading} />}
        {(!isPeopleTab && searchVal && !isContent) && <h4>No whispers Found</h4>}
      </div>
    </div>

  );
}

export default Search;
