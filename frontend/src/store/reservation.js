import csrfFetch from "./csrf";

const FETCH_RESERVATION = 'reservation/FETCH_RESERVATION';
const CREATE_RESERVATION = 'reservation/CREATE_RESERVATION';
const UPDATE_RESERVATION = 'reservation/UPDATE_RESERVATION';
const DELETE_RESERVATION = 'reservation/DELETE_RESERVATION';

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
  
    const reservationReducer = (state = {}, action) => {
        const newState = { ...state };
      
        switch (action.type) {
          case FETCH_RESERVATION:
            newState[action.reservation.id] = action.reservation;
            return newState;
      
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
      
          default:
            return state;
        }
      };
      
    export default reservationReducer;