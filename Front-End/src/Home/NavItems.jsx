import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import '../Foundation/Navbar/Navbar';

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

const getUserPages = () => Pages;

export default getUserPages;
