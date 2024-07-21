import Image from "next/image";
import CoinGeckoImage from "../../public/images/coingecko.png";

const Footer = () => {
  return (
    <footer className="bg-gray-600 w-full flex items-center justify-center text-center py-4">
      <span className="text-xl text-white font-bold mr-2">
        Powered by{" "}
        <a
          href="http://coingecko.com"
          target={"blank"}
          className="text-[rgb(140,198,62)]"
        >
          CoinGecko
        </a>
      </span>
      <Image alt="coinGecko" src={CoinGeckoImage} className="w-[2rem]" />
    </footer>
  );
};

export default Footer;
