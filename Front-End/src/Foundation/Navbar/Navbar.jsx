import React from 'react';
import './Navbar.css';
import PropTypes from 'prop-types';

import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';

function Navbar({ children, onTwIconClick, route }) {
  return (
    <div className="nav-bar-main">
      <Link to={route} className="nav-bar-tw-icon-link" onClick={() => onTwIconClick(route)}>
        <TwitterIcon className="tw-icon" />

      </Link>
      {children}
    </div>
  );
}
Navbar.propTypes = {
  children: PropTypes.element.isRequired,
  onTwIconClick: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired,
};
export default Navbar;
