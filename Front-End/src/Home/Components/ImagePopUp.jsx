import React from 'react';
import './ImagePopUp.css';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

function ImagePopUp({ trigger, setTrigger, children }) {
  return (trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <CloseIcon className="close-btn" onClick={() => { setTrigger(false); }} />
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
