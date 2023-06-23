import { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewStarRating = ({ rating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRatingHover = (rating) => {
    setHoveredRating(rating);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const handleRatingClick = (rating) => {
    onRatingChange(rating);
  };

  return (
    <div className="review-star-rating">
      {[...Array(5)].map((_, index) => (
        <label
          key={index}
          onMouseEnter={() => handleRatingHover(index + 1)}
          onMouseLeave={handleRatingLeave}
          onClick={() => handleRatingClick(index + 1)}
        >
          <input
            type="radio"
            name="rating"
            value={index + 1}
            checked={rating === index + 1}
            onChange={() => {}}
            style={{ display: "none" }}
          />
          <FaStar
            className="star-icon"
            color={(hoveredRating || rating) > index ? "gold" : "gray"}
          />
        </label>
      ))}
    </div>
  );
};

export default ReviewStarRating;
