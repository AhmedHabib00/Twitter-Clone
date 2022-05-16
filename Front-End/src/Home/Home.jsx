import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Feed from './Components/Feed';
import styles from './Home.module.css';
import TweetBox from './Components/TweetBox';
import GetPostsArray from '../Services/postServices';

function Home() {
  const [postData, setPostData] = useState();

  useEffect(() => {
    (async () => {
      const resp = await GetPostsArray();
      if (resp.status === 200) {
        setPostData(resp.data);
      }
    })();
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles['home-header']}>
        <h2>Home</h2>
      </div>
      <TweetBox placeHolder="What's happening" boxId="home" />
      <hr className={styles['home-hor-hr']} />
      <Feed className={styles.feed} data={postData} />
    </div>
  );
}

export default Home;
// import Feed from './Components/Feed';
// import styles from './Home.module.css';
// import TweetBox from './Components/TweetBox';
// import Data from './Components/PostData.json';

// /**
//  * consists of 3 main components.
//  * Header, Tweetbox, Feed
//  */
// function Home() {
//   return (
//     <div className={styles.home}>
//       <div className={styles['home-header']}>
//         <h2>Home</h2>
//       </div>
//       <TweetBox />
//       <hr className={styles['home-hor-hr']} />
//       <Feed className={styles.feed} data={Data} />
//     </div>
//   );
// }

// export default Home;
