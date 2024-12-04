import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

// Configure the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

// Monitor token changes
store.subscribe(() => {
  const state = store.getState();
  const token = state.auth?.token;
  if (token) localStorage.setItem("authToken", token);
});

export default store;
