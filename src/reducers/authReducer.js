import { types } from "../types/types";

const initialSate = {
    checking: true,
    //uid: null,
    //name: null
}

export const authReducer = ( state = initialSate, action) => {
  switch (action.type) {
      case types.authLogin:
          return {
              ...state,
                checking: false,
                ...action.payload
          };

      case types.authStartRegister:
          return {
              ...state,
                checking: false,
                ...action.payload
          };
          
      case types.authCheckingFinished:
          return {
              ...state,
                checking: false,
          };

      case types.authLogout:
          return {
            //   ...state,
                checking: false,
          };
  
      default:
          return state;
  }
}