import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../store/review";
import "./createReview.css";
import ReviewStarRating from "./reviewStarRating";

const CreateReview = ({ restaurantId }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [foodRating, setFoodRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [ambienceRating, setAmbienceRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const currentUser = useSelector((state) => state.session.user);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a review object
    const review = {
      title: title,
      description: description,
      food_rating: foodRating,
      service_rating: serviceRating,
      ambience_rating: ambienceRating,
      value_rating: valueRating,
      user_id: currentUser.id,
      restaurant_id: restaurantId,
    };
    
    console.log(review)
    // Dispatch the addReview action
    dispatch(addReview(review));

    // Reset the form fields
    setTitle("");
    setDescription("");
    setFoodRating(0);
    setServiceRating(0);
    setAmbienceRating(0);
    setValueRating(0);
  };

  return (
    <div className="create-review">
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description:
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        <div className="rating-line1">
            <label htmlFor="foodRating">Food Rating:
              <ReviewStarRating rating={foodRating} onRatingChange={setFoodRating} />
            </label>

            <label htmlFor="serviceRating">Service Rating:
              <ReviewStarRating rating={serviceRating} onRatingChange={setServiceRating} />
            </label>
        </div>

        <div className="rating-line2">
            <label htmlFor="ambienceRating">Ambience Rating:
              <ReviewStarRating rating={ambienceRating} onRatingChange={setAmbienceRating} />
            </label>

            <label htmlFor="valueRating">Value Rating:
              <ReviewStarRating rating={valueRating} onRatingChange={setValueRating} />
            </label>
        </div>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default CreateReview;
