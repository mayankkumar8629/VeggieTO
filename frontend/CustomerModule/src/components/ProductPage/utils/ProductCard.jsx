import axios from 'axios';
import React, { useState } from 'react';

export const ProductCard = ({ id, Image, Name, Category, price }) => {
  const [quantity, setQuantity] = useState(0);  // Start with 0 for "Add to Cart"

  const handleAddtoCart = async () => {
    console.log(sessionStorage.getItem('token'));
    console.log('Adding item to cart:', id);
     await axios.post('http://localhost:3000/api/customer/cart/addNewItem',
    {
        itemId: id,
     },
     {
     headers:{
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
     }
    })
    setQuantity(1);  // Set quantity to 1 when Add to Cart is clicked
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    } else {
      setQuantity(0);  // Go back to "Add to Cart"
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <img src={Image} alt={Name} className="w-full h-48 object-cover rounded-t-lg" />
      </div>
      <div className="p-4 flex-col">
        <h3 className="text-lg font-semibold mb-2">{Name}</h3>
        <p className="text-gray-600 mb-2">{Category}</p>
        <p className="text-xl font-bold text-blue-600">₹{price}</p>

        {quantity === 0 ? (
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            onClick={handleAddtoCart}
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center mt-4">
            <button
              className="bg-gray-300 text-gray-800 px-2 py-1 rounded-l"
              onClick={handleDecrease}
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              className="bg-gray-300 text-gray-800 px-2 py-1 rounded-r"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
