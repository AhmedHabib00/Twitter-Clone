import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './AdminFoundation.module.css';

import Navbar from '../Foundation/Navbar/Navbar';
import getAdminPages from './AdminNavitems';
import NavItem from '../Foundation/Navbar/NavItem';

/**
 * The main layout for a user logged in as admin.
 * It displays the navbar and opened page.
 */
function AdminFoundation({ setIsLoggedIn }) {
  const pages = getAdminPages();
  const navigate = useNavigate();
  const [openedPage, setOpenedPage] = useState('users');

  useEffect(() => {
    document.getElementById(openedPage).style.setProperty('font-weight', 'bolder');
  }, [openedPage]);

  const onNavItemClick = (id) => {
    document.getElementById(openedPage).style.setProperty('font-weight', '400');
    document.getElementById(id).style.setProperty('font-weight', 'bolder');
    setOpenedPage(id);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.clear();
    navigate('/');
  };
  return (
    <div className={styles['admin-foundation']} id="admin-foundation">
      <Navbar route="" onTwIconClick={handleLogOut}>
        <div>
          {
            pages.map((page) => (
              <Link
                to={`/${page.url}`}
                key={page.url}
                className="foundation-a-tag"
              >
                <div
                  id={page.url}
                  onClick={() => onNavItemClick(page.url)}
                  role="button"
                  tabIndex={0}
                >
                  <NavItem title={page.name}>
                    {page.icon}
                  </NavItem>
                </div>
              </Link>
            ))
          }
        </div>
      </Navbar>
      <Outlet />
    </div>
  );
}

AdminFoundation.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default AdminFoundation;
