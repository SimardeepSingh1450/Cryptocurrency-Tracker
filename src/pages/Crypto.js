"use client";
import TableComponent from "@/components/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinsMarket } from "@/redux/slice/dataSlice";
import { useEffect } from "react";

const Crypto = () => {
  const dispatch = useDispatch();
  const coinsMarket = useSelector((state) => state.data.coinsMarket.data);
  console.log(coinsMarket);

  // if (state.todo.isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  useEffect(() => {
    dispatch(fetchCoinsMarket());
  }, []);

  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <TableComponent />
    </section>
  );
};

export default Crypto;
