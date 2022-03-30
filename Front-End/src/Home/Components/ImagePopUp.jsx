import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import styles from './ImagePopUp.module.css';

/**
 *
 * @param {boolean} trigger
 * @param {function} setTrigger
 * @param {elements} childern
 *
 * @returns div element which will contain popUp including close-icon
 * and passed childern
 */
function ImagePopUp({ trigger, setTrigger, children }) {
  return (trigger) ? (
    <div data-testid="image-render-test" className={styles.popup}>
      <div className={styles['popup-inner']}>
        <CloseIcon className={styles['close-btn']} onClick={() => { setTrigger(false); }} />
        {children}
      </div>
    </div>
  ) : '';
}

ImagePopUp.propTypes = {
  trigger: PropTypes.bool.isRequired,
  setTrigger: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
export default ImagePopUp;
