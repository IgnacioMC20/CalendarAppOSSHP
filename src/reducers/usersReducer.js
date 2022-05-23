import { types } from "../types/types";


export const usersReducer = (state = [], action) => {
    switch (action.type) {
        case types.usersLoaded:
            console.log(action.payload);
            return {
                ...state,
                users: [action.payload]
            };

        default:
            return state;
    }
}