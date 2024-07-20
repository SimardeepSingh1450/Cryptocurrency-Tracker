"use client";
import { useSelector } from "react-redux";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import Pagination from "./Pagination";
import { useDispatch } from "react-redux";
import { fetchCoinData } from "@/redux/slice/dataSlice";

const SaveBtn = ({data,saveCoin,removeCoin,coins}) => {
    const handleOnClick = (e) => {
        e.preventDefault();

        if(coins.includes(data.id)){
            removeCoin(data.id);
        }else{
            saveCoin(data.id);
        }
    }

    return (
    <button onClick={(e)=>handleOnClick(e)} className="outline-0 border-0 bg-none cursor-pointer">
        {
            !coins.includes(data.id) ? 
            <IoIosAddCircle className=" text-green-500 text-2xl ml-[0.5rem]"/>
            :
            <IoIosRemoveCircle className="text-red-500 text-2xl ml-[0.5rem]"/>
        }
        </button>
    )
}

const TableComponent = ({setCoinID, coinID, setOpenModel,setHoldingsModel, saveCoin, removeCoin, coins, currentCoinData,setCurrentCoinData}) => {
    const dispatch = useDispatch();
    let currentCurrency = useSelector((state) => state.currency.currency)
    let cryptoData = useSelector((state) => state.data.coinsMarket.data);
    let dataisLoading = useSelector((state) => state.data.coinsMarket.isLoading);

    const handleOnClick = (val) =>{
        setOpenModel(true);
        dispatch(fetchCoinData(val.id));
    }

    const handleViewHoldings = (item) => {
        setHoldingsModel(true);
        setCurrentCoinData(item);
    }

  return (
    <>
    <div className="flex flex-col lg:mt-5 border border-gray-600 rounded xs:mt-20">
        {cryptoData ? <table className="w-full table-auto">
            <thead className="capitalize text-base text-gray-700 font-medium border-b border-gray-700">
                <tr>
                    <th className="py-1">asset</th>
                    <th className="py-1 lg:table-cell hidden">name</th>
                    <th className="py-1 lg:table-cell hidden">price</th>
                    <th className="py-1 lg:table-cell hidden">total volume</th>
                    <th className="py-1">market cap change (24H)</th>
                    <th className="py-1 lg:table-cell hidden">public companies holdings</th>
                    <th className="py-1 lg:table-cell hidden">1H</th>
                    <th className="py-1 lg:table-cell hidden">24H</th>
                    <th className="py-1 lg:table-cell hidden">7D</th>
                </tr>
            </thead>
            <tbody>
                {
                !dataisLoading ? cryptoData.map((item)=>{
                    return (
                        <tr className="text-center text-base border-b border-gray-700 hover:bg-gray-600 last:border-b-0 cursor-pointer">
                    
                    <td className="py-4 flex flex-row items-center text-center uppercase">
                        <div className="flex flex-row items-center text-center mr-[-3vw]">
                            <SaveBtn data={item} saveCoin={saveCoin} removeCoin={removeCoin} coins={coins}/>
                            <img className="w-[1.2rem] h-[1.2rem] mx-2" src={item.image} alt={item.name}/>
                            <span onClick={()=>{handleOnClick(item)}}>{item.symbol}</span>
                        </div>
                    </td>
                    <td onClick={()=>{handleOnClick(item)}} className="py-4 lg:table-cell hidden">{item.name}</td>
                    <td className="lg:table-cell hidden py-4">{new Intl.NumberFormat("en-IN",{style:"currency",currency:currentCurrency}).format(item.current_price)}</td>
                    <td className="py-4 lg:table-cell hidden">{item.total_volume}</td>
                    <td className="py-4">{item.market_cap_change_percentage_24h}%</td>

                    {
                        item.id == "ethereum" ||item.id == "bitcoin" ?
                        <td className="py-4 lg:table-cell hidden"><span className="border-0 rounded p-1 bg-[rgb(34,197,94)] text-black font-bold" onClick={()=>{handleViewHoldings(item)}}>View Holdings</span></td>
                        :
                        <td className="py-4 lg:table-cell hidden"><span className="border-0 rounded p-1 bg-red-500 text-black font-bold" >No data</span></td>
                    }

                    <td className={`lg:table-cell hidden py-4 ${item.price_change_percentage_1h_in_currency > 0 ? `text-green-400` : `text-red-400`}`}>{Number(item.price_change_percentage_1h_in_currency).toFixed(2)}</td>
                    <td className={`lg:table-cell hidden py-4 ${item.price_change_percentage_24h_in_currency > 0 ? `text-green-400` : `text-red-400`}`}>{Number(item.price_change_percentage_24h_in_currency).toFixed(2)}</td>
                    <td className={`py-4 lg:table-cell hidden ${item.price_change_percentage_7d_in_currency > 0 ? `text-green-400` : `text-red-400`}`}>{Number(item.price_change_percentage_7d_in_currency).toFixed(2)}</td>
                </tr>
                    )
                }) : null}
            </tbody>
        </table>: <div className="flex items-center justify-center text-center mt-2 mb-2">
            <h2>Fetching Data...</h2>
            </div>}
        {/*LoadingData... */}
        {
            dataisLoading ?  <div className="flex items-center justify-center text-center mx-auto mt-2 mb-2">
                <div className="w-8 h-8 border-4 border-green-500 rounded-full border-b-gray-700 animate-spin mr-5"/>
                <h2>Loading Data...</h2></div> : null
        }
    </div>
    {/*Pagination */}
    <div className="flex items-center justify-between mt-4 capitalize h-[2rem]">
        <span/>
        <Pagination coinID={coinID}/>
    </div>
    </>
  )
}

export default TableComponent