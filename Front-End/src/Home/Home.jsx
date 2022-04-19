// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Feed from './Components/Feed';
// import styles from './Home.module.css';
// import TweetBox from './Components/TweetBox';

// function Home() {
//   const [data, setData] = useState();

//   useEffect(() => {
//     axios.get('http://localhost:8000/posts')
//       .then((resp) => {
//         setData(resp.data);
//       }).catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <div className={styles.home}>
//       <div className={styles['home-header']}>
//         <h2>Home</h2>
//       </div>
//       <TweetBox placeHolder="What's happening" boxId="home" />
//       <hr className={styles['home-hor-hr']} />
//       <Feed className={styles.feed} data={data} />
//     </div>
//   );
// }

// export default Home;


import React from 'react';
import Feed from './Components/Feed';
import styles from './Home.module.css';
import TweetBox from './Components/TweetBox';
import Data from './Components/PostData.json';

/**
 * consists of 3 main components.
 * Header, Tweetbox, Feed
 */
function Home() {
  return (
    <div className={styles.home}>
      <div className={styles['home-header']}>
        <h2>Home</h2>
      </div>
      <TweetBox />
      <hr className={styles['home-hor-hr']} />
      <Feed className={styles.feed} data={Data} />
    </div>
  );
}

export default Home;
