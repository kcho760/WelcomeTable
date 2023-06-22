import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/review";
import './review.css'

function ReviewList({ reviews }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    async function fetchReviewData() {
      const updatedReviews = [];
      for (const review of reviews) {
        const user = await fetchUserData(review.user_id);
        const updatedReview = { ...review, user };
        updatedReviews.push(updatedReview);
      }
      setReviewData(updatedReviews);
    }
    fetchReviewData();
  }, [reviews]);

  async function fetchUserData(userId) {
    try {
      const response = await fetch(`/api/users/${userId}/fetch_data`);
      if (response.ok) {
        const user = await response.json();
        return user;
      } else {
        // Handle error response
        throw new Error("Error fetching user data");
      }
    } catch (error) {
      // Handle fetch error
      console.error(error);
      throw error;
    }
  }

  const handleDeleteReview = (reviewId) => {
    // Dispatch the deleteReview action
    dispatch(deleteReview(reviewId));
  };

  return (
    <div className="review-list">
      {reviewData.map((review) => (
        <div key={review.id} className="review-item">
          <p>{review.user.user.username}</p>
          <h2>{review.title}</h2>
          <p>{review.description}</p>
          <div>
            <strong>User:</strong> {review.user ? review.user.user.username : "Unknown"}
          </div>
          <div>
            <strong>Food Rating:</strong> {review.food_rating}
          </div>
          <div>
            <strong>Service Rating:</strong> {review.service_rating}
          </div>
          <div>
            <strong>Ambience Rating:</strong> {review.ambience_rating}
          </div>
          <div>
            <strong>Value Rating:</strong> {review.value_rating}
          </div>
          {currentUser && review.user.user.id === currentUser.id && (
            <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
