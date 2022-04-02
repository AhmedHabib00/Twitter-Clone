import React from 'react';
import PropTypes from 'prop-types';
import styles from './NotiFeed.module.css';
import NotiContent from './NotiContent';
/**
 * @param {array} data array containing our notifications.
 * @returns map through the post array data and starts passing the notifications props
 * to display the notifications in the feed component.
 */
function NotiFeed({ data }) {
  return (
    <div data-testid="notifeed-render-test" className={styles.notifeed}>

      {
        data && data.map((content) => (
          <section className={styles.feedbox1}>
            <button className={styles.feedbox2} type="button">
              <NotiContent
                id={content.id}
                displayname={content.displayname}
                content1={content.content1}
                content11={content.content11}
                content2={content.content2}
                content22={content.content22}
                content3={content.content3}
                content4={content.content4}
                content5={content.content5}
                content55={content.content55}
                content6={content.content6}
                notitype={content.notitype}
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
    content1: PropTypes.string.isRequired,
    content11: PropTypes.string.isRequired,
    content2: PropTypes.string.isRequired,
    content22: PropTypes.string.isRequired,
    content3: PropTypes.string.isRequired,
    content4: PropTypes.string.isRequired,
    content5: PropTypes.string.isRequired,
    content55: PropTypes.string.isRequired,
    content6: PropTypes.string.isRequired,
    notitype: PropTypes.string.isRequired,
  })).isRequired,
};
export default NotiFeed;
