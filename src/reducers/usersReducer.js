import { types } from "../types/types";

const initialState = {
    userList: [],
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.usersLoaded:
            return {
                ...state,
                userList: action.payload
            };
        case types.usersStartAdmin:
            return {
                ...state,
                userList: state.userList.map( e => (e.id === action.payload.id ? action.payload : e))
            };

        default:
            return state;
    }
}