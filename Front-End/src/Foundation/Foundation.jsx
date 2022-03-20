import { React } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import NavItem from './Navbar/NavItem';
import getPages from './Navbar/NavItems';
import './Foundation.css';
import './Navbar/Navbar.css';
import SearchBar from '../Home/Components/SearchBar';

function Foundation() {
  const pages = getPages();
  const onSearchChange = (value) => {
    console.log(value);
  };
  return (
    <div className="found-margins">
      <div className="foundation">
        <div>
          <Navbar>
            {pages.map((page) => (
              <Link to={`/${page.name}`} key={page.name} className="foundation-a-tag">
                <NavItem title={page.name}>
                  {page.icon}
                </NavItem>
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
