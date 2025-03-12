// src/components/Sidebar.tsx
"use client";

import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Add overlay when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      <div 
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#0F243B] text-white transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40 shadow-lg`}
      >
        <div className="p-4">
          <nav className="h-full flex flex-col">
            {/* ADMIN SECTION */}
            <div className="mb-6">
              <h2 className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-2 pl-2">
                Admin Tools
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/admin" className="flex items-center p-2 rounded hover:bg-blue-700" onClick={closeSidebar}>
                    <span className="ml-3">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/panel" className="flex items-center p-2 rounded hover:bg-blue-700" onClick={closeSidebar}>
                    <span className="ml-3">Admin Panel</span>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/users" className="flex items-center p-2 rounded hover:bg-blue-700" onClick={closeSidebar}>
                    <span className="ml-3">User Management</span>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/create-user" className="flex items-center p-2 rounded hover:bg-blue-700" onClick={closeSidebar}>
                    <span className="ml-3">Create User</span>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/users/add-admin" className="flex items-center p-2 rounded hover:bg-blue-700" onClick={closeSidebar}>
                    <span className="ml-3">Add Admin</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* USER SECTION */}
            <div>
              <h2 className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-2 pl-2">
                User Features
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/user/near-you" className="flex items-center p-2 rounded hover:bg-blue-700" onClick={closeSidebar}>
                    <span className="ml-3">Near You</span>
                  </Link>
                </li>
                <li>
                  <Link href="/user/profile" className="flex items-center p-2 rounded hover:bg-blue-700" onClick={closeSidebar}>
                    <span className="ml-3">My Profile</span>
                  </Link>
                </li>
                <li>
                  <Link href="/user/maps" className="flex items-center p-2 rounded hover:bg-blue-700" onClick={closeSidebar}>
                    <span className="ml-3">Maps</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}