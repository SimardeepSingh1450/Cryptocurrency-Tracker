import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortBy: "inr",
};

const sortBySlice = createSlice({
  name: "sortBy",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      if (action.payload == null || action.payload == "") {
        state.sortBy = "market_cap_desc";
      } else {
        state.sortBy = action.payload;
      }
    },
  },
});

export const { setSortBy } = sortBySlice.actions;
export default sortBySlice.reducer;
