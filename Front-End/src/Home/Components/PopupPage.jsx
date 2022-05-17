import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import styles from './PopupPage.module.css';
/**
 * A customizable component that has a white background where you can add your components.
 * It closes when user clicks outside of white area
 * @param {boolean} trigger tells the PopupPage component to open or closes
 * @param {Element} children elements to render in the popup page
 * @param {Function} SetTrigger setter for trigger
 */
function PopupPage({
  trigger, children, SetTrigger, widthpercentage, isCloseEnabled, isUserSelector,
}) {
  let toClose = true;
  const closePopup = () => {
    if (isCloseEnabled) {
      if (toClose) {
        SetTrigger(false);
      }
      toClose = true;
    }
  };

  const handleCloseIcon = () => {
    SetTrigger(false);
  };
  const childClick = () => {
    toClose = false;
  };

  return (trigger) ? (
    <div role="button" tabIndex={0} className={styles['popup-page']} onClick={closePopup}>
      {document.getElementsByTagName('body')[0].style.setProperty('overflow-y', 'hidden')}
      <div
        id="popup-page-children"
        role="button"
        tabIndex={0}
        className={styles['popup-page-click-detect']}
        onClick={childClick}
        style={{ width: `${widthpercentage}%` }}
      >

        {(isUserSelector)
          ? (
            <div className={styles['horizontal-align']}>
              <CloseIcon className={styles['close-btn']} onClick={handleCloseIcon} />
              <h2 className={styles['tweet-header']}>Replying to</h2>
              <button type="button" className={styles['button-style']} onClick={handleCloseIcon}>Done</button>
            </div>
          ) : (
            <CloseIcon className={styles['close-btn']} onClick={handleCloseIcon} />
          )}

        {children}
      </div>
    </div>
  ) : (<>{ document.getElementsByTagName('body')[0].style.setProperty('overflow-y', 'scroll')}</>);
}

PopupPage.propTypes = {
  trigger: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  SetTrigger: PropTypes.func.isRequired,
  widthpercentage: PropTypes.number,
  isCloseEnabled: PropTypes.bool,
  isUserSelector: PropTypes.bool,
};

PopupPage.defaultProps = {
  widthpercentage: 50,
  isCloseEnabled: true,
  isUserSelector: false,
};

export default PopupPage;
