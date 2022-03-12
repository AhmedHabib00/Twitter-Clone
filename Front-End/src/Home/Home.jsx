import React from 'react';
import Feed from './Components/Feed';
import './Home.css';
import TweetBox from './Components/TweetBox';

function Home() {
  return (
    <div className="home">
      <div className="home-header">
        <h2>Home</h2>
      </div>
      <TweetBox />
      <Feed />
    </div>
  );
}
export default Home;
