import { React, useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

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
function Foundation() {
  const pages = getUserPages();
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

  return (
    <div className={styles['found-margins']}>
      <div className={styles.foundation}>
        <div>
          <Navbar onTwIconClick={onNavItemClick} route="Home">
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
          </Navbar>
        </div>
        <div className={styles.outlet}>
          <Outlet />
        </div>

        <PopupPage trigger={isPopupTweetOpen} SetTrigger={setIsPopupTweetOpen}>
          <TweetBox placeHolder="What's happening" />
        </PopupPage>

        <div className={styles['foundation-widget']}>
          <SearchBar searchValue={onSearchChange} placeHolder="Search Twitter" />
        </div>

      </div>
    </div>
  );
}

export default Foundation;
