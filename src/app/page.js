"use client";
import Crypto from "@/pages/Crypto";
import Saved from "@/pages/Saved";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Home() {
  const [currComp, setCurrComp] = useState("/");
  return (
    <main className="w-full h-full flex flex-col content-center items-center relative text-white">
      <div className="w-screen h-screen bg-[rgb(16,17,22)] fixed -z-10" />
      <Logo />
      <Navbar setCurrComp={setCurrComp} currComp={currComp} />
      {/*Conditional Rendering*/}
      {currComp == "/" && <Crypto />}
      {currComp == "/saved" && <Saved />}
    </main>
  );
}
