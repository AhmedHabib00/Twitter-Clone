/* eslint-disable react/forbid-prop-types */
import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import './Navbar.css';
import PropTypes from 'prop-types';

function Navbar({ children }) {
  return (
    <div className="main">
      <TwitterIcon className="tw-icon" />
      {children.map((child) => child)}
      <button type="button" className="icons tweet-button">Tweet</button>
    </div>
  );
}
Navbar.propTypes = {
  children: PropTypes.array.isRequired,
};
export default Navbar;
