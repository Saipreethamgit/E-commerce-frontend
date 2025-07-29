// src/pages/Checkout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Checkout = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [cardNumber, setCardNumber] = useState("");

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!cardNumber || cardNumber.length < 12) {
      alert("Please enter a valid card number.");
      return;
    }

    if (!addresses[selectedAddressIndex]) {
      alert("Please select a shipping address.");
      return;
    }

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: totalAmount,
      date: new Date().toLocaleString(),
      address: addresses[selectedAddressIndex],
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));

    setCartItems([]);
    localStorage.removeItem("cart");

    toast.success('Order placed successfully!');
    navigate('/orders');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-yellow-400">Checkout</h2>

      <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
      {addresses.length > 0 ? (
        <ul className="space-y-3 mb-6">
          {addresses.map((addr, index) => (
            <li
              key={index}
              onClick={() => setSelectedAddressIndex(index)}
              className={`border p-3 rounded cursor-pointer ${
                selectedAddressIndex === index
                  ? "bg-yellow-100 dark:bg-yellow-900 border-yellow-500"
                  : "bg-gray-50 dark:bg-gray-800"
              }`}
            >
              <p>{addr.line1}{addr.line2 && `, ${addr.line2}`}</p>
              <p>{addr.city}, {addr.state} {addr.zip}</p>
              <p>{addr.country}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-6 text-sm text-red-500">
          No address found. Please add one from the Profile page.
        </p>
      )}

      <h3 className="font-semibold text-lg mb-2">Payment</h3>
      <input
        type="text"
        placeholder="Card Number"
        className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:text-white"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />

      <div className="font-bold text-lg mb-4">
        Total: <span className="text-primary dark:text-yellow-400">${totalAmount.toFixed(2)}</span>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={cartItems.length === 0 || addresses.length === 0}
        className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition disabled:opacity-50"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
