"use client";
import { setChartDays } from "@/redux/slice/chartDaysSlice";
import { fetchChartData } from "@/redux/slice/dataSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomToolTip = ({ payload, label, active, currency }) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip">
        <p className="label text-sm text-green-500">{`${label} : ${new Intl.NumberFormat(
          "en-IN",
          {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 5,
            notation: "compact",
          }
        ).format(payload[0].value)}`}</p>
      </div>
    );
  }
};

const ChartComponent = ({ data, currency, type }) => {

  return (
    <ResponsiveContainer height={"90%"}>
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="rgb(34,197,94)"
          strokeWidth={"1px"}
        />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis dataKey={type} domain={["auto", "auto"]} hide />
        <Tooltip content={<CustomToolTip />} currency={currency} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

const Chart = ({ id }) => {
  const dispatch = useDispatch();
  const [type, setType] = useState("prices");
  let days = useSelector((state) => state.chartDays.chartDays);
  let chartData = useSelector((state) => state.data.chartData.data);
  let isLoading = useSelector((state) => state.data.chartData.isLoading);
  let currentCurrency = useSelector((state) => state.currency.currency);

  let convertedData = chartData?.[type]?.map((item) => {
    return {
      date: new Date(item[0]).toLocaleDateString(),
      [type]: item[1],
    };
  });

  useEffect(() => {
    dispatch(fetchChartData(id));
  }, [currentCurrency, type, days, dispatch, id]);

  return (
    <div className="w-full h-[60%]">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-green-500 rounded-full border-b-gray-700 animate-spin" />
          <span className="ml-2">Loading Graph...</span>
        </div>
      ) : (
        <>
          <ChartComponent
            data={convertedData}
            type={type}
            currency={currentCurrency}
          />
          <div className="flex">
            <button
              className={`bg-opacity-25 text-sm py-0.5 px-1.5 ml-2 ${
                type === "prices"
                  ? "bg-green-500 text-green-500"
                  : "bg-gray-700 text-gray-100"
              }`}
              onClick={() => setType("prices")}
            >
              Price
            </button>
            <button
              className={`bg-opacity-25 text-sm py-0.5 px-1.5 ml-2 ${
                type === "market_caps"
                  ? "bg-green-500 text-green-500"
                  : "bg-gray-700 text-gray-100"
              }`}
              onClick={() => setType("market_caps")}
            >
              Market Cap
            </button>
            <button
              className={`bg-opacity-25 text-sm py-0.5 px-1.5 ml-2 ${
                type === "total_volumes"
                  ? "bg-green-500 text-green-500"
                  : "bg-gray-700 text-gray-100"
              }`}
              onClick={() => setType("total_volumes")}
            >
              Total Volumes
            </button>

            <button
              className={`bg-opacity-25 text-sm py-0.5 px-1.5 ml-2 ${
                days === 1
                  ? "bg-green-500 text-green-500"
                  : "bg-gray-700 text-gray-100"
              }`}
              onClick={() => dispatch(setChartDays(1))}
            >
              1D
            </button>
            <button
              className={`bg-opacity-25 text-sm py-0.5 px-1.5 ml-2 ${
                days === 7
                  ? "bg-green-500 text-green-500"
                  : "bg-gray-700 text-gray-100"
              }`}
              onClick={() => dispatch(setChartDays(7))}
            >
              7D
            </button>
            <button
              className={`bg-opacity-25 text-sm py-0.5 px-1.5 ml-2 ${
                days === 30
                  ? "bg-green-500 text-green-500"
                  : "bg-gray-700 text-gray-100"
              }`}
              onClick={() => dispatch(setChartDays(30))}
            >
              30D
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chart;
