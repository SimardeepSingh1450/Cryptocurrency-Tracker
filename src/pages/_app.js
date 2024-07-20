"use client";
import Explore from "@/pages/Explore";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Footer from "@/components/Footer";
import ExploreDetails from "@/components/CryptoDetails";
import HoldingsDetails from "@/components/HoldingsDetails";
import MyWatchList from "@/pages/MyWatchList";

const _app = () => {
  const [currComp, setCurrComp] = useState("/");
  const [coinID, setCoinID] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  const [holdingsModel, setHoldingsModel] = useState(false);
  const [coins, setCoins] = useState([]);
  const [currCoinData, setCurrCoinData] = useState(null);

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
    <Provider store={store ? store : null}>
      <div className="min-h-screen flex flex-col">
        <main className="first-letter:content-center w-full h-full flex flex-col content-center items-center relative text-white mb-auto">
          <div className="w-screen h-screen bg-[rgb(16,17,22)] fixed -z-10 flex items-center content-center flex-col flex-wrap" />
          <Logo />
          <Navbar setCurrComp={setCurrComp} currComp={currComp} />

          {/*Conditional Rendering*/}
          {currComp == "/" && (
            <Explore
              setOpenModel={setOpenModel}
              coinID={coinID}
              setCoinID={setCoinID}
              setHoldingsModel={setHoldingsModel}
              saveCoin={saveCoin}
              removeCoin={removeCoin}
              coins={coins}
              currCoinData={currCoinData}
              setCurrCoinData={setCurrCoinData}
            />
          )}
          {currComp == "/myWatchList" && (
            <MyWatchList
              removeCoin={removeCoin}
              saveCoin={saveCoin}
              setOpenModel={setOpenModel}
              coins={coins}
              setHoldingsModel={setHoldingsModel}
              setCoins={setCoins}
              setCurrCoinData={setCurrCoinData}
            />
          )}
        </main>
        {/*Model Rendering*/}
        {openModel ? <ExploreDetails setOpenModel={setOpenModel} /> : null}
        {holdingsModel ? (
          <HoldingsDetails
            setHoldingsModel={setHoldingsModel}
            currCoinData={currCoinData}
          />
        ) : null}

        {/*Footer*/}
        <Footer />
      </div>
    </Provider>
  );
};

export default _app;
