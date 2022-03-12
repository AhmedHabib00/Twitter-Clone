import React from 'react';
import './Feed.css';
import Post from './Post';

function Feed() {
  return (
    <div className="feed">
      <div className="feedheader">
        <h2>Home</h2>
      </div>

      <Post />
    </div>
  );
}

export default Feed;
