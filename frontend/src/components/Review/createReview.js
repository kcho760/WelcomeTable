import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import { addReview } from '../../store/review';
import ReviewStarRating from './reviewStarRating';
import './createReview.css';

const CreateReview = ({ restaurantId }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [foodRating, setFoodRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [ambienceRating, setAmbienceRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const currentUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) {
      // Display error message if description is empty
      setErrors(['Please fill out a description']);
      return;
    }

    // Clear the errors if description is not empty
    setErrors([]);

    if (currentUser) {
      // Create a review object
      const review = {
        description: description,
        food_rating: foodRating,
        service_rating: serviceRating,
        ambience_rating: ambienceRating,
        value_rating: valueRating,
        user_id: currentUser.id,
        restaurant_id: restaurantId,
      };

      // Dispatch the addReview action
      dispatch(addReview(review));

      // Reset the form fields
      setDescription('');
      setFoodRating(0);
      setServiceRating(0);
      setAmbienceRating(0);
      setValueRating(0);
    } else {
      setShowModal(true);
      return;
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal when called
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
    // Clear the errors when something is typed in the description field
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  return (
    <div className="create-review">
      <h2>Leave a Review</h2>
      {errors.length > 0 && (
        <ul className="error-list">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">
          Description:
          <textarea
            id="description"
            value={description}
            onChange={handleChangeDescription}
          ></textarea>
        </label>

        <div className="rating-line1">
          <label htmlFor="foodRating">
            Food Rating:
            <ReviewStarRating
              rating={foodRating}
              onRatingChange={setFoodRating}
            />
          </label>

          <label htmlFor="serviceRating">
            Service Rating:
            <ReviewStarRating
              rating={serviceRating}
              onRatingChange={setServiceRating}
            />
          </label>
        </div>

        <div className="rating-line2">
          <label htmlFor="ambienceRating">
            Ambience Rating:
            <ReviewStarRating
              rating={ambienceRating}
              onRatingChange={setAmbienceRating}
            />
          </label>

          <label htmlFor="valueRating">
            Value Rating:
            <ReviewStarRating
              rating={valueRating}
              onRatingChange={setValueRating}
            />
          </label>
        </div>

        <button type="submit">Submit Review</button>
      </form>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <LoginForm onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default CreateReview;
