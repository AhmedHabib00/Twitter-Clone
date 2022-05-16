import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import styles from '../Foundation/Navbar/Navbar.module.css';

const Pages = [{
  name: 'Home',
  icon: <HomeOutlinedIcon className={styles['nav-bar-icons']} />,
},
{
  name: 'Notifications',
  icon: <NotificationsNoneOutlinedIcon className={styles['nav-bar-icons']} />,
},
{
  name: 'Search',
  icon: <SearchRoundedIcon className={styles['nav-bar-icons']} />,
},
{
  name: 'Bookmarks',
  icon: <BookmarkBorderIcon className={styles['nav-bar-icons']} />,
}, {
  name: 'Settings',
  icon: <SettingsOutlinedIcon className={styles['nav-bar-icons']} />,
},
];

const getUserPages = () => Pages;

export default getUserPages;
