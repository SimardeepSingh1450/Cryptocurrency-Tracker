import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const fetchCoinsMarket = createAsyncThunk(
  "fetchCoinsMarket",
  async (coinID, { getState }) => {
    const state = getState();
    const currentCurrency = state.currency.currency;
    const currentSortBy = state.sortBy.sortBy;
    const currPage = state.currPage.currPage;

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
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency}&ids=${coinID}&order=${currentSortBy}&per_page=20&page=${currPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=2`,
        options
      );
    } else {
      response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency}&order=${currentSortBy}&per_page=20&page=${currPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=2`,
        options
      );
    }

    return response.json();
  }
);

export const fetchWatchListCoinsMarket = createAsyncThunk(
  "fetchWatchListCoinsMarket",
  async (coins, { getState }) => {
    if (coins.length == 0) return null;

    const state = getState();
    const currentCurrency = state.currency.currency;
    const currentSortBy = state.sortBy.sortBy;

    let coinsString = coins.join("%2C");

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency}&order=${currentSortBy}&ids=${coinsString}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=2`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-NiMK8fS31KfuJw3L2tEkXLkM",
      },
    };

    let res = await fetch(url, options);
    let data = await res.json();
    // console.log(data);
    return data;
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

export const fetchCoinData = createAsyncThunk(
  "fetchCoinData",
  async (coinID) => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinID}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=true`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-NiMK8fS31KfuJw3L2tEkXLkM",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }
);

export const fetchChartData = createAsyncThunk(
  "fetchChartData",
  async (coinID, { getState }) => {
    const state = getState();
    let currency = state.currency.currency;
    let days = state.chartDays.chartDays;
    const url = `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${
      currency ? currency : "usd"
    }&days=${days ? days : "7"}&interval=daily&precision=2`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-NiMK8fS31KfuJw3L2tEkXLkM",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }
);

const initialState = {
  coinsMarket: { isLoading: false, data: null, isError: false },
  coinSearch: { isLoading: false, data: null, isError: false },
  coinData: { isLoading: false, data: null, isError: false },
  chartData: { isLoading: false, data: null, isError: false },
  watchListCoinsMarket: { isLoading: false, data: null, isError: false },
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
    //Fetch CoinData Actions
    builder.addCase(fetchCoinData.fulfilled, (state, action) => {
      state.coinData.isLoading = false;
      state.coinData.data = action.payload;
    });
    builder.addCase(fetchCoinData.pending, (state, action) => {
      state.coinData.isLoading = true;
    });
    builder.addCase(fetchCoinData.rejected, (state, action) => {
      state.coinData.isError = true;
    });
    //Fetch ChartData Actions
    builder.addCase(fetchChartData.fulfilled, (state, action) => {
      state.chartData.isLoading = false;
      state.chartData.data = action.payload;
    });
    builder.addCase(fetchChartData.pending, (state, action) => {
      state.chartData.isLoading = true;
    });
    builder.addCase(fetchChartData.rejected, (state, action) => {
      state.chartData.isError = true;
    });
    //Fetch WatchListCoinsMarket Actions
    builder.addCase(fetchWatchListCoinsMarket.fulfilled, (state, action) => {
      state.watchListCoinsMarket.isLoading = false;
      state.watchListCoinsMarket.data = action.payload;
    });
    builder.addCase(fetchWatchListCoinsMarket.pending, (state, action) => {
      state.watchListCoinsMarket.isLoading = true;
    });
    builder.addCase(fetchWatchListCoinsMarket.rejected, (state, action) => {
      state.watchListCoinsMarket.isError = true;
    });
  },
});

export default dataSlice.reducer;
