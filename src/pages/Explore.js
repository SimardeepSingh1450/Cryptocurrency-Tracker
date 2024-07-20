/* eslint-disable */
"use client";
import TableComponent from "@/components/TableComponent";
import { useDispatch } from "react-redux";
import { fetchCoinsMarket } from "@/redux/slice/dataSlice";
import { useEffect } from "react";
import Filters from "@/components/Filters";

const Explore = ({
  coinID,
  setCoinID,
  setOpenModel,
  setHoldingsModel,
  saveCoin,
  removeCoin,
  coins,
  currCoinData,
  setCurrCoinData,
}) => {
  const dispatch = useDispatch();

  // if (state.todo.isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  useEffect(() => {
    dispatch(fetchCoinsMarket());
  }, []);

  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <Filters setCoinID={setCoinID} coinID={coinID} />
      <TableComponent
        setOpenModel={setOpenModel}
        setCoinID={setCoinID}
        coinID={coinID}
        setHoldingsModel={setHoldingsModel}
        saveCoin={saveCoin}
        removeCoin={removeCoin}
        coins={coins}
        currentCoinData={currCoinData}
        setCurrentCoinData={setCurrCoinData}
      />
    </section>
  );
};

export default Explore;