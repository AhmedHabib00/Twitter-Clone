import React, {
  useState, useEffect,
} from 'react';
import { PropTypes } from 'prop-types';
import Feed from './Components/Feed';
import styles from './Home.module.css';
import TweetBox from './Components/TweetBox';
import GetPostsArray from '../Services/postServices';

function Home({ isBlocked }) {
  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(1);
  const [isEndOfFeed, setisEndOfFeed] = useState(false);

  useEffect(() => {
    (async () => {
      const postsResp = await GetPostsArray(1);
      if (postsResp.status === 200 && postsResp.data !== 'no tweets found') {
        setPostData(postsResp.data);
      } else {
        setisEndOfFeed(true);
      }
    })();
  }, []);

  const updateData = () => {
    (async () => {
      const resp = await GetPostsArray(page + 1);
      setPage(page + 1);
      if (resp.status === 200) {
        if (resp.data !== 'no tweets found') {
          setPostData([...postData, ...resp.data]);
        } else {
          setisEndOfFeed(true);
        }
      }
    })();
  };

  return (
    <div className={styles.home} id="Home-page">
      <div className={styles['home-header']}>
        <h2>Home</h2>
      </div>
      <TweetBox placeHolder="What's happening" boxId="home" canTweet={!isBlocked} />
      <hr className={styles['home-hor-hr']} />
      {postData && (
      <Feed
        className={styles.feed}
        data={postData}
        updateData={updateData}
        canScrollUpdate
        isEndOfFeed={isEndOfFeed}
        isBlocked={isBlocked}
      />
      )}
    </div>
  );
}

Home.propTypes = {
  isBlocked: PropTypes.bool,
};

Home.defaultProps = {
  isBlocked: false,
};

export default Home;
