import PropTypes from 'prop-types';

import { React } from 'react';
import './Navbar.css';

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
