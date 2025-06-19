import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Slider } from './utils/Slider';
import { ProductCard } from './utils/ProductCard';
import { FaSlidersH } from 'react-icons/fa';

export const ProductArea = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState(1000);
  const [cartItems, setCartItems] = useState([]);

  const token = sessionStorage.getItem('token');
  const categoryOptions = ['fruits', 'vegetables', 'groceries', 'dairy', 'beverages', 'eggs-meat'];

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await axios.get('http://localhost:3000/api/customer/items/getItemsByCategory', {
        params: { category },
        headers: { Authorization: `Bearer ${token}` }
      });

      const updated = response.data.map((product) => ({
        ...product,
        images: "https://picsum.photos/800"
      }));

      return updated;
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      return [];
    }
  };

  const fetchInitialProducts = async () => {
    const initialCategory = 'fruits';
    const initialProducts = await fetchProductsByCategory(initialCategory);
    setProducts(initialProducts);
    setCategories([initialCategory]);
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/customer/cart/getCart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(response.data.cart.items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchInitialProducts();
    fetchCartItems();
  }, []);

  const handleCategoryChange = async (e) => {
    const value = e.target.value;
    const isChecked = categories.includes(value);

    if (isChecked) {
      setCategories((prev) => prev.filter((cat) => cat !== value));
      setProducts((prev) => prev.filter((product) => product.category !== value));
    } else {
      const newProducts = await fetchProductsByCategory(value);
      setCategories((prev) => [...prev, value]);
      setProducts((prev) => [...prev, ...newProducts]);
    }
  };

  const handlePriceChange = (value) => setPrice(value);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    console.log('Filters applied:', { categories, price });
    // Add price filtering logic here if needed
  };

  const handleClearFilters = () => {
    setCategories([]);
    setPrice(1000);
    setProducts([]);
  };

  return (
    <div className="flex flex-row max-w-[95%] mx-auto justify-center gap-4">
      {/* Sidebar */} 
<div className="hidden mt-4 sm:flex flex-col w-1/4 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto border-r border-gray-200 bg-white shadow-sm">
  {/* Filters Header */}
  <div className="flex items-center justify-between p-4 border-b border-gray-300">
    <div className="flex items-center gap-2">
      <FaSlidersH className="text-gray-700" />
      <span className="text-xl font-semibold">Filters</span>
    </div>
    <button
      type="button"
      className="text-sm text-blue-500 hover:underline"
      onClick={handleClearFilters}
    >
      Clear
    </button>
  </div>

  {/* Filter Form */}
  <form className="flex flex-col p-4 gap-4" onSubmit={handleFilterSubmit}>
    <div>
      <h3 className="text-lg font-semibold mb-2">Categories</h3>
      {categoryOptions.map((cat) => (
        <label key={cat} className="flex items-center cursor-pointer py-1">
          <input
            type="checkbox"
            value={cat}
            checked={categories.includes(cat)}
            onChange={handleCategoryChange}
            className="h-5 w-5 rounded-md border border-gray-400 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-3 capitalize text-gray-700">{cat.replace('-', ' & ')}</span>
        </label>
      ))}
    </div>

    <div>
      <label className="block text-lg font-semibold mb-2">Filter by Price</label>
      <Slider value={price} onChange={handlePriceChange} />
    </div>

    <input
      type="submit"
      value="Apply Filters"
      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded w-fit mt-2"
    />
  </form>
</div>


      {/* Product Display Area */}
      <div className="flex-1 mt-4">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                cart={cartItems}
                id={product._id}
                Image={product.images}
                Name={product.name}
                Category={product.category}
                price={product.price}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
