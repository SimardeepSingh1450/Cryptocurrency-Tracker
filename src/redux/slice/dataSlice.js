import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCoinsMarket = createAsyncThunk(
  "fetchCoinsMarket",
  async (coinID, { getState }) => {
    const state = getState();
    const currentCurrency = state.currency.currency;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-NiMK8fS31KfuJw3L2tEkXLkM",
      },
    };
    let response;
    if (coinID != null) {
      response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency}&ids=${coinID}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=2`,
        options
      );
    } else {
      response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=2`,
        options
      );
    }

    return response.json();
  }
);

export const fetchCoinSearch = createAsyncThunk(
  "fetchCoinSearch",
  async (query) => {
    const url = `https://api.coingecko.com/api/v3/search?query=${query}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-NiMK8fS31KfuJw3L2tEkXLkM",
      },
    };
    const response = await fetch(url, options);
    return response.json();
  }
);

const initialState = {
  coinsMarket: { isLoading: false, data: null, isError: false },
  coinSearch: { isLoading: false, data: null, isError: false },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  extraReducers: (builder) => {
    //Coins Market Actions
    builder.addCase(fetchCoinsMarket.fulfilled, (state, action) => {
      state.coinsMarket.isLoading = false;
      state.coinsMarket.data = action.payload;
    });
    builder.addCase(fetchCoinsMarket.pending, (state, action) => {
      state.coinsMarket.isLoading = true;
    });
    builder.addCase(fetchCoinsMarket.rejected, (state, action) => {
      state.coinsMarket.isError = true;
    });
    //Coin Search Actions
    builder.addCase(fetchCoinSearch.fulfilled, (state, action) => {
      state.coinSearch.isLoading = false;
      state.coinSearch.data = action.payload;
    });
    builder.addCase(fetchCoinSearch.pending, (state, action) => {
      state.coinSearch.isLoading = true;
    });
    builder.addCase(fetchCoinSearch.rejected, (state, action) => {
      state.coinSearch.isError = true;
    });
  },
});

export default dataSlice.reducer;
