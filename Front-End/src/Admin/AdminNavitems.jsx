import React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone';
import '../Foundation/Navbar/Navbar';

const Pages = [{
  name: 'Users',
  icon: <AccountCircleOutlinedIcon className="nav-bar-icons" />,
  url: 'users',
},
{
  name: 'Blocked users',
  icon: <BlockOutlinedIcon className="nav-bar-icons" />,
  url: 'blocked-users',
},
{
  name: 'Dashboard',
  icon: <InsertChartOutlinedTwoToneIcon className="nav-bar-icons" />,
  url: 'dashboard',
},
];

const getAdminPages = () => Pages;

export default getAdminPages;
