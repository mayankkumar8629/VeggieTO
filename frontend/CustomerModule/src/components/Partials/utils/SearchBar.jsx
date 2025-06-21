import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState([]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/api/customer/items/search', {
        params: { name: value },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      setResults(response.data); // update search results
    } catch (error) {
      console.error('Error fetching search results:', error.response?.data || error.message);
      setResults([]);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.input
        type="text"
        placeholder="Search fruits, vegetables..."
        value={query}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)} // let user click on results
        className="w-full rounded-full border-2 border-green-500 px-4 py-1 text-gray-800 placeholder-gray-400
                   focus:outline-none focus:border-green-600 focus:shadow-lg transition duration-300"
        initial={{ width: '200px', opacity: 0 }}
        animate={{ width: '100%', opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      <AnimatePresence>
        {focused && results.length > 0 && (
          <motion.ul
            className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {results.map((item) => (
              <li
                key={item._id}
                className="px-4 py-2 hover:bg-green-50 cursor-pointer transition"
              >
                <div className="font-medium text-gray-800">{item.name}</div>
                <div className="text-sm text-gray-500">₹{item.price}</div>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
