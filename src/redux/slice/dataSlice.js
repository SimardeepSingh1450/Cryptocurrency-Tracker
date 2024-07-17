import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCoinsMarket = createAsyncThunk(
  "fetchCoinsMarket",
  async () => {
    // console.log("Env is :", process.env.NEXT_PUBLIC_COINS_MARKET_DATA_URL);
    const response = await fetch(process.env.NEXT_PUBLIC_COINS_MARKET_DATA_URL);
    // console.log(response.json());
    return response.json();
  }
);

const initialState = {
  coinsMarket: { isLoading: false, data: null, isError: false },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCoinsMarket.fulfilled, (state, action) => {
      state.coinsMarket.isLoading = false;
      state.coinsMarket.data = action.payload;
    });
    builder.addCase(fetchCoinsMarket.pending, (state, action) => {
      state.coinsMarket.isLoading = true;
    });
    builder.addCase(fetchCoinsMarket.rejected, (state, action) => {
      state.coinsMarket.isError = true;
      // console.log("Error in Redux : ", action.payload);
    });
  },
});

export default dataSlice.reducer;
