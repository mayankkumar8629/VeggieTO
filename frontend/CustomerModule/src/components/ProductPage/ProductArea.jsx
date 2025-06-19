import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Slider } from './utils/Slider';
import { ProductCard } from './utils/ProductCard';
import { FaSlidersH } from 'react-icons/fa';

export const ProductArea = () => {
  const [products, setProducts] = useState([]);  // Use array for product list
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState(1000);
  const [cartItems, setCartItems] = useState([]);  // State to hold cart items

  // Fetch products on mount
    const fetchCartItems = async () => {
      try{
        const response = await axios.get('http://localhost:3000/api/customer/cart/getCart',{
          headers:{
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        })
        setCartItems(response.data.cart.items); 
      }catch(error){
        console.error('Error fetching cart items:', error);
      }
    }

  useEffect(() => {
    axios.get('http://localhost:3000/api/customer/items/getItemsByCategory',{
      params:{
        category:"fruits",
      },
      headers:{
        Authorization: `Bearer ${sessionStorage.getItem('token')}`  // Use token from localStorage
      }
    })
      .then(response => {
        response.data.map(product => {
          product.images ="https://picsum.photos/800";  
        });
        setProducts(response.data);  // Update state with product list
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

      fetchCartItems();  // Fetch cart items on mount
  }, []);  // Empty dependency array to run only on mount




  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (categories.includes(value)) {
      setCategories(categories.filter(cat => cat !== value));
      setProducts(products.filter(product => product.category !== value));  
    } else {
      setCategories([...categories, value]);  // Check
      console.log('Selected categories:', [...categories, value]);
      axios.get('http://localhost:3000/api/customer/items/getItemsByCategory',{
      params:{
        category:value,
      },
      headers:{
        Authorization: `Bearer ${sessionStorage.getItem('token')}`  // Use token from localStorage
      }
    })
      .then(response => {
        response.data.map(product => {
          product.images ="https://picsum.photos/800";  
        })
        setProducts(prevProducts => [...prevProducts, ...response.data]);  // Update state with product list
        
        console.log('Products fetched:', response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
    }
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // For now, just log filters
    console.log('Filtering with:', { categories, price });
    // You can make an API request or filter locally here
  };

  return (
    <div className="flex flex-row max-w-[95%] mx-auto justify-center gap-4">
      {/* Sidebar */}
      <div className="flex-col hidden sm:flex w-1/4">
  <div className="flex items-center justify-between p-4 border-b border-gray-200">
    <div className="flex items-center gap-2">
      <FaSlidersH className="text-gray-700" />
      <span className="text-xl font-semibold">Filters</span>
    </div>
    <button
      type="button"
      className="text-sm text-blue-500 hover:underline"
      onClick={() => {
        // Optional: handle clear logic here
      }}
    >
      Clear Filters
    </button>
  </div>

  <form className="flex flex-col p-4 gap-3" onSubmit={handleFilterSubmit}>
    {['fruits', 'vegetables', 'groceries', 'dairy', 'beverages', 'eggs-meat'].map((cat) => (
      <div className="flex items-center" key={cat}>
        <input
          type="checkbox"
          value={cat}
          checked={categories.includes(cat)}
          onChange={handleCategoryChange}
          className="m-1 h-5 w-5 rounded-md border border-gray-400 text-blue-600 focus:ring-blue-500"
        />
        <label className="px-2 capitalize">{cat.replace('-', ' & ')}</label>
      </div>
    ))}

    <label className="text-lg font-semibold mt-4 mb-2">Filter by Price:</label>
    <Slider />

    <input
      type="submit"
      value="Apply Filters"
      className="bg-blue-500 hover:bg-blue-600 max-w-[50%] text-white px-4 py-2 rounded mt-4 cursor-pointer"
    />
  </form>
</div>


      {/* Product Display Area */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard cart = {cartItems} id={product._id} Image={product.images} Name={product.name} Category={product.category} price={product.price} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
