"use client";
import { useRef, useState, useEffect } from "react";
import Search from "./Search";
import { MdCurrencyExchange } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setCurrency } from "@/redux/slice/currencySlice";
import { useSelector } from "react-redux";
import { fetchCoinsMarket } from "@/redux/slice/dataSlice";
import { setSortBy } from "@/redux/slice/sortBySlice";
import { IoMdRefreshCircle } from "react-icons/io";
import { setCurrPage } from "@/redux/slice/currPageSlice";

const Filters = ({ coinID, setCoinID }) => {
  const dispatch = useDispatch();
  const currencyRef = useRef(null);
  let currentCurrency = useSelector((state) => state.currency.currency);
  let currentSortVal = useSelector((state) => state.sortBy.sortBy);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    dispatch(setCurrency(val));
    if (coinID != null) {
      dispatch(fetchCoinsMarket(coinID));
    } else {
      dispatch(fetchCoinsMarket(null));
    }
    currencyRef.current.value = "";
  };

  const handleSort = (e) => {
    e.preventDefault();
    let val = e.target.value;
    dispatch(setSortBy(val));
    dispatch(fetchCoinsMarket(coinID));
  };

  const handleReset = () => {
    dispatch(setCurrPage(1));
    setCoinID(null);
    dispatch(setSortBy(""));
    dispatch(fetchCoinsMarket());
  };

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // Set the initial window width

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isMounted) return null; // Ensure server HTML doesn't mismatch

  return (
    <div className="w-full h-12 border-0 rounded-lg flex items-center justify-between relative xs:flex-wrap">
      <Search setCoinID={setCoinID} />
      <div className="lg:w-auto xs:w-full xs:my-3 flex mr-7">
        <form
          onSubmit={handleCurrencySubmit}
          className="relative flex items-center"
        >
          <label
            htmlFor="currency"
            className="capitalize relative flex justify-center items-center mr-2 font-bold"
          >
            currency :
          </label>
          <input
            ref={currencyRef}
            type="text"
            name="currency"
            placeholder={`${currentCurrency}`}
            className="w-16 rounded bg-gray-700 placeholder:text-white pl-2 required outline-0 border border-transparent focus:border-green-500 leading-4"
          />
          <button type="submit" className="ml-2 cursor-pointer">
            <MdCurrencyExchange className="text-2xl text-green-500" />
          </button>
        </form>
      </div>
      <label className="relative flex items-center justify-center">
        <span className="font-bold mr-2">Sort by : </span>
        <select
          onChange={handleSort}
          name="sortby"
          className="rounded bg-gray-700 text-base pl-2 pr-10 mr-2 py-1 leading-4 capitalize focus:outline-0"
          value={currentSortVal}
        >
          <option value="market_cap_desc">market cap desc</option>
          <option value="market_cap_asc">market cap asc</option>
          <option value="volume_desc">volume desc</option>
          <option value="volume_asc">volume asc</option>
          <option value="id_desc">id desc</option>
          <option value="id_asc">id asc</option>
        </select>
      </label>

      {windowWidth > 600 ? (
        <div
          onClick={() => handleReset()}
          className="flex items-center justify-center cursor-pointer border border-green-500 rounded bg-green-500"
        >
          <IoMdRefreshCircle className="text-2xl text-black" />
        </div>
      ) : null}
    </div>
  );
};

export default Filters;
