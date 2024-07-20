/* eslint-disable */
"use client";
import { useSelector } from "react-redux";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  fetchCoinData,
  fetchWatchListCoinsMarket,
} from "@/redux/slice/dataSlice";
import { useEffect } from "react";

const SaveBtn = ({ data, saveCoin, removeCoin, coins, setCoins }) => {
  const dispatch = useDispatch();

  const handleOnClick = (e) => {
    e.preventDefault();

    if (coins.includes(data.id)) {
      removeCoin(data.id);
    } else {
      saveCoin(data.id);
    }
  };

  return (
    <button
      onClick={(e) => handleOnClick(e)}
      className="outline-0 border-0 bg-none cursor-pointer ml-[1vw]"
    >
      {!coins.includes(data.id) ? (
        <IoIosAddCircle className=" text-green-500 text-2xl ml-[0.5rem]" />
      ) : (
        <IoIosRemoveCircle className="text-red-500 text-2xl ml-[0.5rem]" />
      )}
    </button>
  );
};

const MyWatchList = ({
  setCoinID,
  coinID,
  setOpenModel,
  setHoldingsModel,
  saveCoin,
  removeCoin,
  coins,
  setCoins,
  setCurrCoinData,
}) => {
  const dispatch = useDispatch();
  let currentCurrency = useSelector((state) => state.currency.currency);
  let watchListCoinsMarket = useSelector(
    (state) => state.data.watchListCoinsMarket.data
  );
  let dataisLoading = useSelector(
    (state) => state.data.watchListCoinsMarket.isLoading
  );

  const handleOnClick = (val) => {
    if (window.innerWidth < 1050) return null;
    setOpenModel(true);
    dispatch(fetchCoinData(val.id));
  };

  const handleViewHoldings = (item) => {
    setHoldingsModel(true);
    setCurrCoinData(item);
  };

  useEffect(() => {
    dispatch(fetchWatchListCoinsMarket(coins));
  }, []);

  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <div className="flex flex-col mt-5 border border-gray-600 rounded">
        {watchListCoinsMarket ? (
          <table className="w-full table-auto">
            <thead className="capitalize text-base text-gray-700 font-medium border-b border-gray-700">
              <tr>
                <th className="py-1">asset</th>
                <th className="lg:table-cell hidden py-1">name</th>
                <th className="lg:table-cell hidden py-1">price</th>
                <th className="lg:table-cell hidden py-1">total volume</th>
                <th className="py-1">market cap change (24H)</th>
                <th className="lg:table-cell hidden py-1">
                  public companies holdings
                </th>
                <th className="lg:table-cell hidden py-1">1H</th>
                <th className="lg:table-cell hidden py-1">24H</th>
                <th className="lg:table-cell hidden py-1">7D</th>
              </tr>
            </thead>
            <tbody>
              {!dataisLoading
                ? watchListCoinsMarket?.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="text-center text-base border-b border-gray-700 hover:bg-gray-600 last:border-b-0 cursor-pointer"
                      >
                        <td
                          key={index + 1}
                          className="py-4 flex flex-row items-center text-center uppercase"
                        >
                          <div
                            key={index + 2}
                            className="flex flex-row items-center text-center mr-[-3vw]"
                          >
                            <SaveBtn
                              data={item}
                              saveCoin={saveCoin}
                              removeCoin={removeCoin}
                              coins={coins}
                              setCoins={setCoins}
                              key={index + 3}
                            />
                            <img
                              className="w-[1.2rem] h-[1.2rem] mx-2"
                              src={item.image}
                              alt={item.name}
                              key={item.image}
                            />
                            <span
                              key={item.symbol}
                              onClick={() => {
                                handleOnClick(item);
                              }}
                            >
                              {item.symbol}
                            </span>
                          </div>
                        </td>
                        <td
                          onClick={() => {
                            handleOnClick(item);
                          }}
                          className="py-4 lg:table-cell hidden"
                          key={item.name}
                        >
                          {item.name}
                        </td>
                        <td
                          key={item.current_price}
                          className="lg:table-cell hidden py-4"
                        >
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: currentCurrency,
                          }).format(item.current_price)}
                        </td>
                        <td
                          key={item.total_volume}
                          className="lg:table-cell hidden py-4"
                        >
                          {item.total_volume}
                        </td>
                        <td className="py-4">
                          {item.market_cap_change_percentage_24h}%
                        </td>
                        {item.id == "ethereum" || item.id == "bitcoin" ? (
                          <td
                            key={item.id + 1}
                            className="lg:table-cell hidden py-4"
                          >
                            <span
                              key={item.id + 2}
                              className="border-0 rounded p-1 bg-[rgb(34,197,94)] text-black font-bold"
                              onClick={() => {
                                handleViewHoldings(item);
                              }}
                            >
                              View Holdings
                            </span>
                          </td>
                        ) : (
                          <td
                            key={index + 4}
                            className="lg:table-cell hidden py-4"
                          >
                            <span className="border-0 rounded p-1 bg-red-500 text-black font-bold">
                              No data
                            </span>
                          </td>
                        )}
                        <td
                          key={item.price_change_percentage_1h_in_currency}
                          className={`lg:table-cell hidden py-4 ${
                            item.price_change_percentage_1h_in_currency > 0
                              ? `text-green-400`
                              : `text-red-400`
                          }`}
                        >
                          {Number(
                            item.price_change_percentage_1h_in_currency
                          ).toFixed(2)}
                        </td>
                        <td
                          key={item.price_change_percentage_24h_in_currency}
                          className={`lg:table-cell hidden py-4 ${
                            item.price_change_percentage_24h_in_currency > 0
                              ? `text-green-400`
                              : `text-red-400`
                          }`}
                        >
                          {Number(
                            item.price_change_percentage_24h_in_currency
                          ).toFixed(2)}
                        </td>
                        <td
                          key={item.price_change_percentage_7d_in_currency}
                          className={`lg:table-cell hidden py-4 ${
                            item.price_change_percentage_7d_in_currency > 0
                              ? `text-green-400`
                              : `text-red-400`
                          }`}
                        >
                          {Number(
                            item.price_change_percentage_7d_in_currency
                          ).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center text-center mt-2 mb-2">
            <h2>No Data</h2>
          </div>
        )}
        {/*LoadingData... */}
        {dataisLoading ? (
          <div className="flex items-center justify-center text-center mx-auto mt-2 mb-2">
            <div className="w-8 h-8 border-4 border-green-500 rounded-full border-b-gray-700 animate-spin mr-5" />
            <h2>Loading Data...</h2>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default MyWatchList;
