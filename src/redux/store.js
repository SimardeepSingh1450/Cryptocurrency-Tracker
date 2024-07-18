import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slice/dataSlice";
import currencyReducer from "./slice/currencySlice";
import sortByReducer from "./slice/sortBySlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    currency: currencyReducer,
    sortBy: sortByReducer,
  },
});
