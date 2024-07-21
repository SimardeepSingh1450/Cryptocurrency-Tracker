import Link from "next/link";
import CryptoLogo from "../../public/images/cryptoniteLogo.png";
import Image from "next/image";

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative top-[2.5rem] [text-decoration:none] flex items-center"
    >
      <Image alt="cryptoLogo" src={CryptoLogo} className="w-[4rem]" />
      <span className="text-3xl font-bold ml-2">Cryptonite</span>
    </Link>
  );
};

export default Logo;
