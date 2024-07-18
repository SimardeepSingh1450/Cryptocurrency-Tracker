"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {fetchCoinSearch,fetchCoinsMarket} from '@/redux/slice/dataSlice'
import { useSelector, useDispatch } from "react-redux";

const Search = ({setCoinID}) => {
    const dispatch = useDispatch();
    const coinSearchData = useSelector((state) => state.data.coinSearch);
    const coinsData = coinSearchData!=null ? coinSearchData.data != null ? coinSearchData.data.coins : null : null;
    // console.log(coinSearchData); 

    const [input,setInput] = useState("");

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        if(input==""){
            dispatch(fetchCoinsMarket());
        }else{
            dispatch(fetchCoinSearch(input));
        }
    }

    const handleListClick = (item) => {
        dispatch(fetchCoinsMarket(item.id));
        setCoinID(item.id);
        setInput("");
    }

  return (
    <div className="relative">
    <form onSubmit={handleOnSubmit} className="w-96 relative flex items-center ml-2">
        <input value={input} onChange={(e)=>{setInput(e.target.value)}} type="text" name="search" className="w-full rounded bg-gray-600 placeholder:text-gray-500 pl-2 py-0.5 required outline-0 border border-transparent focus:border-green-600" placeholder="Search"/>
        <button type="submit" className="absolute right-1 cursor-pointer">
            <FaSearch className="text-xl text-green-500"/>
        </button>
    </form>
    {
        input.length > 0 ? 
            <ul className="absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-grey-600 bg-opacity-60 backdrop-blur-md">
                {
                    coinsData != null ? coinsData.map((item)=>{
                        return (
                        <li onClick={()=>{handleListClick(item)}} className="flex items-center ml-4 my-2 cursor-pointer">
                            <img className="w-[1rem] h-[1rem] mx-2" src={item.thumb} alt={item.name}/>
                        <span>{item.name}</span>
                        </li>);
                    }) : coinSearchData.isLoading == true ? (<div className="w-full h-full flex justify-center items-center">
                    <div className="w-8 h-8 border-4 border-green-500 rounded-full border-b-gray-700 animate-spin"/>
                    <span className="ml-2">Fetching results...</span>
                </div>) : (<div className="w-full h-full flex justify-center items-center">
                        <span>Click on Search Button</span>
                    </div>)
                }
            </ul>
        : null
    }
    </div>
  )
}

export default Search