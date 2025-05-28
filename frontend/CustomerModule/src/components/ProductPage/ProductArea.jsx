import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Slider } from './utils/Slider';
import { ProductCard } from './utils/ProductCard';

export const ProductArea = () => {
  const [products, setProducts] = useState([]);  // Use array for product list
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState(1000);

  // Fetch products on mount
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
        <div className="flex items-center justify-start p-2 border-b-2 border-gray-200">
          <span className="text-xl font-bold">Product Category</span>
        </div>
        <form className="flex flex-col p-4" onSubmit={handleFilterSubmit}>
          {['fruits', 'vegetables', 'groceries', 'dairy', 'beverages', 'eggs-meat'].map((cat) => (
            <div className="flex items-center" key={cat}>
              <input
                type="checkbox"
                value={cat}
                checked={categories.includes(cat)}
                onChange={handleCategoryChange}
                className="mr-2"
              />
              <label>{cat}</label>
            </div>
          ))}

          <label className="text-lg font-semibold mt-4 mb-2">Filter by Price:</label>
          <Slider />
          <input type='submit' value='Apply Filters' className='bg-blue-500 max-w-[50%] text-white px-4 py-2 rounded mt-2 cursor-pointer' />
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
              <ProductCard id={product._id} Image={product.images} Name={product.name} Category={product.category} price={product.price} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
