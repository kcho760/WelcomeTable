import csrfFetch from "./csrf";

const FETCH_SEARCH = 'search/FETCH_SEARCH';
const FETCH_ALL_CUISINES = 'search/FETCH_ALL_CUISINES';
const FETCH_ALL_RESULTS = 'search/FETCH_ALL_RESULTS';


const fetchSearch = (search) => ({
  type: FETCH_SEARCH,
  search
});

const fetchAllCuisines = (cuisines) => ({
  type: FETCH_ALL_CUISINES,
  cuisines
});

const fetchAllResults = (results) => ({
  type: FETCH_ALL_RESULTS,
  results
});

export const getAllResults = () => async (dispatch) => {
  try {
    const res = await csrfFetch('/api/searches');
    if (res.ok) {
      const results = await res.json();
      dispatch(fetchAllResults(results));
    } else {
      throw new Error('Response not OK');
    }
  } catch (error) {
    console.error('Error fetching all results:', error);
  }
};


export const getSearchResults = (searchTerm) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/searches/${searchTerm}`);
    if (res.ok) {
      const search = await res.json();
      dispatch(fetchSearch(search));
    } else {
      throw new Error('Response not OK');
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

export const getAllCuisines = () => async (dispatch) => {
  try {
    const res = await csrfFetch('/api/cuisines');
    if (res.ok) {
      const cuisines = await res.json();
      dispatch(fetchAllCuisines(cuisines));
    } else {
      throw new Error('Response not OK');
    }
  } catch (error) {
    console.error('Error fetching cuisines:', error);
  }
};

const initialState = {
  search: {},
  cuisines: [],
  restaurants: [],
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
    case FETCH_ALL_RESULTS:
      return {
        ...state,
        search: action.results,
      };
    default:
      return state;
  }
};


export default searchReducer;
