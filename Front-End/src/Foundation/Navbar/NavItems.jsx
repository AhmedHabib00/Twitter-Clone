import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './Navbar.css';

const Pages = [{
  name: 'Home',
  icon: <HomeIcon className="icons" />,
},
{
  name: 'Notifications',
  icon: <NotificationsIcon className="icons" />,
}, {
  name: 'Bookmarks',
  icon: <BookmarkBorderIcon className="icons" />,
}, {
  name: 'Lists',
  icon: <FeaturedPlayListIcon className="icons" />,
}, {
  name: 'Profile',
  icon: <PermIdentityIcon className="icons" />,
}, {
  name: 'More',
  icon: <MoreHorizIcon className="icons" />,
},
];

const getPages = () => Pages;

export default getPages;
