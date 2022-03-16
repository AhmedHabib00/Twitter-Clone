import React from 'react';
import './Feed.css';
import Post from './Post';

function Feed() {
  return (
    <div className="feed">
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default Feed;
