import csrfFetch from "./csrf";

const FETCH_SEARCH = 'search/FETCH_SEARCH';
const FETCH_ALL_CUISINES = 'search/FETCH_ALL_CUISINES';

const fetchSearch = (search) => ({
    type: FETCH_SEARCH,
    search
});

const fetchAllCuisines = (cuisines) => ({
    type: FETCH_ALL_CUISINES,
    cuisines
});

export const getSearchResults = (searchTerm) => async (dispatch) => {
    const res = await csrfFetch(`/api/search/${searchTerm}`);
    if (res.ok) {
      const search = await res.json();
      dispatch(fetchSearch(search));
    }
  };
  
  

export const getAllCuisines = () => async (dispatch) => {
  try {
    const res = await csrfFetch('/api/cuisines');
    if (res.ok) {
      const cuisines = await res.json();
      dispatch(fetchAllCuisines(cuisines)); // Dispatch the action to store the cuisines in the Redux store
    }
  } catch (error) {
    console.error('Error fetching cuisines:', error);
    return { success: false };
  }
};

  

const initialState = {
    search: {},
    cuisines: [],
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SEARCH:
            return {
                ...state,
                search: action.search,
            };
        case FETCH_ALL_CUISINES:
            return {
                ...state,
                cuisines: action.cuisines,
            };
        default:
            return state;
    }
};

export default searchReducer;
