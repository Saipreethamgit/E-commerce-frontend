import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../api';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    try {
      // Call real API
      const data = await loginAPI(email, password);

      if (!data.token) throw new Error('Login failed: no token returned');

      // Save JWT token & user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ id: data.userId, username: data.username }));

      setUser({ id: data.userId, username: data.username });
      toast.success('Login successful!');

      navigate('/products');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded bg-white shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded text-black placeholder-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded text-black placeholder-gray-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
