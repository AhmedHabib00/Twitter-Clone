import React from 'react';
import PropTypes from 'prop-types';

import styles from './PopupPage.module.css';

function PopupPage({ trigger, children, SetTrigger }) {
  let toClose = true;
  const closePopup = () => {
    if (toClose) {
      SetTrigger(false);
      document.getElementsByTagName('body')[0].style.setProperty('overflow', 'scroll');
    }
    toClose = true;
  };
  const childClick = () => {
    toClose = false;
  };
  return (trigger) ? (
    <div role="button" tabIndex={0} className={styles['popup-page']} onClick={closePopup}>
      <div role="button" tabIndex={0} className={styles['popup-page-click-detect']} onClick={childClick}>
        {children}
      </div>
    </div>
  ) : '';
}

PopupPage.propTypes = {
  trigger: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  SetTrigger: PropTypes.func.isRequired,
};

export default PopupPage;
