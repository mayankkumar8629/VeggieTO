import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Plus, Minus, Trash2, Package, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartCard = ({ name, category, price, quantity, onIncrement, onDecrement, onDelete }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-lg mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{category}</p>
        <p className="font-bold text-green-600 text-lg">₹{price}</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-gray-50 rounded-lg p-1">
          <button
            onClick={onDecrement}
            className="p-2 hover:bg-gray-200 rounded-md transition-colors duration-200"
          >
            <Minus size={16} className="text-gray-600" />
          </button>
          <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={onIncrement}
            className="p-2 hover:bg-gray-200 rounded-md transition-colors duration-200"
          >
            <Plus size={16} className="text-gray-600" />
          </button>
        </div>
        
        <button
          onClick={onDelete}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  </div>
);

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/customer/cart/getCart",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setCartId(response.data.cart._id);
      setCartItems(response.data.cart.items);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleIncrement = async (id) => {
    const response = await axios.patch(
      "http://localhost:3000/api/customer/cart/updateItem",
      {
        itemId: id,
        action: "increment",
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    setCartItems(response.data.cart.items);
  };

  const handleDecrement = async (id) => {
    const response = await axios.patch(
      "http://localhost:3000/api/customer/cart/updateItem",
      {
        itemId: id,
        action: "decrement",
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    setCartItems(response.data.cart.items);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/customer/cart/deleteItem`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          data: {
            itemId: id,
          },
        }
      );
      fetchCartItems(); 
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.itemId.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      const result = await axios.post(
        `http://localhost:3000/api/customer/order/placeOrder/${cartId}`,{},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const order_id = result.data.order.razorpayOrderId;
      const amount = result.data.order.totalPrice * 100; // Razorpay expects paise
      const currency = "INR"; // Hardcoded as your backend uses INR

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount.toString(),
        currency,
        name: "VeggieTo",
        description: "Order Payment",
        order_id, // This must be the Razorpay order ID
        handler: async function (response) {
          try {
            console.log("Payment response:", response);
            const paymentResponse = await axios.post(
              "http://localhost:3000/api/customer/order/verifyPayment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
              }
            );
            console.log("Payment verification response:", paymentResponse.data);
            const orderData = paymentResponse.data.order;
            alert(paymentResponse.data.message);
            fetchCartItems(); 
            navigate("/orderSummary", {state: { orderData } }); // Redirect to products page with order data
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-green-600 rounded-full">
              <ShoppingCart className="text-white" size={24} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Your Cart</h1>
          </div>
          <p className="text-gray-600 text-lg">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                  <CartCard
                    key={item.itemId._id}
                    name={item.itemId.name}
                    category={item.itemId.category}
                    price={item.itemId.price}
                    quantity={item.quantity}
                    onIncrement={() => handleIncrement(item.itemId._id)}
                    onDecrement={() => handleDecrement(item.itemId._id)}
                    onDelete={() => handleDelete(item.itemId._id)}
                  />
                ))
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                  <Package size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Add some fresh vegetables to get started!</p>
                  <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200">
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard size={24} />
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-green-600">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  cartItems.length === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                }`}
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                {cartItems.length === 0 ? 'Cart is Empty' : 'Proceed to Checkout'}
              </button>

              {cartItems.length > 0 && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700 text-center">
                    🎉 You're eligible for free delivery!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};