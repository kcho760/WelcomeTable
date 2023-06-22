import csrfFetch from "./csrf";

// Action types
const REVIEWS_RETRIEVED = "review/REVIEWS_RETRIEVED";
const ADD_REVIEW = "review/ADD_REVIEW";
const DELETE_REVIEW = "review/DELETE_REVIEW";

// Action creators
export const reviewsRetrieved = (reviews) => ({
  type: REVIEWS_RETRIEVED,
  reviews,
});

export const addReviewSuccess = (review) => ({
  type: ADD_REVIEW,
  review,
});

export const deleteReviewSuccess = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

// Thunk action creators
export const retrieveReviewsByRestaurantId = (restaurantId) => {
  return async (dispatch) => {
    try {
      const res = await csrfFetch(`/api/restaurant/${restaurantId}/reviews`);
      if (res.ok) {
        const reviews = await res.json();
        dispatch(reviewsRetrieved(reviews));
        return reviews;
      } else {
        throw new Error("Failed to retrieve reviews");
      }
    } catch (error) {
      console.error("Failed to retrieve reviews:", error);
      throw error;
    }
  };
};

export const addReview = (review) => {
  return async (dispatch) => {
    try {
      const res = await csrfFetch("/api/reviews", {
        method: "POST",
        body: JSON.stringify(review),
      });
      if (res.ok) {
        const addedReview = await res.json();
        dispatch(addReviewSuccess(addedReview));
        return addedReview;
      } else {
        throw new Error("Failed to add review");
      }
    } catch (error) {
      console.error("Failed to add review:", error);
      throw error;
    }
  };
};

export const deleteReview = (reviewId) => {
  return async (dispatch) => {
    try {
      const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        dispatch(deleteReviewSuccess(reviewId));
      } else {
        throw new Error("Failed to delete review");
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
      throw error;
    }
  };
};


// Reducer
const initialState = {
  reviews: [],
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REVIEWS_RETRIEVED:
      return {
        ...state,
        reviews: action.reviews,
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.review],
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((review) => review.id !== action.reviewId),
      };
    default:
      return state;
  }
};

export default reviewsReducer;
