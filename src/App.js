import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductDetail from './pages/ProductDetail';
import { Toaster, toast } from 'react-hot-toast';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import axios from 'axios';

import { 
  addOrUpdateCartItem, 
  fetchCart,  
} from './api';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error("Invalid user data in localStorage");
      }
    }
  }, []);

  // Fetch cart and wishlist from backend on user login
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }
    fetchCart(user.id)
      .then(data => setCartItems(data))
      .catch(() => setCartItems([]));
  }, [user]);


  const addToCart = async (product) => {
  if (!user) {
    toast.error("Please login to add items to cart.");
    return;
  }
  try {
    const existing = cartItems.find(item => item.id === product.id);
    let updatedCart;
    if (existing) {
      updatedCart = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      await addOrUpdateCartItem({ userId: user.id, productId: product.id, quantity: existing.quantity + 1 });
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
      await addOrUpdateCartItem({ userId: user.id, productId: product.id, quantity: 1 });
    }
    setCartItems(updatedCart);
    toast.success(`${product.name} added to cart!`);
  } catch (error) {
    toast.error("Failed to update cart.");
  }
};



  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Header cartCount={cartItems.length} user={user} setUser={setUser} />
        <main className="min-h-[80vh] px-4 py-10 sm:px-8 md:px-16 lg:px-24 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={
                <Products
                  addToCart={addToCart}
              
                />
              }
            />
            <Route path="/products/:id" element={<ProductDetail addToCart />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="*" element={<h2 className="text-center mt-10">404 - Page Not Found</h2>} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/orders" element={<OrderHistory />} />
            
</Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
