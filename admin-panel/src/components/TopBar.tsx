"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "./Sidebar"; // ✅ Import Sidebar

export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false); // ✅ Controls sidebar visibility

  return (
    <>
      {/* Top Bar */}
      <header className="fixed top-0 left-0 w-full h-14 bg-gray-900 text-white flex items-center justify-between px-4 shadow-md z-50">
        {/* Menu Button on the Left */}
        <button onClick={() => setIsOpen(!isOpen)} className="block md:hidden">
          <Image src="/img/menu.png" alt="Menu" width={30} height={30} />
        </button>

        {/* Centered Website Name */}
        <h1 className="text-xl font-bold text-center flex-1">
          The Daily Catch - Admin Panel
        </h1>
      </header>

      {/* Sidebar - Now fully controlled here */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
