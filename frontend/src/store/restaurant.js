import csrfFetch from "./csrf";

const RETRIEVE_RESTAURANTS = 'restaurant/RETRIEVE_RESTAURANTS';
const RETRIEVE_RESTAURANT = 'restaurant/RETRIEVE_RESTAURANT';

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
    case RETRIEVE_RESTAURANT:
        newState[action.restaurant.id] = action.restaurant;
        return newState;
    case RETRIEVE_RESTAURANTS:
      return {...newState,...action.restaurants};
    default:
      return state;
  }
};

export default restaurantsReducer;
