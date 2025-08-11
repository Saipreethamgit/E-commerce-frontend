// src/components/ProductCard.js
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart, toggleWishlist, wishlist }) => {
  const isInWishlist = wishlist?.some(item => item._id === product._id);
  console.log("isInWishlist?", isInWishlist, "product._id:", product._id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden relative">
      
      {/* 🔗 Make image clickable */}
      <Link to={`/products/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>

      <div className="p-5 flex flex-col justify-between">
        {/* 🔗 Make name clickable */}
        <Link to={`/products/${product._id}`}>
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white hover:underline">
            {product.name}
          </h2>
        </Link>

        <p className="text-lg font-bold text-primary dark:text-yellow-400 mb-4">
          ${product.price.toFixed(2)}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
