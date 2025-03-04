"use client";

import React from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void; // ✅ Ensures the function is typed correctly
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Sidebar - Fully controlled by TopBar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-4 transform transition-transform z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-64`}
      >
        {/* Close Button (Only visible on mobile) */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white md:hidden"
        >
          ✖
        </button>

        <nav className="mt-10">
          <a href="/" className="block py-2 px-4 hover:bg-gray-700">Dashboard</a>
          <a href="/users" className="block py-2 px-4 hover:bg-gray-700">Users</a>
          <a href="/reports" className="block py-2 px-4 hover:bg-gray-700">Reports</a>
        </nav>
      </aside>
    </>
  );
}
