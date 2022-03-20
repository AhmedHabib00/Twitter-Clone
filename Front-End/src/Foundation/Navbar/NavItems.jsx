import React from 'react';
// import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './Navbar.css';

const Pages = [{
  name: 'Home',
  icon: <HomeOutlinedIcon className="nav-bar-icons" />,
},
{
  name: 'Notifications',
  icon: <NotificationsNoneOutlinedIcon className="nav-bar-icons" />,
}, {
  name: 'Bookmarks',
  icon: <BookmarkBorderIcon className="nav-bar-icons" />,
}, {
  name: 'Lists',
  icon: <FeaturedPlayListOutlinedIcon className="nav-bar-icons" />,
}, {
  name: 'Profile',
  icon: <PermIdentityIcon className="nav-bar-icons" />,
}, {
  name: 'More',
  icon: <MoreHorizIcon className="nav-bar-icons" />,
},
];

const getPages = () => Pages;

export default getPages;
