import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveReviewsByRestaurantId } from "../../../store/review";

const RestaurantStarRating = ({ restaurantId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review.reviews);

  useEffect(() => {
    dispatch(retrieveReviewsByRestaurantId(restaurantId));
  }, [dispatch, restaurantId]);

  if (reviews.length === 0) {
    return <div>Loading...</div>; // Display a loading state or a placeholder when reviews are empty
  }

  const calculateAverageRating = () => {
    // Calculate the sum of ratings in each category
    const totalFoodRating = reviews.reduce((sum, review) => sum + review.food_rating, 0);
    const totalServiceRating = reviews.reduce((sum, review) => sum + review.service_rating, 0);
    const totalAmbienceRating = reviews.reduce((sum, review) => sum + review.ambience_rating, 0);
    const totalValueRating = reviews.reduce((sum, review) => sum + review.value_rating, 0);

    // Calculate the average rating
    const averageRating =
      (totalFoodRating + totalServiceRating + totalAmbienceRating + totalValueRating) /
      (4 * reviews.length);

    return averageRating;
  };

  const renderStarRating = () => {
    const averageRating = calculateAverageRating();
    const filledStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 !== 0;
    const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<i key={`filled-star-${i}`} className="fas fa-star" style={{ color: "#da3743" }}></i>);
    }

    if (hasHalfStar) {
      stars.push(
        <i key="half-star" className="fas fa-star-half-alt" style={{ color: "#da3743" }}></i>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-star-${i}`} className="far fa-star" style={{ color: "#da3743" }}></i>);
    }

    return stars;
  };

  return <div>{renderStarRating()}</div>;
};

export default RestaurantStarRating;
