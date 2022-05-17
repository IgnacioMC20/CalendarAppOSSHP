import { types } from "../types/types";

const initialState = {
    events: [],
    activeEvent: null,
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.eventAddNew:
        return {
            ...state,
            events: [...state.events, action.payload]
        };

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventUnsetActive:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map( e => (e.id === action.payload.id ? action.payload : e))
            }

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter( e => e.id !== state.activeEvent.id ),
                activeEvent: null
            }

        case types.eventLoaded:
            return {
                ...state,
                events: [ ...action.payload],
                activeEvent: null
            }

        case types.eventLogout:
            return {
                ...state,
                events: [],
                activeEvent: null
            }

        default:
            return state;
    }
}
