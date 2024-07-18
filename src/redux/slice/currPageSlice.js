import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currPage: 1,
};

const currPageSlice = createSlice({
  name: "currPage",
  initialState,
  reducers: {
    incrCurrPage: (state) => {
      state.currPage += 1;
    },
    decrCurrPage: (state) => {
      state.currPage -= 1;
    },
    setCurrPage: (state, action) => {
      state.currPage = action.payload;
    },
  },
});

export const { setCurrPage, incrCurrPage, decrCurrPage } =
  currPageSlice.actions;
export default currPageSlice.reducer;
