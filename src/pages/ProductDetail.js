import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = ({ addToCart, wishlist, toggleWishlist }) => {
  const { id } = useParams();
  console.log("Product ID from URL:", id);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const isInWishlist = wishlist?.some(item => item.id === product?.id);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ user: "", rating: "", comment: "" });

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setReviews(data.reviews || []);
      })
      .catch((err) => {
        console.error(err);
        setProduct(null);
      });
  }, [id]);

  const handleAdd = () => {
    addToCart(product);
    navigate("/cart");
  };

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setNewReview({ user: "", rating: "", comment: "" });
  };

  if (!product) return <div className="text-center mt-10 text-red-600 text-lg">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 mt-8">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-auto rounded-xl shadow" />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-lg text-gray-700 mb-2">${product.price}</p>
          <p className="mb-4">{product.description}</p>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          reviews.map((review, idx) => (
            <div key={idx} className="mb-4 p-4 border rounded-lg">
              <p className="font-semibold">{review.user}</p>
              <p className="text-yellow-500">Rating: {review.rating}/5</p>
              <p>{review.comment}</p>
            </div>
          ))
        )}

        <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="user"
            placeholder="Your Name"
            value={newReview.user}
            onChange={handleReviewChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            value={newReview.rating}
            onChange={handleReviewChange}
            className="w-full p-2 border rounded"
            min="1"
            max="5"
            required
          />
          <textarea
            name="comment"
            placeholder="Write your review..."
            value={newReview.comment}
            onChange={handleReviewChange}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
