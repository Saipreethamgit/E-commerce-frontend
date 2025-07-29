import React from 'react';

const dummyOrders = [
  {
    id: 1,
    date: '2025-07-15',
    total: 199.98,
    items: ['Smart Watch', 'Bluetooth Speaker'],
  },
  {
    id: 2,
    date: '2025-07-10',
    total: 59.99,
    items: ['Wireless Headphones'],
  },
];

const Orders = ({ user }) => {
  if (!user) return <p className="text-center mt-10">Please login to view your orders.</p>;

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-yellow-400">Order History</h2>
      {dummyOrders.map(order => (
        <div key={order.id} className="border rounded p-4 mb-4 dark:border-gray-700">
          <p className="font-semibold">Order #{order.id} – {order.date}</p>
          <p>Items: {order.items.join(', ')}</p>
          <p>Total: ${order.total.toFixed(2)}</p>
        </div>
      ))}
    </section>
  );
};

export default Orders;
