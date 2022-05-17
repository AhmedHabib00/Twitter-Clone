import React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone';
import styles from '../Foundation/Navbar/Navbar.module.css';

const Pages = [{
  name: 'Users',
  icon: <AccountCircleOutlinedIcon className={styles['nav-bar-icons']} />,
  url: 'users',
},
{
  name: 'Blocked users',
  icon: <BlockOutlinedIcon className={styles['nav-bar-icons']} />,
  url: 'blocked-users',
},
{
  name: 'Dashboard',
  icon: <InsertChartOutlinedTwoToneIcon className={styles['nav-bar-icons']} />,
  url: 'dashboard',
},
];

const getAdminPages = () => Pages;

export default getAdminPages;
