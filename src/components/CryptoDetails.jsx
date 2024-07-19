"use client";
import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdArrowDropDownCircle } from "react-icons/md";
import Chart from './Chart';

const HighLowIndicator = ({currentPrice,high,low}) => {
    const [green,setGreen] = useState();

    useEffect(()=>{
        let total = high - low;
        let greenZone = ((high - currentPrice)*100)/total;
        setGreen(Math.ceil(greenZone))
    },[currentPrice,high,low])

    return (
        <>
            <span className='bg-red-500 h-1.5 rounded-l-lg w-[50%]' style={{width: `${100 - green}%`}}/>
            <span className='bg-green-500 h-1.5 rounded-r-lg w-[50%]' style={{width: `${green}%`}}/>
        </>
    )
}

const CryptoDetails = ({setOpenModel}) => {
    const [container, setContainer] = useState(null);
    let coinData = useSelector((state) => state.data.coinData.data)
    let coinDataLoading = useSelector((state) => state.data.coinData.isLoading)
    let currentCurrency = useSelector((state) => state.currency.currency);

    const handleOutClick = () => {
        setOpenModel(false);
    }

    useEffect(() => {
        setContainer(document.getElementById('model-container'));
    }, []);

  if (!container) return null;
  return ReactDOM.createPortal(
    <div onClick={()=>handleOutClick()} className='fixed top-0 w-full h-full bg-gray-700 bg-opacity-70 backdrop-blur-sm flex items-center justify-center'>
        <div onClick={(e)=>e.stopPropagation()} className='w-[65%] h-[75%] bg-gray-700 bg-opacity-75 rounded-lg text-white relative'>
        
        {
            coinDataLoading ? <h1>Loading...</h1> : 
            coinData? 
            <div className='flex items-center justify-between h-full w-full p-4'>
                <div className='flex flex-col w-[45%] h-full pr-2'>
                    <div className='flex w-full items-center'>
                        <img className='w-[3rem] h-[3rem] mx-1.5' src={coinData.image.large} alt={coinData.id}/>
                        <h1 className='text-xl capitalize font-medium'>{coinData.name}</h1>
                        <span className='text-sm py-0.5 px-2.5 ml-2 bg-green-500 text-green-500 bg-opacity-25 rounded uppercase'>{coinData.symbol}</span>
                    </div>

                <div className='flex w-full mt-6'>
                    <div className='flex flex-col w-full'>
                        <div className='flex justify-between'>
                            <span className='text-sm capitalize text-gray-100'>Price</span>
                            <div className={`py-0.5 text-sm px-1 ml-2 font-medium flex items-center rounded uppercase bg-opacity-25 ${coinData.market_data.price_change_percentage_24h < 0 ? ('bg-red-500 text-red-500') : ('bg-green-500 text-green-500')}`}>
                                <span>{Number(coinData.market_data.price_change_percentage_24h).toFixed(2)}%</span>
                                {
                                    coinData.market_data.price_change_percentage_24h > 0 ? (<MdArrowDropDownCircle className='rotate-180 text-xl'/>) : (<MdArrowDropDownCircle className='text-xl'/>)
                                }
                            </div>
                        </div>
                    <h2 className='text-lg font-bold'>{new Intl.NumberFormat("en-IN",{style:"currency",currency:currentCurrency}).format(coinData.market_data.current_price[currentCurrency])}</h2>
                    </div>
                </div>
                
                <div className='flex w-full mt-4 justify-between'>
                    <div className='flex flex-col'>
                        <span className='text-sm capitalize text-gray-100'>Market Cap</span>
                        <h2 className='text-base font-bold'>
                        {new Intl.NumberFormat("en-IN",{
                            style:"currency",
                            currency:currentCurrency,
                            minimumFractionDigits:0}).format(coinData.market_data.market_cap[currentCurrency])}
                        </h2>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm capitalize text-gray-100'>Fully Diluted Valuation</span>
                        <h2 className='text-base font-bold'>
                        {new Intl.NumberFormat("en-IN",{
                            style:"currency",
                            currency:currentCurrency,
                            notation:'compact'}).format(coinData.market_data.fully_diluted_valuation[currentCurrency])}
                        </h2>
                    </div>
                </div>
                
                <div className='flex flex-col w-full mt-4 justify-between'>
                        <span className='text-sm capitalize text-gray-100'>Total Volume</span>
                        <h2 className='text-base font-bold'>
                        {new Intl.NumberFormat("en-IN",{
                            style:"currency",
                            currency:currentCurrency,
                            minimumFractionDigits:0}).format(coinData.market_data.total_volume[currentCurrency])}
                        </h2>
                </div>

                <div className='flex w-full mt-4 justify-between'>
                    <HighLowIndicator 
                    currentPrice={coinData.market_data.current_price[currentCurrency]}
                    high={coinData.market_data.high_24h[currentCurrency]}
                    low={coinData.market_data.low_24h[currentCurrency]}/>
                </div>

                <div className='flex w-full mt-4 justify-between'>
                    <div className='flex flex-col'>
                        <span className='text-sm capitalize text-gray-100'>Low 24H</span>
                        <h2 className='text-base font-bold'>
                        {new Intl.NumberFormat("en-IN",{
                            style:"currency",
                            currency:currentCurrency,
                            minimumFractionDigits:5}).format(coinData.market_data.low_24h[currentCurrency])}
                        </h2>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm capitalize text-gray-100'>high 24H</span>
                        <h2 className='text-base font-bold'>
                        {new Intl.NumberFormat("en-IN",{
                            style:"currency",
                            currency:currentCurrency,
                            minimumFractionDigits:5}).format(coinData.market_data.high_24h[currentCurrency])}
                        </h2>
                    </div>
                </div>

                <div className='flex w-full mt-4 justify-between'>
                    <div className='flex flex-col'>
                        <span className='text-sm capitalize text-gray-100'>max supply</span>
                        <h2 className='text-base font-bold'>
                        {new Intl.NumberFormat("en-IN",{
                            style:"currency",
                            currency:currentCurrency,
                            minimumFractionDigits:0}).format(coinData.market_data.max_supply)}
                        </h2>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm capitalize text-gray-100'>circulating supply</span>
                        <h2 className='text-base font-bold'>
                        {new Intl.NumberFormat("en-IN",{
                            style:"currency",
                            currency:currentCurrency,
                            minimumFractionDigits:0}).format(coinData.market_data.circulating_supply)}
                        </h2>
                    </div>
                </div>

                <div className='flex w-full mt-4 justify-between'>
                    <div className='flex flex-col'>
                        <a target={"blank"} className='text-sm bg-gray-800 text-gray-100 px-1.5 py-1 my-1 rounded' href={`${coinData?.links?.homepage[0]}`}>{coinData.links.homepage[0].substring(0,30)}</a>
                        <a target={"blank"} className='text-sm bg-gray-800 text-gray-100 px-1.5 py-1 my-1 rounded' href={`${coinData?.links?.blockchain_site[0]}`}>{coinData?.links?.blockchain_site[0].substring(0,30)}</a>
                        {
                            coinData?.links?.official_forum_url[0] && <a target={"blank"} className='text-sm bg-gray-800 text-gray-100 px-1.5 py-1 my-1 rounded' href={`${coinData?.links?.official_forum_url[0]}`}>{coinData?.links?.official_forum_url[0].substring(0,30)}</a>
                        }
                    </div>
                    <div className='flex flex-col content-start'>
                        <span className='text-sm capitalize text-gray-100'>sentiment</span>
                        <div className='flex justify-between'>
                            <div className={`py-0.5 text-sm px-1 ml-2 my-1 font-medium flex items-center rounded uppercase bg-opacity-25 bg-green-500 text-green-500`}>
                                <span>{Number(coinData.sentiment_votes_up_percentage).toFixed(2)}%</span>
                                <MdArrowDropDownCircle className='rotate-180 text-xl'/>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className={`py-0.5 text-sm px-1 my-1 ml-2 font-medium flex items-center rounded uppercase bg-opacity-25 bg-red-500 text-red-500`}>
                                <span>{Number(coinData.sentiment_votes_down_percentage).toFixed(2)}%</span>
                               <MdArrowDropDownCircle className='text-xl'/>
                                
                            </div>
                        </div>
                    </div>

                </div>

                </div>
                <div className='flex flex-col w-[55%] h-full pl-3'>
                    <Chart id={coinData.id}/>

                    <div className='flex flex-col mt-4'>
                        <h3 className='text-white py-1'><span className='font-bold text-gray-200 capitalize mr-1'>Market cap rank: </span>{coinData.market_cap_rank}</h3>
                        <h3 className='text-white py-1 font-bold'>About {coinData.name} :</h3>
                        <h3>{coinData.description.en.substring(0,350) + '...'}</h3>
                    </div>
                </div>
            </div>
            : null
        }

        </div>
        </div>,
    container
  )
}

export default CryptoDetails