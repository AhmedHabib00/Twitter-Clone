import { React } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchFeedd.module.css';
// import SearchUser from './SearchUser';
// import data from '../../Home/Components/PostData.json';
import Post from '../../Home/Components/Post';

/**
 * @param {array} data array containing our posts.
 * @param {Boolean} dataType
 * @returns map through the post array data and starts passing the posts props
 * to display posts in the feed component.
 */
function SearchFeed({ postData }) {
  //   return (
  //     <div data-testid="feed-render-test" className={styles.notifeed}>
  //       <div className={styles.parent}>
  //         {
  //            UsersData && UsersData.map((Content) => (
  //              <SearchUser
  //                id={Content.id}
  //                name={Content.name}
  //                username={Content.username}
  //                description={Content.description}
  //                profilePic={Content.profilePic}
  //              />
  //            ))
  //             }
  //         <div className={styles.emptyspace} />
  //       </div>
  //     </div>
  //   );

  return (
    <div data-testid="feed-render-test" className={styles.notifeed}>
      <div className={styles.parent} id="FeedContainer">
        {
          postData && postData.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              displayName={post.displayName}
              userName={post.userName}
              content={post.content}
              URLs={post.URLs}
              isLiked={post.isLiked}
              noOfLike={post.noOfLike}
              isRetweeted={post.isRetweeted}
              noOfReplies={post.noOfReplies}
              noOfRetweets={post.noOfRetweets}
              url={post.url}
            />
          ))
      }
        <div className={styles.emptyspace} />
      </div>
    </div>

  );
}
SearchFeed.propTypes = {
  postData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    URLs: PropTypes.arrayOf(PropTypes.string).isRequired,
    isLiked: PropTypes.bool.isRequired,
    noOfLike: PropTypes.number.isRequired,
    isRetweeted: PropTypes.bool.isRequired,
    noOfReplies: PropTypes.number.isRequired,
    noOfRetweets: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
//   UsersData: PropTypes.arrayOf(PropTypes.shape({
//     banned: PropTypes.bool.isRequired,
//     displayName: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//     profilePic: PropTypes.string.isRequired,
//     role: PropTypes.string.isRequired,
//     username: PropTypes.string.isRequired,
//   })).isRequired,
  // dataType: PropTypes.bool.isRequired,
};
export default SearchFeed;
