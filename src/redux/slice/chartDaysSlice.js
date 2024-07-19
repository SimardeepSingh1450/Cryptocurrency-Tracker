import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chartDays: 1,
};

const chartDaysSlice = createSlice({
  name: "chartDays",
  initialState,
  reducers: {
    setChartDays: (state, action) => {
      state.chartDays = action.payload;
    },
  },
});

export const { setChartDays } = chartDaysSlice.actions;
export default chartDaysSlice.reducer;
