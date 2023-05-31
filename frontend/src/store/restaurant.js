import csrfFetch from "./csrf";

const RETREIVE_RESTAURANTS = 'restaurant/RETREIVE_RESTAURANTS';
const RETREIVE_RESTAURANT = 'restaurant/RETREIVE_RESTAURANT';

export const retreiveRestaurant = (restaurantId)=> async(dispatch) => {
    const res = await csrfFetch(`/api/restaurants/${restaurantId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
    if(res.ok){
        const restaurant = await res.json();
        dispatch({
            type: RETREIVE_RESTAURANT,
            restaurant
        })
    }
}

export const retreiveRestaurants = () => async(dispatch) => {
    const res = await csrfFetch('/api/restaurants', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    if(res.ok){
        const restaurants = await res.json();
        dispatch({
            type: RETREIVE_RESTAURANTS,
            restaurants
        })
    }
}


const restaurantsReducer = (state = {}, action) => {
    const newState = {};
    switch (action.type) {
        case RETREIVE_RESTAURANT:
            newState[action.restaurant.id] = action.restaurant;
            return newState;
            case RETREIVE_RESTAURANTS:
            return {...state, ...action.restaurants}
        default:
            return state;
    }
}

export default restaurantsReducer;