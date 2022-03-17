import React from 'react';
import PropTypes from 'prop-types';

import './PopupGif.css';

function PopupGif({ trigger, children }) {
  return (trigger) ? (
    <div className="popup-gif">
      <div className="inner-popup-gif">
        {children}
      </div>
    </div>
  ) : '';
}

PopupGif.propTypes = {
  trigger: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default PopupGif;
