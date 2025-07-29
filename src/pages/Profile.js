// src/pages/Profile.js
import React, { useState } from 'react';

const Profile = ({ user }) => {
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [newAddress, setNewAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const handleSaveProfile = () => {
    alert('Profile saved (demo only)');
  };

  const handleAddAddress = () => {
    if (!newAddress.line1 || !newAddress.city || !newAddress.state || !newAddress.zip || !newAddress.country) {
      alert("Please fill all required address fields.");
      return;
    }
    setAddresses([...addresses, newAddress]);
    setNewAddress({ line1: '', line2: '', city: '', state: '', zip: '', country: '' });
  };

  const handleDeleteAddress = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-primary dark:text-yellow-400">User Profile</h2>

      <label className="block mb-2 text-sm font-semibold">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
      />

      <label className="block mb-2 text-sm font-semibold">Email</label>
      <input
        type="email"
        value={email}
        disabled
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white cursor-not-allowed"
      />

      <h3 className="text-xl font-semibold mb-2 mt-6">Shipping Addresses</h3>
      {addresses.length === 0 && <p className="mb-4">No saved addresses.</p>}

      <ul>
        {addresses.map((addr, index) => (
          <li
            key={index}
            className="border p-3 rounded mb-3 bg-gray-50 dark:bg-gray-900 flex justify-between items-center"
          >
            <div>
              <p>{addr.line1}</p>
              {addr.line2 && <p>{addr.line2}</p>}
              <p>{addr.city}, {addr.state} {addr.zip}</p>
              <p>{addr.country}</p>
            </div>
            <button
              onClick={() => handleDeleteAddress(index)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 p-4 border rounded bg-gray-50 dark:bg-gray-900">
        <h4 className="font-semibold mb-2">Add New Address</h4>
        <input
          type="text"
          placeholder="Address Line 1*"
          value={newAddress.line1}
          onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
          className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Address Line 2"
          value={newAddress.line2}
          onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value })}
          className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="City*"
          value={newAddress.city}
          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
          className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="State*"
          value={newAddress.state}
          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
          className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Zip Code*"
          value={newAddress.zip}
          onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
          className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Country*"
          value={newAddress.country}
          onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
          className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleAddAddress}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
        >
          Add Address
        </button>
      </div>

      <button
        onClick={handleSaveProfile}
        className="mt-6 bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
      >
        Save Profile
      </button>
    </div>
  );
};


export default Profile;
