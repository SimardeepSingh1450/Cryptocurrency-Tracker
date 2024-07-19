"use client";
import TableComponent from "@/components/TableComponent";
import { useDispatch } from "react-redux";
import { fetchCoinsMarket } from "@/redux/slice/dataSlice";
import { useEffect } from "react";
import Filters from "@/components/Filters";

const Crypto = ({ coinID, setCoinID, setOpenModel, setHoldingsModel }) => {
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
      />
    </section>
  );
};

export default Crypto;
