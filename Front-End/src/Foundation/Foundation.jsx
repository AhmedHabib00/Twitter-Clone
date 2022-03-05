import { React } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import NavItem from './Navbar/NavItem';
import getPages from './Navbar/NavItems';
import './Foundation.css';
import './Navbar/Navbar.css';

function Foundation() {
  const pages = getPages();
  return (
    <div className="found-margins">
      <div className="foundation">
        <Navbar>
          {pages.map((page) => (
            <Link to={`/${page.name}`} key={page.name} className="link-style a-tag">
              <NavItem title={page.name}>
                {page.icon}
              </NavItem>
            </Link>
          ))}
        </Navbar>
        <hr />
        <Outlet />
        <hr />
      </div>
    </div>
  );
}

export default Foundation;