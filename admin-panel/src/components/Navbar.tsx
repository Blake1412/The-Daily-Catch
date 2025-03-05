"use client";

import React from "react";

//Navbar component
interface NavbarProps {
  toggleSidebar: () => void;
  isOpen: boolean;
}

//Navbar function
export default function Navbar({ toggleSidebar, isOpen }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0F243B] text-white flex items-center justify-between px-4 z-50">
      {/* Left side - hamburger menu */}
      <button 
        onClick={toggleSidebar} 
        className="p-2 focus:outline-none cursor-pointer"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <img 
          src={isOpen ? "/img/menu.png" : "/img/sidebarclosed.png"} 
          alt={isOpen ? "Close menu" : "Open menu"}
          width="24"
          height="24"
        />
      </button>

      {/* Center - Title as image */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <img
          src="/img/title.png"
          alt="The Daily Catch"
          className="h-10 object-contain"
        />
      </div>

      {/* Right side - profile icon */}
      <div className="flex items-center">
        <button className="p-2 focus:outline-none cursor-pointer">
          <img 
            src="/img/profileimg.png"
            alt="Profile"
            width="24"
            height="24"
          />
        </button>
      </div>
    </nav>
  );
}