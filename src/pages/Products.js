// src/pages/Products.js
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const Products = ({ addToCart, wishlist, toggleWishlist }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
  fetch("https://e-commerce-backend-6jy0.onrender.com/api/products")
    .then(res => res.json())
    .then(data => {
      const normalized = data.map(p => ({
        ...p,
        id: p.id || p._id
      }));
      setProducts(normalized);
    })
    .catch(err => console.error("Error fetching products:", err));
}, []);


  const filteredProducts = products.filter(product => {
    const matchesCategory = category === "all" || product.category?.toLowerCase() === category;
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary dark:text-yellow-400">Our Products</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-1/2
             text-black dark:text-white
             bg-white dark:bg-gray-800
             border-gray-300 dark:border-gray-600"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-md text-black dark:text-white bg-white dark:bg-gray-800"
        >
          <option value="all">All Categories</option>
          <option value="audio">Audio</option>
          <option value="wearable">Wearable</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id || product._id}
            product={product}
            addToCart={addToCart}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        ))}
      </div>
    </section>
  );
};

export default Products;
