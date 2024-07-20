"use client";
import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanyHoldings } from '@/redux/slice/dataSlice';

const HoldingsDetails = ({setHoldingsModel,currCoinData}) => {
    const dispatch = useDispatch();
    const [container, setContainer] = useState(null);
    let currCompanyHoldings = useSelector((state)=> state.data.companyHoldings);
    let isDataLoading = useSelector((state)=> state.data.companyHoldings.isLoading);

    console.log(currCompanyHoldings);

    const handleOutClick = () => {
        setHoldingsModel(false);
    }

    useEffect(() => {
        setContainer(document.getElementById('holdings-model-container'));

        dispatch(fetchCompanyHoldings(currCoinData.id));
    }, []);

    console.log(currCoinData);

  if (!container) return null;
  return ReactDOM.createPortal(
    <div onClick={()=>handleOutClick()} className='fixed top-0 w-full h-full bg-gray-700 bg-opacity-70 backdrop-blur-sm flex items-center justify-center'>
        <div onClick={(e)=>e.stopPropagation()} className='px-5 py-2 w-[80%] h-[75%] bg-gray-700 bg-opacity-75 rounded-lg text-white relative overflow-y-auto'>
        
        {
          isDataLoading ? 
          
          <div className="w-full h-full flex justify-center items-center">
                    <div className="w-8 h-8 border-4 border-green-500 rounded-full border-b-gray-700 animate-spin"/>
                    <span className="ml-2">Fetching Data...</span>
                    </div>
          :
          <div className='flex flex-col'>
            <table className="w-full table-auto">
            <thead className="capitalize text-base text-white font-medium border-b border-white">
                <tr>
                    <th className="py-1">#</th>
                    <th className="py-1">Company</th>
                    <th className="py-1">Symbol</th>
                    <th className="py-1">Country</th>
                    <th className="py-1">total {currCoinData.name}</th>
                    <th className="py-1">entry value (USD)</th>
                    <th className="py-1">today's value (USD)</th>
                    <th className="py-1">% of total {currCoinData.symbol} supply</th>
                </tr>
            </thead>
            <tbody>
                {
                !isDataLoading ? currCompanyHoldings?.data?.companies?.map((item,ind)=>{
                    return (
                        <tr className="text-center text-base border-b border-white hover:bg-gray-800 last:border-b-0 cursor-pointer">

                    <td className="py-4">{ind+1}</td>
                    <td className="py-4">{item.name}</td>
                    <td className="py-4">{item.symbol} %</td>
                    <td className="py-4">{item.country}</td>
                    <td className="py-4">{item.total_holdings}</td>
                    <td className="py-4">{item.total_entry_value_usd}</td>
                    <td className="py-4">{item.total_current_value_usd}</td>
                    <td className="py-4">{item.percentage_of_total_supply}</td>
                </tr>
                    )
                }) : null}
            </tbody>
        </table>
          </div>
        }

        </div>
        </div>,
    container
  )
}

export default HoldingsDetails