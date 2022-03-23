import { React, useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import NavItem from './Navbar/NavItem';
import getPages from './Navbar/NavItems';
import './Foundation.css';
import './Navbar/Navbar.css';
import SearchBar from '../Home/Components/SearchBar';

function Foundation() {
  const pages = getPages();
  const [openedPage, setOpenedPage] = useState('Home');
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
    <div className="found-margins">
      <div className="foundation">
        <div>
          <Navbar onTwIconClick={onNavItemClick}>
            {pages.map((page) => (
              <Link
                to={`/${page.name}`}
                key={page.name}
                onClick={() => onNavItemClick(page.name)}
                className="foundation-a-tag"
              >
                <div className="nav-item-bold" id={page.name}>
                  <NavItem title={page.name}>
                    {page.icon}
                  </NavItem>
                </div>
              </Link>
            ))}
          </Navbar>
        </div>
        <div className="outlet">
          <Outlet />
        </div>

        <div className="foundation-widget">
          <SearchBar searchValue={onSearchChange} placeHolder="Search Twitter" />
        </div>

      </div>
    </div>
  );
}

export default Foundation;
