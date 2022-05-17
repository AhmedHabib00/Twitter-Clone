import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import styles from './ImagePopUp.module.css';

/**
 *
 * @param {boolean} trigger     flag to see if the user has clicked on the image.
 * @param {function} setTrigger function that set trigger to false when the user click close.
 * @param {elements} childern   elements which will whole/display post's image in.
 *
 * @returns div element which will contain popUp including close-icon
 * and passed childern
 */
function ImagePopUp({ trigger, setTrigger, children }) {
  return (trigger) ? (

    <div data-testid="image-render-test" className={styles.popup} id="image-pop-up-page">
      {document.getElementsByTagName('body')[0].style.setProperty('overflow-y', 'hidden')}
      <div className={styles['popup-inner']}>
        <CloseIcon
          className={styles['close-btn']}
          onClick={() => {
            setTrigger(false);
          }}
        />
        {children}
      </div>
    </div>

  ) : (<>{ document.getElementsByTagName('body')[0].style.setProperty('overflow-y', 'scroll')}</>);
}

ImagePopUp.propTypes = {
  trigger: PropTypes.bool.isRequired,
  setTrigger: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
export default ImagePopUp;
