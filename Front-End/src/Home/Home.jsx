import React from 'react';
import Feed from './Components/Feed';
import './Home.module.css';
import TweetBox from './Components/TweetBox';
import Data from './Components/PostData.json';

function Home() {
  return (
    <div className="home">
      <div className="home-header">
        <h2>Home</h2>
      </div>
      <TweetBox className="home-tweetbox" />
      <hr className="home-hor-hr" />
      <Feed className="feed" data={Data} />
    </div>
  );
}
export default Home;
