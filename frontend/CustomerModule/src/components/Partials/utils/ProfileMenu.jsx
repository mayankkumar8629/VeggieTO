// src/components/ProfileMenu.jsx
import React, { useState, useEffect, useRef } from 'react';
import { MdOutlinePerson, MdOutlineShoppingCart } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

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
    window.location.reload();
  };

  return (
    <div className="relative flex items-center gap-4" ref={menuRef}>
      {/* Profile Icon */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center cursor-pointer shadow-md"
        onClick={() => setOpen(prev => !prev)}
      >
        <MdOutlinePerson className="text-white w-5 h-5" />
      </motion.div>

      

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-2xl z-50 overflow-hidden"
          >
            <ul className="divide-y divide-gray-100 text-sm text-gray-700">
              {[
                { name: "My Profile", path: "/profile" },
                { name: "My Orders", path: "/orders" },
                { name: "Settings", path: "/settings" },
                { name: "Support", path: "/support" },
              ].map(({ name, path }) => (
                <li
                  key={name}
                  className="px-4 py-3 hover:bg-green-50 cursor-pointer transition"
                  onClick={() => {
                    navigate(path);
                    setOpen(false);
                  }}
                >
                  {name}
                </li>
              ))}
              <li
                className="px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer transition"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileMenu;
