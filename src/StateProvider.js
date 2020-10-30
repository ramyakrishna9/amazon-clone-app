import React, { createContext, useReducer, useContext } from "react";

// this is the data layer
export const StateContext = createContext();

//build provider
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//pull the information from data layer
export const useStateValue = () => useContext(StateContext);