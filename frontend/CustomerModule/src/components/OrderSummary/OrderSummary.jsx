import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.orderData;

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">Order not found</h2>
        <button
          onClick={() => navigate('/products')}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Shop Again
        </button>
      </div>
    );
  }

  const { _id, razorpayOrderId, createdAt, totalPrice, items, status } = order;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-6">
        <h1 className="text-3xl font-bold text-green-600 mb-4 text-center">Order Confirmed!</h1>
        <p className="text-gray-600 text-center mb-6">Thank you for your purchase.</p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="font-semibold">Order ID:</p>
              <p className="text-sm text-gray-500 break-all">{_id}</p>
            </div>
            <div>
              <p className="font-semibold">Payment ID:</p>
              <p className="text-sm text-gray-500 break-all">{razorpayOrderId}</p>
            </div>
            <div>
              <p className="font-semibold">Date:</p>
              <p className="text-sm text-gray-500">{new Date(createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <p className="text-sm text-blue-500 capitalize">{status}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-semibold text-lg mb-2">Items:</p>
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item._id} className="py-2 flex justify-between text-sm">
                  <span>Item ID: {item.itemId}</span>
                  <span>Quantity: {item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 text-right">
            <p className="font-semibold text-xl">Total: ₹{totalPrice}</p>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate('/products')}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Shop Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
