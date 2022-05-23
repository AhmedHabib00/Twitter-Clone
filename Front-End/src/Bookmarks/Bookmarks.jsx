import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Feed from '../Home/Components/Feed';
import { getBookMarks } from '../Services/UserServices';
import styles from './Bookmarks.module.css';
/**
 * This page is used to show the bookmarked (saved) tweets of the user
 * @param {string} username this is the username of the account owner
 * @returns a lfeed containing the tweets the user bookmarked
 */
function Bookmarks({ username }) {
  const [bookmarks, setBookmarks] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const bookmarksResp = await getBookMarks();
      if (bookmarksResp.status === 200) {
        setBookmarks(bookmarksResp.data.data);
      }
      setIsLoading(false);
    })();
  }, []);
  return (
    <div id="bookmark-page">
      <div className={styles['bookmarks-header']}>
        <h2>Bookmarks</h2>
        <h2 className={styles['user-menu-text-name']}>
          @
          {(username !== '' && username.length >= 12) ? `${username.substring(0, 11)}...` : username}

        </h2>
      </div>
      <div className={styles.bookmarks}>
        {bookmarks && <Feed data={bookmarks} canScrollUpdate={isLoading} />}
      </div>
    </div>
  );
}
export default Bookmarks;
Bookmarks.propTypes = {
  username: PropTypes.string,
};

Bookmarks.defaultProps = {
  username: '',
};
