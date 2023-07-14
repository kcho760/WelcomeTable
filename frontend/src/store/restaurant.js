import csrfFetch from "./csrf";

const RETRIEVE_RESTAURANTS = 'restaurant/RETRIEVE_RESTAURANTS';
const RETRIEVE_RESTAURANT = 'restaurant/RETRIEVE_RESTAURANT';
const SET_DAILY_RESERVATION_COUNT = 'restaurant/SET_DAILY_RESERVATION_COUNT';

export const fetchDailyReservations = (restaurantId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/restaurants/${restaurantId}/daily_reservations`);
    const data = await response.json();
    dispatch({
      type: SET_DAILY_RESERVATION_COUNT,
      restaurantId,
      reservationCount: data.reservationCount,
    });
    return data.reservationCount; // Return the reservationCount from the action response
  } catch (error) {
    console.error('Failed to fetch daily reservations:', error);
    return 0; // Return a default value in case of an error
  }
};

export const retrieveRestaurant = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/restaurants/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  if (res.ok) {
    const restaurant = await res.json();
    dispatch({
      type: RETRIEVE_RESTAURANT,
      restaurant
    });
  }
};

export const retrieveRestaurants = () => async (dispatch) => {
  const res = await csrfFetch('/api/restaurants', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  if (res.ok) {
    const restaurants = await res.json();
    dispatch({
      type: RETRIEVE_RESTAURANTS,
      restaurants
    });
  }
};

const restaurantsReducer = (state = {}, action) => {
  const newState = { ...state };

  switch (action.type) {
    case SET_DAILY_RESERVATION_COUNT:
      const { restaurantId, reservationCount } = action;
      newState[restaurantId] = {
        ...newState[restaurantId],
        dailyReservationCount: reservationCount,
      };
      return newState;

    case RETRIEVE_RESTAURANT:
      newState[action.restaurant.id] = action.restaurant;
      return newState;

    case RETRIEVE_RESTAURANTS:
      return { ...newState, ...action.restaurants };

    default:
      return state;
  }
};

export default restaurantsReducer;
