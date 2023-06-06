import csrfFetch from "./csrf";

const FETCH_RESERVATION = 'reservation/FETCH_RESERVATION';
const FETCH_AVAILABLE_RESERVATIONS = 'reservation/FETCH_AVAILABLE_RESERVATIONS';
const CREATE_RESERVATION = 'reservation/CREATE_RESERVATION';
const UPDATE_RESERVATION = 'reservation/UPDATE_RESERVATION';
const DELETE_RESERVATION = 'reservation/DELETE_RESERVATION';
const CHECK_AVAILABILITY = 'reservation/CHECK_AVAILABILITY';

    export const fetchReservation = (id) => async (dispatch) => {
        const res = await csrfFetch(`/api/reservations/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        if (res.ok) {
            const reservation = await res.json();
            dispatch({
                type: FETCH_RESERVATION,
                reservation
            });
        }
    };
    
    export const fetchAvailableReservations = (reservationsParams) => async (dispatch) => {
        const res = await csrfFetch('/api/reservations/available', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(reservationsParams),
        });
      
        if (res.ok) {
          const availableReservations = await res.json();
          dispatch({
            type: FETCH_AVAILABLE_RESERVATIONS,
            availableReservations,
          });
          return availableReservations;
        }
      };

    export const createReservation = (reservation) => async (dispatch) => {
        const res = await csrfFetch(`/api/reservations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(reservation)
        });
        if (res.ok) {
            const reservation = await res.json();
            dispatch({
                type: CREATE_RESERVATION,
                reservation
            });
        }
    };

    export const updateReservation = (reservationId, reservationData) => async (dispatch) => {
            const res = await csrfFetch(`/api/reservations/${reservationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(reservationData)
            });
            if (res.ok) {
                const reservation = await res.json();
                dispatch({
                    type: UPDATE_RESERVATION,
                    reservation
                });
            }
        };


    export const deleteReservation = (reservationId) => async (dispatch) => {
        const res = await csrfFetch(`/api/reservations/${reservationId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        if (res.ok) {
            const reservation = await res.json();
            dispatch({
                type: DELETE_RESERVATION,
                reservation
            });
        }
    };

    export const isReservationAvailable = (date) => async (dispatch) => {
        const res = await csrfFetch(`/api/reservations/availability`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ date }),
        });

        if (res.ok) {
        const availability = await res.json();
        dispatch({
            type: CHECK_AVAILABILITY,
            availability,
        });
        }
    };
  
    const reservationReducer = (state = {}, action) => {
        const newState = { ...state };
      
        switch (action.type) {
        case FETCH_RESERVATION:
            newState[action.reservation.id] = action.reservation;
            return newState;
      

        case FETCH_AVAILABLE_RESERVATIONS:
            return {
                ...state,
                availableReservations: action.availableReservations,
            };

            
        case CREATE_RESERVATION:
            return {
                ...state,
                reservation: action.reservation,
            };
      
        case UPDATE_RESERVATION:
            newState[action.reservation.id] = action.reservation;
            return newState;
    
        case DELETE_RESERVATION:
            delete newState[action.reservationId];
            return newState;
    
        case CHECK_AVAILABILITY:
            return {
                ...state,
                availability: action.availability,
            };

        default:
            return state;
        }
      };
      
    export default reservationReducer;