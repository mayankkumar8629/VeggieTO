import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Slider } from './utils/Slider';
import { ProductCard } from './utils/ProductCard';
import { FaSlidersH } from 'react-icons/fa';

export const ProductArea = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState(2000);
  const [cartItems, setCartItems] = useState([]);
   const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(900);
  const [allProducts, setAllProducts] = useState([]);


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
  setAllProducts(initialProducts); // Store full data
  setProducts(initialProducts);    // Display full initially
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
    const newCategories = categories.filter((cat) => cat !== value);
    setCategories(newCategories);

    const filtered = allProducts.filter((product) =>
      newCategories.includes(product.category)
    );
    setProducts(filtered);
  } else {
    const newProducts = await fetchProductsByCategory(value);
    const newCategories = [...categories, value];

    const updatedAll = [...allProducts, ...newProducts];
    setAllProducts(updatedAll); // update master list

    const filtered = updatedAll.filter((product) =>
      newCategories.includes(product.category)
    );
    setProducts(filtered);
    setCategories(newCategories);
  }
};


 const handlePriceFilterChange = () => {
  const filtered = allProducts.filter(
    (product) =>
      categories.includes(product.category) &&
      product.price >= minValue &&
      product.price <= maxValue
  );
  setProducts(filtered);
};

const handleFilterSubmit = (e) => {
  e.preventDefault();
  handlePriceFilterChange(); // Reuse the same filtering logic
};


 const handleClearFilters = () => {
  setCategories([]);
  setMinValue(0);
  setMaxValue(1000);
  setProducts(allProducts); // Show full data again
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
      className="text-sm text-[#4caf50] hover:underline"
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
            className="h-5 w-5 rounded-md border border-gray-400 text-[#4caf50] focus:ring-[#4caf5066]"
          />
          <span className="ml-3 capitalize text-gray-700">{cat.replace('-', ' & ')}</span>
        </label>
      ))}
    </div>

    <div>
      <label className="block text-lg font-semibold mb-2">Filter by Price</label>
      <Slider value={price} onChange={handlePriceFilterChange}  minValue={minValue} maxValue={maxValue} setMaxValue={setMaxValue} setMinValue={setMinValue}/>
    </div>

    <input
      type="submit"
      value="Apply Filters"
      className="btn text-white font-medium py-2 px-4 rounded w-fit mt-2"
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
