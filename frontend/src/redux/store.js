import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./reducers/userReducers.js";
import itemReducers from "./reducers/itemReducers.js";

export const store = configureStore({
  reducer: {
    user: userReducers,
    item: itemReducers,
  },
});
