// src/components/Reviews.js
import React from "react";

const Reviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400 mt-4">No reviews yet.</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Customer Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="p-4 border rounded-md bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          >
            <p className="font-bold text-primary dark:text-yellow-400">{review.user}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Rating: {review.rating}⭐</p>
            <p className="mt-1 text-gray-700 dark:text-gray-200">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
