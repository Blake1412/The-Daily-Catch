// src/app/user/layout.tsx - Fix import path
"use client";

import React, { useState } from 'react';
import UserProtectedRoute from '../../components/UserProtectedRoute';
import Navbar from '../../components/Navbar';
import UserSidebar from '../../components/UserSidebar'; // Fixed path (was '../../../components/UserSidebar')

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  return (
    <UserProtectedRoute>
      <div className="min-h-screen bg-white">
        <Navbar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />

        <div className="flex pt-16">
          {/* User sidebar with user-specific navigation */}
          <UserSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

          {/* Main content area that shifts when sidebar opens */}
          <div
            className={`transition-all duration-300 ease-in-out flex-1 ${
              sidebarOpen ? 'ml-64' : 'ml-0'
            }`}
          >
            <div className="p-6 max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </UserProtectedRoute>
  );
}