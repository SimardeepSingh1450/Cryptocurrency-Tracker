import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cryptonite",
  description: "Crypto  Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full h-full bg-red`}>
        {children}
        <div id="model-container"></div>
        <div id="holdings-model-container"></div>
      </body>
    </html>
  );
}
