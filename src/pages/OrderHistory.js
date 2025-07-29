import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-yellow-400 mb-8 text-center">
        Your Order History
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You have no past orders yet.
        </p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="mb-8 border dark:border-gray-700 rounded-lg p-5 bg-white dark:bg-gray-800 shadow-lg">
            <div className="flex justify-between mb-3">
              <h2 className="font-semibold text-lg">Order #{order.id}</h2>
              <span className="text-sm text-gray-600 dark:text-gray-400">{order.date}</span>
            </div>

            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {order.items.map((item) => (
                <li key={item.id} className="py-2 flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Shipped to: {order.address?.line1}, {order.address?.city}
              </div>
              <div className="font-bold text-green-600 dark:text-green-400">
                Total: ${order.total.toFixed(2)}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
