import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slice/dataSlice";
import currencyReducer from "./slice/currencySlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    currency: currencyReducer,
  },
});
