import { useState, React, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchFeed from './SearchComponents/SearchFeed';
import styles from './Search.module.css';
import PostData from '../Home/Components/PostData.json';
import SearchBar from './SearchBar/SearchBar';
import UsersData from '../Home/Components/UsersData.json';

/**
 *
 * @returns shows everything in the search component

 */
function Search() {
  // const navigate = useNavigate();
  const location = useLocation();
  const [passedData, setpassedData] = useState(UsersData);
  const { dataFiltered } = location.state || { dataFiltered: '' };
  useEffect(() => {
    document.getElementById('SearchBar').style.visibility = 'hidden';
    // document.getElementById("SearchBar").remove();

    // if(location.state !== null){
    //   console.log("theree")
    //   setpassedData();
    // }

    if (location.state !== null) {
      setpassedData([...location.state.dataFiltered]);
    }
  }, [dataFiltered]);

  const [dataType, setdataType] = useState(true);
  const handlePeople = () => {
    if (dataFiltered !== '') {
      setpassedData(dataFiltered);
    } else {
      setpassedData(UsersData);
    }
    setdataType(true);
  };

  const handleWhispers = () => {
    setpassedData(PostData);
    setdataType(false);
  };

  return (
    <div className={styles.notifications}>
      <section className={styles.header1}>
        <SearchBar placeHolder="Search Twitter" className={styles.searchbartop} />
      </section>
      {/* <br></br> */}
      <section className={styles.flex1}>
        <button className={styles['flex-container']} type="button" onClick={handlePeople}>People</button>
        <button className={styles['flex-container']} type="button" onClick={handleWhispers}>Whispers</button>
      </section>
      {/* <div> //ai
        <h1>helloooooo</h1>
      </div> */}
      <div>
        <SearchFeed className={styles.notifeed} data={passedData} dataType={dataType} />
      </div>
    </div>

  );
}

export default Search;
