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

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label htmlFor="foodRating">Food Rating:</label>
        <ReviewStarRating rating={foodRating} onRatingChange={setFoodRating} />


        <label htmlFor="serviceRating">Service Rating:</label>
        <input
          type="number"
          id="serviceRating"
          min="0"
          max="5"
          value={serviceRating}
          onChange={(e) => setServiceRating(parseInt(e.target.value))}
        />

        <label htmlFor="ambienceRating">Ambience Rating:</label>
        <input
          type="number"
          id="ambienceRating"
          min="0"
          max="5"
          value={ambienceRating}
          onChange={(e) => setAmbienceRating(parseInt(e.target.value))}
        />

        <label htmlFor="valueRating">Value Rating:</label>
        <input
          type="number"
          id="valueRating"
          min="0"
          max="5"
          value={valueRating}
          onChange={(e) => setValueRating(parseInt(e.target.value))}
        />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default CreateReview;
