import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import '../Foundation/Navbar/Navbar';

const Pages = [{
  name: 'Home',
  icon: <HomeOutlinedIcon className="nav-bar-icons" />,
},
{
  name: 'Notifications',
  icon: <NotificationsNoneOutlinedIcon className="nav-bar-icons" />,
},
{
  name: 'Search',
  icon: <SearchRoundedIcon className="nav-bar-icons" />,
},
{
  name: 'Bookmarks',
  icon: <BookmarkBorderIcon className="nav-bar-icons" />,
}, {
  name: 'Profile',
  icon: <PermIdentityIcon className="nav-bar-icons" />,
}, {
  name: 'Settings',
  icon: <SettingsOutlinedIcon className="nav-bar-icons" />,
},
];

const getUserPages = () => Pages;

export default getUserPages;
