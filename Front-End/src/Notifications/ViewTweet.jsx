import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
// import styles from '../Home/Components/Feed.module.css';
import Notistyles from './Notifications.module.css';
// import data from '../Home/Components/PostData.json';
import Post from '../Home/Components/Post';
/**
 *
 * @returns shows post or tweet for every notification
 * @param {Number} postid
 */
function ViewTweet() {
//   const navigate = useNavigate();
  const location = useLocation();
  const postidpassed = location.state.entityId;
  // console.log(location.state.postid);
  const [data, setData] = useState();
  useEffect(() => {
    axios.get('http://localhost:8000/posts')
      .then((resp) => {
        setData(resp.data);
      }).catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className={Notistyles.notifications}>
      <section className={Notistyles.header1}>Tweet  </section>
      <div>
        {
                    data && data.filter((post) => post.id === postidpassed).map((post) => (
                      <Post
                        id={post.id}
                        displayname={post.displayname}
                        username={post.username}
                        content={post.content}
                        img1={post.img1}
                        img2={post.img2}
                        img3={post.img3}
                        img4={post.img4}
                      />
                    ))
                }
      </div>
    </div>
  );
}

// ViewTweet.propTypes = {
//   postid: PropTypes.number.isRequired,
// };
export default ViewTweet;
