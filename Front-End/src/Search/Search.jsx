import { useState, React, useEffect } from 'react';
import SearchFeed from '../Search/SearchComponents/SearchFeed.jsx';
import styles from '../Search/Search.module.css';
import PostData from '../Home/Components/PostData.json';
import SearchBar from '../Search/SearchBar/SearchBar';
import UsersData from '../Home/Components/UsersData.json';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 *
 * @returns shows everything in the notifications component

 */
function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [passedData, setpassedData] = useState(UsersData);
  const { dataFiltered } = location.state || { dataFiltered: '' };


  useEffect(() => {

    document.getElementById('SearchBar').style.visibility="hidden";
    // document.getElementById("SearchBar").remove();

    // if(location.state !== null){
    //   console.log("theree")
    //   setpassedData();
    // }

    if(location.state !== null){
      setpassedData([...location.state.dataFiltered])
    }

  }, [dataFiltered]);


  const [dataType, setdataType] = useState(true);


  const handlePeople = (e) => {
    if(dataFiltered !== ''){
    setpassedData(dataFiltered)
    }
    else{
      setpassedData(UsersData)
    }
    setdataType(true)
  }

  const handleWhispers = (e) => {
    setpassedData(PostData)
    setdataType(false)
  }

  return (
    <div className={styles.notifications}>
      <section className={styles.header1}>
        <SearchBar placeHolder="Search Twitter" className={styles['searchbarTop']}/>
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
        <SearchFeed className="notifeed" data={passedData} dataType={dataType} />
      </div>
    </div>

  );
}

export default Search;
