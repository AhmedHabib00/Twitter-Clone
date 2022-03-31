import React from 'react';

import PropTypes from 'prop-types';
import styles from './NotiFeed.css';
import NotiContent from './NotiContent';

/**
 *
 * @param {array} data array containing our posts.
 *
 * @returns map through the post array data and starts passing the post props
 * to display the posts in the feed component.
 */
function NotiFeed({ data }) {
  // const [anchorEl, setAnchorEl] = useState(null);
  // setAnchorEl(data);
  // console.log(data.contentss[0].displayname);
  return (
    <div data-testid="feed-render-test" className={styles.notifeed}>

      {
        data && data.map((content) => (
          <section className="feedbox1">
            <button className="feedbox2" type="button">
              <NotiContent
                id={content.id}
                displayname={content.displayname}
                content={content.content}
                notitype={content.content}
              />
            </button>
          </section>
        ))
    }

    </div>
  );
}

NotiFeed.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    displayname: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    notitype: PropTypes.string.isRequired,

    // images: PropTypes.arrayOf(PropTypes.shape({
    //   id: PropTypes.number.isRequired, src: PropTypes.string.isRequired,
    // })).isRequired,
  })).isRequired,
};
export default NotiFeed;
