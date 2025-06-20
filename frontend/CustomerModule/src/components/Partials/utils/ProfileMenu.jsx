// src/components/ProfileMenu.jsx
import React, { useState, useEffect, useRef } from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate("/");
  };

  return (
    <div className="relative flex items-center gap-4" ref={menuRef}>
      <CgProfile
        size={30}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      <Link to="/cart">
        <MdOutlineShoppingCart size={30} className="cursor-pointer" />
      </Link>

      {open && (
        <div className="absolute right-0 top-10 mt-1 w-48 bg-white shadow-md rounded-lg border z-50">
          <ul className="text-sm text-gray-700 py-2">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => { navigate('/profile'); setOpen(false); }}
            >
              My Profile
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => { navigate('/orders'); setOpen(false); }}
            >
              My Orders
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => { navigate('/settings'); setOpen(false); }}
            >
              Settings
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => { navigate('/support'); setOpen(false); }}
            >
              Support
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
