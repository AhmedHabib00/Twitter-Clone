import React, {
  useState, useEffect,
} from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
import Feed from './Components/Feed';
import styles from './Home.module.css';
import TweetBox from './Components/TweetBox';
import GetPostsArray from '../Services/postServices';

function Home() {
  const [postData, setPostData] = useState([]);
  // // const [loading, setLoading] = useState(true);
  // // const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    (async () => {
      const resp = await GetPostsArray(0);
      if (resp.status === 200) {
        setPostData(resp.data);
        // setLoading(true);
        // setPostData(...new Set([...postData, ...resp.data]));
        // setHasMore(resp.data.length > 0);
      }
      // return { loading, hasMore };
    })();
  }, []);
  // const fetchData = () => {
  //   console.log('hello');
  // };
  return (
    <div className={styles.home} id="Home-page">
      <div className={styles['home-header']}>
        <h2>Home</h2>
      </div>
      <TweetBox placeHolder="What's happening" boxId="home" />
      <hr className={styles['home-hor-hr']} />
      {postData && <Feed className={styles.feed} data={postData} />}
      {/* <InfiniteScroll
        dataLength={postData.length} // This is important field to render the next data
        next={fetchData}
        hasMore
        loader={<h4>Loading...</h4>}
        endMessage={(
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
  )}

      >
        {postData}
      </InfiniteScroll> */}
    </div>
  );
}

export default Home;
