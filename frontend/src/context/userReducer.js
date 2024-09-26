// src/context/userReducer.js
import { userType } from "./userTypes";

export const userReducer = (state, action) => {
  switch (action.type) {
    case userType.login:
      return {
        ...state,
        isLogged: true,
        usuario: action.payload.usuario,
        token: action.payload.token,
        role: action.payload.role,
      };
    case userType.logOut:
      return {
        ...state,
        isLogged: false,
        usuario: null,
        token: null,
        role: null,
      };
    default:
      return state;
  }
};
