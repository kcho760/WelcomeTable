// review.js

import csrfFetch from "./csrf";

// Action types
const REVIEWS_RETRIEVED = "review/REVIEWS_RETRIEVED";
const ADD_REVIEW = "review/ADD_REVIEW";
const DELETE_REVIEW = "review/DELETE_REVIEW";
const UPDATE_REVIEW = "review/UPDATE_REVIEW";
const SHOW_REVIEW = "review/SHOW_REVIEW";

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

export const updateReviewSuccess = (review) => ({
  type: UPDATE_REVIEW,
  review,
});

export const showReview = (reviewId) => ({
  type: SHOW_REVIEW,
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
        return reviews; // Return the fetched reviews
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

export const updateReview = (reviewId, updatedReview) => {
  return async (dispatch) => {
    try {
      const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        body: JSON.stringify(updatedReview),
      });
      if (res.ok) {
        const updatedReviewData = await res.json();
        dispatch(updateReviewSuccess(updatedReviewData));
        return updatedReviewData;
      } else {
        throw new Error("Failed to update review");
      }
    } catch (error) {
      console.error("Failed to update review:", error);
      throw error;
    }
  };
};

// Reducer
const initialState = {
  reviews: [],
  selectedReviewId: null,
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
    case UPDATE_REVIEW:
      const updatedReviewIndex = state.reviews.findIndex((review) => review.id === action.review.id);
      if (updatedReviewIndex !== -1) {
        const updatedReviews = [...state.reviews];
        updatedReviews[updatedReviewIndex] = action.review;
        return {
          ...state,
          reviews: updatedReviews,
        };
      }
      return state;
    case SHOW_REVIEW:
      return {
        ...state,
        selectedReviewId: action.reviewId,
      };
    default:
      return state;
  }
};

export default reviewsReducer;
