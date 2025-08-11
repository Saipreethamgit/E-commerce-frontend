// src/pages/Cart.js
import React from "react";
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const increaseQty = (_id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const decreaseQty = (_id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === _id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const removeItem = (_id) => {
    const updatedCart = cartItems.filter((item) => item._id !== _id);
    setCartItems(updatedCart);
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary dark:text-yellow-400">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg">🛒 Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-4"
            >
              <div>
                <h2 className="font-semibold text-lg dark:text-white">{item.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-2 py-1 rounded hover:opacity-80"
                >
                  −
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item._id)}
                  className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-2 py-1 rounded hover:opacity-80"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-600 font-medium hover:underline ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6 text-xl font-bold dark:text-white">
            Total: ${total.toFixed(2)}
            <button
              onClick={() => navigate('/checkout')}
              className="mt-6 bg-primary text-white py-2 px-6 rounded hover:bg-primary-dark transition"
            >
              Proceed to Checkout
            </button>

          </div>
        </div>
        
      )}
    </section>
  );
};

export default Cart;
