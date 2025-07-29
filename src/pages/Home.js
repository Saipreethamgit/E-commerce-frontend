import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="text-center py-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">🛍️ Welcome to Gamercein</h1>
        <p className="text-lg md:text-xl mb-6">
          Your ultimate destination for high-quality gaming gear and gadgets.  
          Discover, shop, and level up your setup.
        </p>
        <Link
          to="/products"
          className="inline-block bg-white text-indigo-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition"
        >
          Explore Products
        </Link>
      </div>
    </section>
  );
};

export default Home;
