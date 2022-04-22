import PropTypes from 'prop-types';

import { React } from 'react';
import './Navbar.css';
/**
 * Button that displays an icon and text.
 * Usually used for the navbar component
 * @param {String} title title of the button
 * @param {Element} children icon displayed besides the button
 */
function NavItem({ title, children }) {
  return (
    <div className="nav-item nav-item-dimensions">
      {children}
      <p className="nav-item-text">{title}</p>
    </div>
  );
}

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default NavItem;
