// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { ShoppingCart } from "lucide-react";

const Header = ({ user, setUser, cartCount }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/70 shadow-lg">
      <nav className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-extrabold tracking-wide text-primary transition hover:text-primary-dark">
          🛍️ GaMercein
        </Link>

        <ul className="flex flex-wrap justify-end gap-4 items-center">
          <li><DarkModeToggle /></li>


          {["/", "/products", "/login"].map((path, idx) => (
            <li key={idx}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `text-white hover:text-accent transition font-semibold ${
                    isActive ? "text-accent underline decoration-2 underline-offset-4" : ""
                  }`
                }
              >
                {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </NavLink>
            </li>
          ))}
          {user && (
        <li>
        <NavLink
        to="/profile"
        className={({ isActive }) =>
        isActive ? "text-accent underline decoration-2 underline-offset-4 font-semibold" : "hover:text-accent"
        }
        >
        Profile
        </NavLink>
        </li>
        )}
        {user && (
  <li>
    <NavLink
      to="/orders"
      className={({ isActive }) =>
        isActive ? "text-accent underline decoration-2 underline-offset-4 font-semibold" : "hover:text-accent"
      }
    >
      Orders
    </NavLink>
  </li>
)}

          {user ? (
            <>
              <li className="text-sm text-white font-medium italic">👋 {user.email}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-primary text-white font-semibold rounded-md px-5 py-2 shadow-lg hover:bg-primary-dark transition duration-300 ease-in-out"
                >
                  Logout
                </button>
              </li>
            </>
          ) : null}

          <li className="relative">
            <NavLink
              to="/cart"
              className="relative text-white hover:text-accent transition flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 4h13"
                />
              </svg>
              
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full px-2 text-xs font-bold shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};


export default Header;
