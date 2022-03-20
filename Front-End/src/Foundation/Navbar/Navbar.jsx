/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import './Navbar.css';
import PropTypes from 'prop-types';

import TwitterIcon from '@mui/icons-material/Twitter';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

function Navbar({ children }) {
  return (
    <div className="nav-bar-main">
      <TwitterIcon className="tw-icon" />
      {children.map((child) => child)}
      <button type="button" className="tweet-button whisp-button-text">Whisp</button>
      <button type="button" className="tweet-button whisp-button-icon"><HistoryEduIcon className="feather-icon" /></button>
    </div>
  );
}
Navbar.propTypes = {
  children: PropTypes.array.isRequired,
};
export default Navbar;
