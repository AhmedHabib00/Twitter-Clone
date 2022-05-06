import { React, useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Navbar from './Navbar/Navbar';
import NavItem from './Navbar/NavItem';
import getUserPages from '../Home/NavItems';
import SearchBar from '../Components/SearchBar/SearchBar';
import PopupPage from '../Home/Components/PopupPage';
import TweetBox from '../Home/Components/TweetBox';

import styles from './Foundation.module.css';
import navStyles from './Navbar/Navbar.module.css';
/**
 * The main layout for a normal user that logs in.
 * It displays the navbar, opened page, widgets.
 * The navbar is not scrollable
 */
function Foundation({ setIsLoggedIn, userInfo }) {
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
    console.log(id);
    if (id !== 'Search')document.getElementById('SearchBar').style.visibility = 'visible';

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
                    className={[navStyles['foundation-a-tag'], navStyles[(page.name === 'Search') ? 'disable-nav-item' : '']].join(' ')}
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
                  className={[navStyles['tweet-button'], navStyles['whisp-button-text']].join(' ')}
                  onClick={() => setIsPopupTweetOpen(true)}
                >
                  Whisp
                </button>
                <button
                  type="button"
                  aria-label="save"
                  className={[navStyles['tweet-button'], navStyles['whisp-button-icon']].join(' ')}
                  onClick={() => setIsPopupTweetOpen(true)}
                >
                  <HistoryEduIcon className={navStyles['feather-icon']} />
                </button>
              </div>
              <div
                className={styles['user-menu']}
                role="button"
                tabIndex={0}
                onClick={handleLogOut}
              >
                <div className={styles['user-menu-info']}>
                  <AccountCircleIcon className={navStyles['nav-bar-profile']} />
                  <div className={styles['user-menu-text-container']}>
                    <h1 className={styles['user-menu-text']}>
                      {(userInfo.displayName.length >= 9) ? `${userInfo.displayName.substring(0, 10)}...` : userInfo.displayName}
                    </h1>
                    <h2 className={[styles['user-menu-text'], styles['user-menu-text-name']].join(' ')}>
                      @
                      {(userInfo.username.length >= 12) ? `${userInfo.username.substring(0, 11)}...` : userInfo.username}
                    </h2>
                  </div>
                </div>
                <MoreHorizIcon className={styles['user-menu-more']} />
              </div>
            </div>
          </Navbar>
        </div>
        <div className={styles.outlet}>
          {console.log('dfsdd')}
          <Outlet />
        </div>

        <PopupPage trigger={isPopupTweetOpen} SetTrigger={setIsPopupTweetOpen}>
          <TweetBox placeHolder="What's happening" boxId="foundation" />
        </PopupPage>

        <div className={styles['foundation-widget']} id="SearchBar">
          <SearchBar searchValue={onSearchChange} placeHolder="Search Twitter" delay={2000} />
        </div>

      </div>
    </div>
  );
}

Foundation.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    Birthdate: PropTypes.string.isRequired,
    'Cover Photo': PropTypes.string.isRequired,
    'Profile Picture': PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
};

Foundation.defaultProps = {
  userInfo: {
    Birthdate: '',
    'Cover Photo': '',
    'Profile Picture': '',
    displayName: '',
    username: '',
  },
};

export default Foundation;
