/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import './Navbar.css';
import PropTypes from 'prop-types';

import TwitterIcon from '@mui/icons-material/Twitter';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { Link } from 'react-router-dom';

function Navbar({ children, onTwIconClick }) {
  return (
    <div className="nav-bar-main">
      <Link to="Home" className="nav-bar-tw-icon-link" onClick={() => onTwIconClick('Home')}>
        <TwitterIcon className="tw-icon" />

      </Link>
      {children.map((child) => child)}
      <button type="button" className="tweet-button whisp-button-text">Whisp</button>
      <button type="button" className="tweet-button whisp-button-icon"><HistoryEduIcon className="feather-icon" /></button>
    </div>
  );
}
Navbar.propTypes = {
  children: PropTypes.array.isRequired,
  onTwIconClick: PropTypes.func.isRequired,
};
export default Navbar;
