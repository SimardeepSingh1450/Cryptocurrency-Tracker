import Link from "next/link";

const Navbar = ({ setCurrComp, currComp }) => {
  return (
    <nav className="w-[40%] mt-14 flex justify-around align-middle border border-green-500 rounded-lg">
      <Link
        onClick={() => {
          setCurrComp("/");
        }}
        href="/"
        className={`flex items-center justify-center w-full xs:text-xs lg:text-base text-center m-2.5 ${
          currComp == "/"
            ? `bg-green-500 text-gray-700 `
            : `bg-gray-700 text-gray-500 hover:text-green-500 active:bg-green-500 active:text-gray-700`
        }   border-0 cursor-pointer rounded capitalize font-semibold`}
      >
        Explore
      </Link>
      <Link
        onClick={() => {
          setCurrComp("/myWatchList");
        }}
        href="/"
        className={`flex items-center justify-center w-full xs:text-xs lg:text-base text-center m-2.5 ${
          currComp == "/myWatchList"
            ? `bg-green-500 text-gray-700 `
            : `bg-gray-700 text-gray-500 hover:text-green-500 active:bg-green-500 active:text-gray-700`
        }   border-0 cursor-pointer rounded capitalize font-semibold`}
      >
        My Watchlist
      </Link>
    </nav>
  );
};

export default Navbar;
