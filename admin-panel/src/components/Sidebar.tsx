"use client";

// Import React and useState
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Sidebar component
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// Sidebar function
export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  
  return (
    <>
      {/* Sidebar - hidden when closed */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0F243B] text-white p-4 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } pt-16`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white"
        >
          ✖
        </button>

        <nav className="mt-6">
          <Link 
            href="/" 
            className={`flex items-center py-3 px-4 hover:bg-[#1E2A3D] rounded-md mb-1 ${
              pathname === "/" ? "bg-[#1E2A3D]" : ""
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Near You
          </Link>
          <Link 
            href="/profile" 
            className={`flex items-center py-3 px-4 hover:bg-[#1E2A3D] rounded-md mb-1 ${
              pathname === "/profile" ? "bg-[#1E2A3D]" : ""
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            My Profile
          </Link>
          <Link 
            href="/map" 
            className={`flex items-center py-3 px-4 hover:bg-[#1E2A3D] rounded-md mb-1 ${
              pathname === "/map" ? "bg-[#1E2A3D]" : ""
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4"></path>
            </svg>
            Map View
          </Link>
          <Link 
            href="/saved" 
            className={`flex items-center py-3 px-4 hover:bg-[#1E2A3D] rounded-md mb-1 ${
              pathname === "/saved" ? "bg-[#1E2A3D]" : ""
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
            </svg>
            Saved
          </Link>
          <Link 
            href="/admin" 
            className={`flex items-center py-3 px-4 hover:bg-[#1E2A3D] rounded-md mb-1 ${
              pathname === "/admin" ? "bg-[#1E2A3D]" : ""
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Admin panel
          </Link>
        </nav>
      </aside>
    </>
  );
}