"use client";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import {
  decrCurrPage,
  incrCurrPage,
  setCurrPage,
} from "@/redux/slice/currPageSlice";
import { fetchCoinsMarket } from "@/redux/slice/dataSlice";

const Pagination = ({ coinID }) => {
  const dispatch = useDispatch();
  let currPage = useSelector((state) => state.currPage.currPage);
  const totalNumber = Math.ceil(14907 / 20);

  const prev = () => {
    if (currPage === 1) {
      return null;
    } else {
      dispatch(decrCurrPage()) && dispatch(fetchCoinsMarket(coinID));
    }
  };

  const next = () => {
    if (currPage === totalNumber) {
      return null;
    } else {
      dispatch(incrCurrPage()) && dispatch(fetchCoinsMarket(coinID));
    }
  };

  const setPage = (pageVal) => {
    dispatch(setCurrPage(pageVal)) && dispatch(fetchCoinsMarket(coinID));
  };

  return (
    <>
      {!coinID ? (
        <div className="flex items-center">
          <ul className="flex items-center justify-end text-sm">
            <li className="flex items-center">
              <button onClick={prev}>
                <IoIosArrowDroprightCircle className="text-green-500 text-4xl rotate-180" />
              </button>
            </li>
            {currPage != 1 ? (
              <li>
                <button
                  className="outline-0 hover:text-green-500 rounded-full w-8 h-8 flex items-center justify-center text-lg bg-gray-800 mx-1.5"
                  onClick={() => prev()}
                >
                  {currPage - 1}
                </button>
              </li>
            ) : null}
            <li>
              <button
                disabled
                className="outline-0 rounded-full w-8 h-8 flex items-center justify-center text-lg text-gray-800 bg-green-500 mx-1.5"
              >
                {currPage}
              </button>
            </li>
            {currPage != totalNumber ? (
              <li>
                <button
                  className="outline-0 hover:text-green-500 rounded-full w-8 h-8 flex items-center justify-center text-lg bg-gray-800 mx-1.5"
                  onClick={next}
                >
                  {currPage + 1}
                </button>
              </li>
            ) : null}
            {currPage < totalNumber - 1 ? (
              <li>
                <button className="outline-0 hover:text-green-500 rounded-full w-8 h-8 flex items-center justify-center text-lg">
                  ...
                </button>
              </li>
            ) : null}
            {currPage < totalNumber - 1 ? (
              <li>
                <button
                  onClick={() => setPage(totalNumber)}
                  className="outline-0 hover:text-green-500 rounded-full w-8 h-8 flex items-center justify-center text-lg bg-gray-800 mx-1.5"
                >
                  {totalNumber}
                </button>
              </li>
            ) : null}
            <li>
              <button onClick={() => next()}>
                <IoIosArrowDroprightCircle className="text-green-500 text-4xl" />
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
