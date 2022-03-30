import React from 'react';
import './Navbar.css';
import PropTypes from 'prop-types';

import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';
/**
 * custom navbar component that fits the theme of twitter
 * @param {element} children elements to show in the navbar
 * @param {Function} onTwIconClick takes a specific route to a page and Reroute the user t this page
 * @param {String} route route to the page when twitter icon is clicked
 */
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
