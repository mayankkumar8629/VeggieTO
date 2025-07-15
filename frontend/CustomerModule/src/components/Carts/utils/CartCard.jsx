import React from 'react';
import { Trash2, Minus, Plus, Star } from 'lucide-react';

export const CartCard = ({ 
  name, 
  category, 
  price, 
  quantity, 
  onDelete, 
  onIncrement, 
  onDecrement,
  image,
  rating = 4.5,
  originalPrice
}) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {discount}% OFF
        </div>
      )}



      <div className="flex flex-col sm:flex-row p-6 gap-4">
        {/* Product Image */}
        <div className="relative flex-shrink-0 w-full sm:w-32 h-32 group">
          <div className="w-full h-full rounded-xl overflow-hidden shadow-md">
            <img 
              src={image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center"} 
              alt={name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center";
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between flex-grow min-w-0">
          {/* Top Section */}
          <div className="space-y-2">
            {/* Product Name and Delete */}
            <div className="flex justify-between items-start gap-3">
              <h3 className="font-bold text-lg text-gray-800 leading-tight line-clamp-2 flex-1">
                {name}
              </h3>
              <button 
                onClick={onDelete} 
                className="flex-shrink-0 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-200 group-hover:scale-110 shadow-lg"
                aria-label="Remove item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Category and Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {category}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-600">{rating}</span>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
            {/* Price Section */}
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                ₹{price.toFixed(2)}
              </div>
              {originalPrice && originalPrice > price && (
                <div className="text-sm text-gray-500 line-through">
                  ₹{originalPrice.toFixed(2)}
                </div>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-2">
              <button 
                onClick={onDecrement}
                disabled={quantity <= 1}
                className="flex items-center justify-center w-10 h-10 bg-white border-2 border-gray-200 rounded-full text-gray-600 hover:text-red-500 hover:border-red-200 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <div className="flex items-center justify-center min-w-[3rem] h-10 text-gray-800 font-bold rounded-xl">
                {quantity}
              </div>
              
              <button 
                onClick={onIncrement}
                className="flex items-center justify-center w-10 h-10 bg-white border-2 border-gray-200 rounded-full text-gray-600 hover:text-green-500 hover:border-green-200 hover:bg-green-50 transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subtotal for this item */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-bold text-lg text-gray-800">₹{(price * quantity).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-blue-400/0 to-purple-400/0 group-hover:from-purple-400/5 group-hover:via-blue-400/5 group-hover:to-purple-400/5 rounded-2xl transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};



export default CartCard;