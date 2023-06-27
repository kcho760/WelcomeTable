import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReview } from "../../store/review";
import "./updateReview.css";
import ReviewStarRating from "./reviewStarRating";

const UpdateReview = ({ reviewId, onCancel }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [foodRating, setFoodRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [ambienceRating, setAmbienceRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const currentUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.review.reviews);
  const currentReview = reviews.find((review) => review.id === reviewId);

  useEffect(() => {
    if (currentReview) {
      setDescription(currentReview.description);
      setFoodRating(currentReview.food_rating);
      setServiceRating(currentReview.service_rating);
      setAmbienceRating(currentReview.ambience_rating);
      setValueRating(currentReview.value_rating);
    }
  }, [currentReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a review object
    const updatedReview = {
      id: reviewId,
      description: description,
      food_rating: foodRating,
      service_rating: serviceRating,
      ambience_rating: ambienceRating,
      value_rating: valueRating,
      user_id: currentUser.id,
    };

    // Dispatch the updateReview action
    dispatch(updateReview(reviewId, updatedReview));

    // Reset the form fields
    setDescription("");
    setFoodRating(0);
    setServiceRating(0);
    setAmbienceRating(0);
    setValueRating(0);

    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="update-review">
      <h2>Update Review</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">
          Description:
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        <div className="rating-line1">
          <label htmlFor="foodRating">
            Food Rating:
            <ReviewStarRating rating={foodRating} onRatingChange={setFoodRating} />
          </label>

          <label htmlFor="serviceRating">
            Service Rating:
            <ReviewStarRating rating={serviceRating} onRatingChange={setServiceRating} />
          </label>
        </div>

        <div className="rating-line2">
          <label htmlFor="ambienceRating">
            Ambience Rating:
            <ReviewStarRating rating={ambienceRating} onRatingChange={setAmbienceRating} />
          </label>

          <label htmlFor="valueRating">
            Value Rating:
            <ReviewStarRating rating={valueRating} onRatingChange={setValueRating} />
          </label>
        </div>

        <div className="button-group">
          <button type="submit">Update Review</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateReview;
