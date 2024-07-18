"use client";
import { useRef, useState } from "react";
import Search from "./Search"
import { MdCurrencyExchange } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setCurrency } from "@/redux/slice/currencySlice";
import { useSelector } from "react-redux";
import { fetchCoinsMarket } from "@/redux/slice/dataSlice";
import { setSortBy } from "@/redux/slice/sortBySlice";
import { IoMdRefreshCircle } from "react-icons/io";

const Filters = () => {
  //prop drilling to Search.jsx
  const [coinID,setCoinID] = useState(null);
  const dispatch = useDispatch();
  const currencyRef = useRef(null);
  let currentCurrency = useSelector((state) => state.currency.currency)

  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    dispatch(setCurrency(val));
    if(coinID!=null){
      dispatch(fetchCoinsMarket(coinID));
    }else{
      dispatch(fetchCoinsMarket(null));
    }
    currencyRef.current.value = "";
  }

  const handleSort = (e) =>{
      e.preventDefault();
      let val = e.target.value;
      // console.log('sort value->',val);
      dispatch(setSortBy(val));
      dispatch(fetchCoinsMarket(coinID));
  }

  const refreshCoinsMarket = (e) => {
      dispatch(fetchCoinsMarket(coinID));
  }

  return (
    <div className="w-full h-12 border-2 border-gray-700 rounded-lg flex items-center justify-between relative">
      <Search setCoinID={setCoinID}/>
      <div className="flex mr-7">
        <form onSubmit={handleCurrencySubmit} className="relative flex items-center">
          <label htmlFor="currency" className="capitalize relative flex justify-center items-center mr-2 font-bold">currency :</label>
          <input ref={currencyRef} type="text" name="currency" placeholder={`${currentCurrency}`} className="w-16 rounded bg-gray-700 placeholder:text-white pl-2 required outline-0 border border-transparent focus:border-green-500 leading-4"/>
          <button type="submit" className="ml-2 cursor-pointer">
            <MdCurrencyExchange className="w-full h-auto text-xl text-green-500"/>
          </button>
        </form>
      </div>
      <label className="relative flex items-center justify-center">
        <span className="font-bold mr-2">Sort by : </span>
          <select onClick={handleSort} name="sortby" className="rounded bg-gray-700 text-base pl-2 pr-10 mr-2 py-1 leading-4 capitalize focus:outline-0">
          <option value="market_cap_desc">market cap desc</option>
            <option value="market_cap_asc">market cap asc</option>
            <option value="volume_desc">volume desc</option>
            <option value="volume_asc">volume asc</option>
            <option value="id_desc">id desc</option>
            <option value="id_asc">id asc</option>
          </select>
          <IoMdRefreshCircle className="cursor-pointer text-2xl mr-2 text-green-500" onClick={()=>{refreshCoinsMarket()}}/>
      </label>
    </div>
  )
}

export default Filters