import React, { useEffect, useState } from 'react';
import Feed from '../Home/Components/Feed';
import { getBookMarks } from '../Services/UserServices';
import styles from './Bookmarks.module.css';

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState();
  useEffect(() => {
    (async () => {
      const bookmarksResp = await getBookMarks();
      if (bookmarksResp.status === 200) {
        setBookmarks(bookmarksResp.data);
      }
    })();
  }, []);
  return (
    <div className={styles.bookmarks}>
      {bookmarks && <Feed data={bookmarks} />}
    </div>
  );
}
export default Bookmarks;
