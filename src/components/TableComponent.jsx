"use client";
import { useSelector } from "react-redux";
import { IoIosAddCircle } from "react-icons/io";
import Pagination from "./Pagination";

const TableComponent = () => {
    let currentCurrency = useSelector((state) => state.currency.currency)
    let cryptoData = useSelector((state) => state.data.coinsMarket.data);

  return (
    <>
    <div className="flex flex-col mt-5 border border-gray-600 rounded">
        {cryptoData ? <table className="w-full table-auto">
            <thead className="capitalize text-base text-gray-700 font-medium border-b border-gray-700">
                <tr>
                    <th className="py-1">asset</th>
                    <th className="py-1">name</th>
                    <th className="py-1">price</th>
                    <th className="py-1">total volume</th>
                    <th className="py-1">market cap change (24H)</th>
                    <th className="py-1">1H</th>
                    <th className="py-1">24H</th>
                    <th className="py-1">7D</th>
                </tr>
            </thead>
            <tbody>
                {cryptoData.map((item)=>{
                    return (
                        <tr className="text-center text-base border-b border-gray-700 hover:bg-gray-600 last:border-b-0">
                    
                    <td className="py-4 flex flex-row items-center text-center uppercase">
                        <div className="flex flex-row items-center text-center mr-[-3vw]">
                            <button className="outline-0 border-0 bg-none cursor-pointer hover:text-green-500 ml-[1vw]"><IoIosAddCircle className="text-2xl ml-[0.5rem]"/></button>
                            <img className="w-[1.2rem] h-[1.2rem] mx-2" src={item.image} alt={item.name}/>
                            <span>{item.symbol}</span>
                        </div>
                    </td>
                    <td className="py-4">{item.name}</td>
                    <td className="py-4">{new Intl.NumberFormat("en-IN",{style:"currency",currency:currentCurrency}).format(item.current_price)}</td>
                    <td className="py-4">{item.total_volume}</td>
                    <td className="py-4">{item.market_cap_change_percentage_24h}%</td>
                    <td className={`py-4 ${item.price_change_percentage_1h_in_currency > 0 ? `text-green-400` : `text-red-400`}`}>{Number(item.price_change_percentage_1h_in_currency).toFixed(2)}</td>
                    <td className={`py-4 ${item.price_change_percentage_24h_in_currency > 0 ? `text-green-400` : `text-red-400`}`}>{Number(item.price_change_percentage_24h_in_currency).toFixed(2)}</td>
                    <td className={`py-4 ${item.price_change_percentage_7d_in_currency > 0 ? `text-green-400` : `text-red-400`}`}>{Number(item.price_change_percentage_7d_in_currency).toFixed(2)}</td>
                </tr>
                    )
                })}
            </tbody>
        </table>: <div className="flex items-center justify-center text-center mt-2 mb-2"><h2>Fetching Data...</h2></div>}
        
    </div>
    {/*Pagination */}
    <div className="flex items-center justify-between mt-4 capitalize h-[2rem]">
        <span/>
        <Pagination/>
    </div>
    </>
  )
}

export default TableComponent