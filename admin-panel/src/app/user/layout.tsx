// src/app/user/layout.tsx
"use client";

import React, { useState, useEffect } from 'react';
import UserProtectedRoute from '../../components/UserProtectedRoute';
import Navbar from '../../components/Navbar';
import UserSidebar from '../../components/UserSidebar';
import Sidebar from '../../components/Sidebar'; // Import the admin sidebar
import { useRouter } from 'next/navigation';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if this is actually an admin viewing user pages
    const userRole = sessionStorage.getItem('userRole');
    setIsAdmin(userRole === 'admin');
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  return (
    <UserProtectedRoute>
      <div className="min-h-screen bg-white">
        <Navbar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} isUserMode={!isAdmin} />

        <div className="flex pt-16">
          {/* Choose sidebar based on user role */}
          {isAdmin ? (
            // Use admin sidebar for admins - same component as in admin layout
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          ) : (
            // Use regular user sidebar for users
            <UserSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          )}

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