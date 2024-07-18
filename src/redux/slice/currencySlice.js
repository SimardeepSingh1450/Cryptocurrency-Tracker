import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "inr",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      if (action.payload == null || action.payload == "") {
        state.currency = "inr";
      } else if (action.payload != "inr" && action.payload != "usd") {
        state.currency = "inr";
      } else {
        state.currency = action.payload;
      }
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
