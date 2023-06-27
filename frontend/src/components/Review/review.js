import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/review";
import "./review.css";
import StarRating from "../RestaurantCarousel/subcomponents/star_rating";
import UpdateReview from "./updateReview";

function ReviewList({ reviews }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [reviewData, setReviewData] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

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
    dispatch(deleteReview(reviewId));
  };

  const handleUpdateReview = (reviewId) => {
    setSelectedReview(reviewId);
  };

  const handleCancelUpdate = () => {
    setSelectedReview(null);
  };

  return (
    <div className="review-list">
      {reviewData.map((review) => (
        <div key={review.id} className="review-item">
          <p>{review.user.user.username}</p>
          <StarRating
            foodRating={review.food_rating}
            serviceRating={review.service_rating}
            ambienceRating={review.ambience_rating}
            valueRating={review.value_rating}
          />
          <div className="rating-row">
            <div>
              <strong>Food Rating:</strong>{" "}
              <span className="red-value">{review.food_rating}</span>
            </div>
            <div className="dot-1">&#x2022;</div>
            <div>
              <strong>Service Rating:</strong>{" "}
              <span className="red-value">{review.service_rating} </span>
            </div>
            <div className="dot-1">&#x2022;</div>
            <div>
              <strong>Ambience Rating:</strong>{" "}
              <span className="red-value">{review.ambience_rating} </span>
            </div>
            <div className="dot-1">&#x2022;</div>
            <div>
              <strong>Value Rating:</strong>{" "}
              <span className="red-value">{review.value_rating}</span>
            </div>
          </div>
          <p>{review.description}</p>
          {currentUser && review.user.user.id === currentUser.id && (
            <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
          )}
          {currentUser && review.user.user.id === currentUser.id && (
            <button onClick={() => handleUpdateReview(review.id)}>Update</button>
          )}
          <hr />
          {selectedReview === review.id && (
            <UpdateReview reviewId={review.id} onCancel={handleCancelUpdate} />
          )}
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
