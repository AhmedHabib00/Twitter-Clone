import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import styles from './ImagePopUp.module.css';

function ImagePopUp({ trigger, setTrigger, children }) {
  return (trigger) ? (
    <div className={styles.popup}>
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
