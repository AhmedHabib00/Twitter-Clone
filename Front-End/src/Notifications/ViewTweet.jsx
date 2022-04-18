import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Home/Components/Feed.module.css';
import Notistyles from './Notifications.module.css';
import data from '../Home/Components/PostData.json';
import Post from '../Home/Components/Post.jsx';
/**
 *
 * @returns shows everything in the notifications component
 * @param {Number} post_id
 */
function ViewTweet({
    post_id,
  }) {

    console.log(props.location.state.post_id)
    const selectedId = ['1', '2'];


    // data = data.filter(post => post.id === 3)
    // console.log(data);

    return (
        <div className={Notistyles.notifications}>
            <section className={Notistyles.header1}>
                Tweet  </section>

            {/* <div>
        <h1>helloooooo</h1>
      </div> */}
            <div>
                {
                    data && data.filter(post => post.id === post_id).map((post) => (
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

ViewTweet.propTypes = {
    post_id: PropTypes.number.isRequired,
};
export default ViewTweet;
