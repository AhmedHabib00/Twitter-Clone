import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchFeed.module.css';
import SearchUser from './SearchUser';
import data from '../../Home/Components/PostData.json';
import Post from '../../Home/Components/Post.jsx';

/**
 * @param {array} data array containing our notifications.
 * @param {Boolean} dataType
 * @returns map through the post array data and starts passing the notifications props
 * to display the notifications in the feed component.
 */
function SearchFeed({ data, dataType }) {

    console.log(dataType);

    if (dataType) {
        return (
            <div data-testid="notifeed-render-test" className={styles.notifeed}>
                <div data-testid="noticontent-render-test" className={styles.parent} >
                    {
                        data && data.map((content) => (
                            <SearchUser
                                profile_id={content.id}
                                displayname={content.displayName}
                                username={content.userName}
                                description={content.description}
                                url={content.url}
                            />
                        ))
                    }
                    <div className={styles.emptyspace}>
                    </div>
                </div>
            </div>
        );
    }

    else {
        return (
            <div data-testid="notifeed-render-test" className={styles.notifeed}>
                <div data-testid="noticontent-render-test" className={styles.parent} id="FeedContainer">
                    {
                        data && data.map((content) => (
                            <Post
                            id={content.id}
                            displayname={content.displayName}
                            username={content.userName}
                            content={content.content}
                            img1={content.img1}
                            img2={content.img2}
                            img3={content.img3}
                            img4={content.img4}
                            isLiked={content.isLiked}
                            noOfLike={content.noOfLike}
                            isRetweeted={content.isRetweeted}
                            noOfReplies={content.noOfReplies}
                            noOfRetweets={content.noOfRetweets}
                            />
                        ))
                    }
                    <div className={styles.emptyspace}>
                    </div>
                </div>
            </div>

        );
    }

}
SearchFeed.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        profile_id: PropTypes.number.isRequired,
        displayname: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    })).isRequired,
    dataType: PropTypes.string.isRequired,
};
export default SearchFeed;
