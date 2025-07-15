import React, { useEffect, useRef } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import './SideBar.css';
const SideBar = () => {
  const sidebarRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const vegito = iconRef.current?.parentElement;
    const toggler = iconRef.current;

    const handleClick = () => {
      sidebarRef.current.classList.toggle("expand");
      toggler.classList.toggle("bx-chevrons-right");
      toggler.classList.toggle("bx-chevrons-left");
    };

    if (vegito) vegito.addEventListener("click", handleClick);

    return () => {
      if (vegito) vegito.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="wrapper">
      <aside id="sidebar" ref={sidebarRef}>
        <div className="d-flex justify-content-between p-4">
          <div className="sidebar-logo">
            <a href="#">Veggie To</a>
          </div>
          <button className="toggle-btn border-0" type="button">
            <i id="icon" className="bx bx-chevrons-right" ref={iconRef}></i>
          </button>
        </div>
        <ul className="sidebar-nav">
            <li className="sidebar-item">
                <a href="#" className='sidebar-link'>
                    <i className='bx bxs-user-account' ></i>
                    <span>Profile</span>
                </a>
            </li>
             <li className="sidebar-item">
                <a href="#" className='sidebar-link'>
                    <i className='bx bxs-layer' ></i>
                    <span>Products</span>
                </a>
            </li>
            <li className="sidebar-item collapsed has-dropdown">
                <a href="#" className="sidebar-link" data-bs-toggle="collapse" data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                    <i className='bx bxs-truck'></i>
                    <span>Shipment</span>
                </a>
            </li>
            <li className='sidebar-item'> 
                <a href="#" className="sidebar-link" data-bs-toggle="collapse" data-bs-target="#multi" aria-expanded="false" aria-controls="multi">
                    <i className='bx bxs-bar-chart-alt-2' ></i>
                    <span>Reports</span>
                </a>
                <ul id="multi" className='sidebar-dropdown list-unstyled collapse' data-bs-parent="#sidebar">
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link" data-bs-toggle="collapse" data-bs-target="#multi-two" aria-expanded="false" aria-controls="multi-two">
                            Transactions
                        </a>
                    </li>
                </ul>
            </li>
            <li className="sidebar-item">
                <a href="#" className='sidebar-link'>
                    <i className='bx bxs-bell-ring' ></i>
                    <span>Notification</span>
                </a>
            </li>
            <li className="sidebar-item">
                <a href="#" className='sidebar-link'>
                    <i className='bx bxs-cog' ></i>
                    <span>Setting</span>
                </a>
            </li>
        </ul>
        <div className="sidebar-footer">
            <a href="#" className="sidebar-link">
                <i className='bx bx-log-out' ></i>
                <span>Logout</span>
            </a>
        </div>
      </aside>
      <div className="main">
        <NavBar/>
        <Footer/>
      </div>
    </div>
  );
};

export default SideBar;
