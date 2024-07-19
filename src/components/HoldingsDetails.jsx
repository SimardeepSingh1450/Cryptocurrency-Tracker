"use client";
import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

const HoldingsDetails = ({setHoldingsModel}) => {
    const [container, setContainer] = useState(null);
    
    const handleOutClick = () => {
        setHoldingsModel(false);
    }

    useEffect(() => {
        setContainer(document.getElementById('holdings-model-container'));
    }, []);

  if (!container) return null;
  return ReactDOM.createPortal(
    <div onClick={()=>handleOutClick()} className='fixed top-0 w-full h-full bg-gray-700 bg-opacity-70 backdrop-blur-sm flex items-center justify-center'>
        <div onClick={(e)=>e.stopPropagation()} className='w-[65%] h-[75%] bg-gray-700 bg-opacity-75 rounded-lg text-white relative'>
        
        Holdings

        </div>
        </div>,
    container
  )
}

export default HoldingsDetails