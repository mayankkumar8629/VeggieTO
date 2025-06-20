import React, { useEffect, useState } from "react";
import axios from "axios";
import { CartCard } from "./utils/CartCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to load cart");
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
      toast.error("Failed to delete item");
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.itemId.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load");
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

      //const { id: order_id, amount, currency } = result.data;
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
            toast.success(paymentResponse.data.message);
            fetchCartItems(); 
            navigate("/orderSummary", {state: { orderData } }); // Redirect to products page with order data
            // Optionally, redirect to a success page or clear the cart
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed");
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
      toast.error("Checkout failed");
    }
  };

  return (
    <div className="flex flex-col p-4">
      <ToastContainer />
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Your Cart</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col flex-grow space-y-4">
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
            <p>Your cart is empty.</p>
          )}
        </div>

        <div className="flex flex-col p-4 border border-gray-200 rounded-lg w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
