"use client";
import Crypto from "@/pages/Crypto";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Footer from "@/components/Footer";
import CryptoDetails from "@/components/CryptoDetails";
import HoldingsDetails from "@/components/HoldingsDetails";
import MyWatchList from "@/pages/MyWatchList";

export default function Home() {
  const [currComp, setCurrComp] = useState("/");
  const [coinID, setCoinID] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  const [holdingsModel, setHoldingsModel] = useState(false);
  const [coins, setCoins] = useState([]);

  const saveCoin = (newCoinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));

    if (oldCoins.includes(newCoinId)) {
      return null;
    } else {
      let newCoin = [...oldCoins, newCoinId];
      setCoins(newCoin);
      localStorage.setItem("coins", JSON.stringify(newCoin));
    }
  };

  const removeCoin = (newCoinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));

    let newCoin = oldCoins.filter((coin) => coin != newCoinId);
    setCoins(newCoin);
    localStorage.setItem("coins", JSON.stringify(newCoin));
  };

  useEffect(() => {
    let isThere = JSON.parse(localStorage.getItem("coins")) || false;

    if (!isThere) {
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      let totalCoins = JSON.parse(localStorage.getItem("coins"));
      setCoins(totalCoins);
    }
  }, []);

  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col">
        <main className="w-full h-full flex flex-col content-center items-center relative text-white mb-auto">
          <div className="w-screen h-screen bg-[rgb(16,17,22)] fixed -z-10" />
          <Logo />
          <Navbar setCurrComp={setCurrComp} currComp={currComp} />

          {/*Conditional Rendering*/}
          {currComp == "/" && (
            <Crypto
              setOpenModel={setOpenModel}
              coinID={coinID}
              setCoinID={setCoinID}
              setHoldingsModel={setHoldingsModel}
              saveCoin={saveCoin}
              removeCoin={removeCoin}
              coins={coins}
            />
          )}
          {currComp == "/myWatchList" && (
            <MyWatchList
              removeCoin={removeCoin}
              saveCoin={saveCoin}
              setOpenModel={setOpenModel}
              coins={coins}
              setHoldingsModel={setHoldingsModel}
            />
          )}
        </main>
        {/*Model Rendering*/}
        {openModel ? <CryptoDetails setOpenModel={setOpenModel} /> : null}
        {holdingsModel ? (
          <HoldingsDetails setHoldingsModel={setHoldingsModel} />
        ) : null}

        {/*Footer*/}
        <Footer />
      </div>
    </Provider>
  );
}
