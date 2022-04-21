import { React, useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Navbar from './Navbar/Navbar';
import NavItem from './Navbar/NavItem';
import getUserPages from '../Home/NavItems';
import SearchBar from '../Search/SearchBar/SearchBar';
import PopupPage from '../Home/Components/PopupPage';
import TweetBox from '../Home/Components/TweetBox';

import styles from './Foundation.module.css';
import './Navbar/Navbar.css';
/**
 * The main layout for a normal user that logs in.
 * It displays the navbar, opened page, widgets.
 * The navbar is not scrollable
 */
function Foundation({ setIsLoggedIn }) {
  const pages = getUserPages();
  const navigate = useNavigate();
  const [openedPage, setOpenedPage] = useState('Home');
  const [isPopupTweetOpen, setIsPopupTweetOpen] = useState(false);
  useEffect(() => {
    document.getElementById(openedPage).style.setProperty('font-weight', 'bolder');
  }, [openedPage]);
  const onSearchChange = (value) => {
    console.log(value);
  };

  const onNavItemClick = (id) => {
    document.getElementById(openedPage).style.setProperty('font-weight', '400');
    document.getElementById(id).style.setProperty('font-weight', 'bolder');
    setOpenedPage(id);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className={styles['found-margins']}>
      <div className={styles.foundation}>
        <div>
          <Navbar onTwIconClick={onNavItemClick} route="Home">
            <div className={styles['navbar-container']}>
              <div>
                {pages.map((page) => (
                  <Link
                    to={`/${page.name}`}
                    key={page.name}
                    onClick={() => onNavItemClick(page.name)}
                    className={`foundation-a-tag ${(page.name === 'Search') ? 'disable-nav-item' : ''}`}
                  >
                    <div id={page.name}>
                      <NavItem title={page.name}>
                        {page.icon}
                      </NavItem>
                    </div>
                  </Link>
                ))}
                <button
                  type="button"
                  className="tweet-button whisp-button-text"
                  onClick={() => setIsPopupTweetOpen(true)}
                >
                  Whisp

                </button>
                <button
                  type="button"
                  aria-label="save"
                  className="tweet-button whisp-button-icon"
                  onClick={() => setIsPopupTweetOpen(true)}
                >
                  <HistoryEduIcon className="feather-icon" />
                </button>
              </div>
              <div
                className={styles['user-menu']}
                role="button"
                tabIndex={0}
                onClick={handleLogOut}
              >
                <div className={styles['user-menu-info']}>
                  <AccountCircleIcon className="nav-bar-profile" />
                  <div className={styles['user-menu-text-container']}>
                    <h1 className={styles['user-menu-text']}>
                      Amr Zayed
                    </h1>
                    <h2 className={[styles['user-menu-text'], styles['user-menu-text-name']].join(' ')}>
                      @AmrZayed
                    </h2>
                  </div>
                </div>
                <MoreHorizIcon className={styles['user-menu-more']} />
              </div>
            </div>
          </Navbar>
        </div>
        <div className={styles.outlet}>
          <Outlet />
        </div>

        <PopupPage trigger={isPopupTweetOpen} SetTrigger={setIsPopupTweetOpen}>
          <TweetBox placeHolder="What's happening" boxId="foundation" />
        </PopupPage>

        <div className={styles['foundation-widget']}>
          <SearchBar searchValue={onSearchChange} placeHolder="Search Twitter" />
        </div>

      </div>
    </div>
  );
}

Foundation.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Foundation;
