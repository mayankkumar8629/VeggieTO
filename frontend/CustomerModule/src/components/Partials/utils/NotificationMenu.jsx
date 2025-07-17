// src/components/NotificationMenu.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Bell, Package, ShoppingCart, User, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationMenu = ({ notifications = 0, notificationData = [] }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  // Function to format timestamp to relative time
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMs = now - notificationTime;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return notificationTime.toLocaleDateString();
    }
  };

  // Function to determine notification type and icon based on message content
  const getNotificationDetails = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('delivery') || lowerMessage.includes('delivered')) {
      return {
        type: 'delivery',
        icon: Package,
        color: 'text-blue-500',
        title: 'Delivery Update'
      };
    } else if (lowerMessage.includes('order') || lowerMessage.includes('shipped')) {
      return {
        type: 'order',
        icon: ShoppingCart,
        color: 'text-green-500',
        title: 'Order Update'
      };
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('paid')) {
      return {
        type: 'payment',
        icon: AlertCircle,
        color: 'text-orange-500',
        title: 'Payment Update'
      };
    } else if (lowerMessage.includes('profile') || lowerMessage.includes('account')) {
      return {
        type: 'account',
        icon: User,
        color: 'text-purple-500',
        title: 'Account Update'
      };
    } else {
      return {
        type: 'general',
        icon: Bell,
        color: 'text-gray-500',
        title: 'Notification'
      };
    }
  };

  // Process notification data to add IDs and details
  const processedNotifications = notificationData.map((notification, index) => ({
    id: index + 1,
    message: notification.message,
    timestamp: notification.timestamp,
    time: formatTimeAgo(notification.timestamp),
    read: false, // You can modify this based on your read/unread logic
    ...getNotificationDetails(notification.message)
  }));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notification) => {
    // Handle notification click - you can navigate to specific pages based on type
    switch (notification.type) {
      case 'delivery':
      case 'order':
        navigate('/orders');
        break;
      case 'account':
        navigate('/profile');
        break;
      case 'payment':
        navigate('/billing');
        break;
      default:
        break;
    }
    setOpen(false);
  };

  const markAllAsRead = () => {
    // Implement mark all as read functionality
    console.log('Mark all notifications as read');
    setOpen(false);
  };

  const clearAll = () => {
    // Implement clear all notifications functionality
    console.log('Clear all notifications');
    setOpen(false);
  };

  return (
    <div className="relative flex items-center" ref={menuRef}>
      {/* Notification Bell */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-pointer"
        onClick={() => setOpen(prev => !prev)}
      >
        <div className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
          <Bell className="w-6 h-6 text-gray-600 hover:text-green-600" />
        </div>
        {notifications > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {notifications}
          </span>
        )}
      </motion.div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 mt-2 w-80 bg-white border border-gray-200 shadow-xl rounded-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-green-600 hover:text-green-700 font-medium"
                  >
                    Mark all read
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={clearAll}
                    className="text-xs text-red-500 hover:text-red-600 font-medium"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {processedNotifications.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                  {processedNotifications.map((notification) => {
                    const IconComponent = notification.icon;
                    return (
                      <li
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start space-x-3">
                          {/* Icon */}
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            !notification.read ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            <IconComponent className={`w-4 h-4 ${notification.color}`} />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className={`text-sm font-medium ${
                                !notification.read ? 'text-gray-900' : 'text-gray-700'
                              }`}>
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center mt-1">
                              <Clock className="w-3 h-3 text-gray-400 mr-1" />
                              <span className="text-xs text-gray-400">
                                {notification.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="px-4 py-8 text-center">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">No notifications yet</p>
                  <p className="text-gray-400 text-xs mt-1">
                    We'll notify you when something happens
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {processedNotifications.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={() => {
                    navigate('/notifications');
                    setOpen(false);
                  }}
                  className="w-full text-center text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  View all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationMenu;