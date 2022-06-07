import { types } from "../types/types";

const initialState = {
    userList: [],
    activeUser: {},
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
                userList: state.userList.map(e => (e.id === action.payload.id ? action.payload : e))
            };

        case types.userLoaded:
            return {
                ...state,
                activeUser: action.payload
            };

        case types.userCleared:
            return {
                ...state,
                activeUser: {}
            };

        case types.usersCleared:
            return {
                ...state,
                userList: []
            };

        case types.userUpdated:
            return {
                ...state,
                activeUser: action.payload
            }

        default:
            return state;
    }
}