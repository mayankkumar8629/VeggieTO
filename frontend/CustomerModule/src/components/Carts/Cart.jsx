import React, { useEffect, useState } from 'react'
import { CartCard } from './utils/CartCard' // Assuming CartCard is imported
import axios from 'axios';

export const Cart = () => {
  // Sample cart items state
  const [cartItems, setCartItems] = useState([
  ]);
  useEffect(()=>{
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
    fetchCartItems();
  },[]);
  // Functions for updating quantity and deleting items
  const handleIncrement = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ))
  }

  const handleDecrement = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ))
  }

  const handleDelete = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.itemId.price * item.quantity, 0)

  return (
    <div className='flex flex-col p-4'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Your Cart</h1>
      </div>

      <div className='flex flex-col lg:flex-row gap-4'>
        {/* Cart Items */}
        <div className='flex flex-col flex-grow space-y-4'>
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <CartCard
                key={item.itemId._id}
                name={item.itemId.name}
                category={item.itemId.category}
                price={item.itemId.price}
                quantity={item.quantity}
                onIncrement={() => handleIncrement(item.id)}
                onDecrement={() => handleDecrement(item.id)}
                onDelete={() => handleDelete(item.id)}
              />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Summary Section */}
        <div className='flex flex-col p-4 border border-gray-200 rounded-lg w-full max-w-sm'>
          <h2 className='text-xl font-semibold mb-4'>Summary</h2>
          <div className='flex justify-between mb-2'>
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className='flex justify-between mb-4'>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className='flex justify-between font-bold text-lg'>
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className='mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
