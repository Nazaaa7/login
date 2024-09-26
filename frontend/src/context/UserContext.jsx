// src/context/UserContext.jsx
import { createContext, useReducer } from "react";
import { userReducer } from "./userReducer";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const obtenerToken = () =>
    JSON.parse(localStorage.getItem("userData")) || { isLogged: false };

  const [state, stateDispatch] = useReducer(userReducer, {}, obtenerToken);

  return (
    <UserContext.Provider value={{ state, stateDispatch }}>
      {children}
    </UserContext.Provider>
  );
};
