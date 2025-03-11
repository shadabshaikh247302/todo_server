"use client";
import { createContext, useReducer } from "react";

const month = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

const initialState = []; // Initial state for the reducer

export const MonthlyContext = createContext();

async function addTaskMonthly(authData, body) {
  API.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${authData.token}`;
    return req; // Ensure the modified request is returned
  });

  const response = await API.post("/user/addTaskMonthly", body);
  return response?.status;
}

async function getTaskMonthly(authData) {
  API.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${authData.token}`;
    return req; // Ensure the modified request is returned
  });
  const response = await API.get("/user/getTaskMonthly");
  return response?.data;
}

async function deleteTaskMonthly(id) {
 
  const response = await API.delete(`/user/deleteTaskMonthly/${id}`);
  return response?.status;
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_PLAN":
      return [...action.payload];
    default:
      return state;
  }
}

export const MonthlyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MonthlyContext.Provider
      value={{
        MonthlyPlan: state, // Explicitly expose state as MonthlyPlan
        dispatch,
        month,
        addTaskMonthly,
        getTaskMonthly,
        deleteTaskMonthly
      }}
    >
      {children}
    </MonthlyContext.Provider>
  );
};
