import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const ProductCard = ({ id, cart, Image, Name, Category, price }) => {
  const [quantity, setQuantity] = useState(0);

  // ✅ Use useEffect to sync quantity with cart data
  useEffect(() => {
    const cartItem = cart.find(item => item.itemId._id === id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(0);
    }
  }, [cart, id]); // Only run when cart or id changes

  const handleAddtoCart = async () => {
    console.log(sessionStorage.getItem('token'));
    console.log('Adding item to cart:', id);
    try {
      await axios.post('http://localhost:3000/api/customer/cart/addNewItem',
        {
          itemId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          }
        })
      setQuantity(1);  // Set quantity to 1 when Add to Cart is clicked
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleIncrease = async () => {
    try {
      const response = await axios.patch('http://localhost:3000/api/customer/cart/updateItem', {
        itemId: id,
        action: "increment",
      }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      const newQuantity = response.data.cart.items.find(item => item.itemId._id === id)?.quantity || 0;
      setQuantity(newQuantity);
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const handleDecrease = async () => {
    try {
      const response = await axios.patch('http://localhost:3000/api/customer/cart/updateItem', {
        itemId: id,
        action: "decrement",
      }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      const newQuantity = response.data.cart.items.find(item => item.itemId._id === id)?.quantity || 0;
      if (newQuantity > 0) {
        setQuantity(newQuantity);
      } else {
        setQuantity(0);  // Go back to "Add to Cart" if quantity is 0
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  return (
    <div className="group bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 p-6 pb-4">
        <img 
          src={Image} 
          alt={Name} 
          className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105" 
        />
        
        {/* Fresh Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            FRESH
          </span>
        </div>

        {/* Discount Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            15% OFF
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Category */}
        <p className="text-sm font-medium text-green-600 mb-1 uppercase tracking-wide">
          {Category}
        </p>
        
        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-800 mb-3 leading-tight line-clamp-2">
          {Name}
        </h3>

        {/* Price Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">₹{price}</span>
            <span className="text-sm text-gray-400 line-through">₹{Math.floor(price * 1.18)}</span>
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">In Stock</span>
          </div>
        </div>

        {/* Cart Controls */}
        <div className="mt-4">
          {quantity === 0 ? (
            <button
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
              onClick={handleAddtoCart}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add to Cart</span>
            </button>
          ) : (
            <div className="flex items-center justify-between">
              {/* Quantity Controls */}
              <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-gray-200">
                <button
                  className="w-10 h-10 rounded-l-2xl bg-white hover:bg-red-50 text-red-500 font-bold flex items-center justify-center transition-colors duration-200 border-r border-gray-200"
                  onClick={handleDecrease}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                
                <div className="px-4 py-2 bg-white min-w-[3rem] text-center">
                  <span className="text-lg font-bold text-gray-800">{quantity}</span>
                </div>
                
                <button
                  className="w-10 h-10 rounded-r-2xl bg-white hover:bg-green-50 text-green-500 font-bold flex items-center justify-center transition-colors duration-200 border-l border-gray-200"
                  onClick={handleIncrease}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>

              {/* Total Price */}
              <div className="text-right">
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-lg font-bold text-green-600">₹{(price * quantity).toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500"></div>
    </div>
  );
};