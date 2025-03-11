// src/components/Navbar.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

interface NavbarProps {
  toggleSidebar: () => void;
  isOpen: boolean;
}

export default function Navbar({ toggleSidebar, isOpen }: NavbarProps) {
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0F243B] text-white flex items-center justify-between px-4 z-50">
      <button
        onClick={toggleSidebar}
        className="p-2 hover:bg-blue-800 rounded-md focus:outline-none cursor-pointer"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer">
        <img
          src="/img/title.png"
          alt="The Daily Catch"
          className="h-10 object-contain"
        />
      </div>

      <div className="flex items-center">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md mr-2"
        >
          Logout
        </button>
        
        <div className="p-2 cursor-pointer">
          <img
            src="/img/profileimg.png"
            alt="Profile"
            width="24"
            height="24"
          />
        </div>
      </div>
    </nav>
  );
}