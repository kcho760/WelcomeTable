import React from "react";

function ReviewList({ reviews }) {
  return (
    <div className="review-list">
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <h2>{review.title}</h2>
          <p>{review.description}</p>
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
          <hr/>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
