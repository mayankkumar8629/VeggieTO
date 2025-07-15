import React, { useEffect } from 'react';
import account from '../../assets/account.png';
import Card from './Card';
import './NavBar.css';
const NavBar = () => {
  useEffect(() => {
    const dropdown = document.querySelector('.nav-item.dropdown');
    const dropdownToggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');

    let timeout;

    const showDropdown = () => {
      const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(dropdownToggle);
      bsDropdown.show();
    };

    const hideDropdown = () => {
      const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(dropdownToggle);
      bsDropdown.hide();
    };

    dropdown.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
      showDropdown();
    });

    dropdown.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => {
        hideDropdown();
      }, 200);
    });

    return () => {
      dropdown.removeEventListener('mouseenter', showDropdown);
      dropdown.removeEventListener('mouseleave', hideDropdown);
    };
  }, []);

  return (
    <div className="main">
      <nav className="navbar navbar-expand px-4 py-3">
        <form action="#" className="d-none d-sm-inline-block">
          <div className="input-group input-group-navbar">
            <input
              type="text"
              className="form-control border-0 rounded-0 pe-0"
              placeholder="Search..."
              aria-label="Search"
            />
            <button className="btn border-0 rounded-0" type="button">
              <i className="bx bx-search"></i>
            </button>
          </div>
        </form>

        <div className="navbar-collapse collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className="nav-icon dropdown-toggle pe-md-0"
                id="accountDropdown"
              >
                <img src={account} className="avatar img-fluid" alt="account" />
              </a>

              <div
                className="dropdown-menu dropdown-menu-end rounded-0 border-0 shadow mt-3"
                aria-labelledby="accountDropdown"
              >
                <a href="#" className="dropdown-item">
                  <i className="bx bxs-user-account"></i>
                  <span> My Profile</span>
                </a>
                <a href="#" className="dropdown-item">
                  <i className="bx bx-cog"></i>
                  <span> Setting</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <i className="bx bx-help-circle"></i>
                  <span> Help Center</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <Card />
    </div>
  );
};

export default NavBar;

