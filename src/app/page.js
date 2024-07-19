"use client";
import Crypto from "@/pages/Crypto";
import Saved from "@/pages/Saved";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Footer from "@/components/Footer";
import CryptoDetails from "@/components/CryptoDetails";
import HoldingsDetails from "@/components/HoldingsDetails";

export default function Home() {
  const [currComp, setCurrComp] = useState("/");
  const [coinID, setCoinID] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  const [holdingsModel, setHoldingsModel] = useState(false);

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
            />
          )}
          {currComp == "/saved" && <Saved />}
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
