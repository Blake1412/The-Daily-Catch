// src/app/admin/layout.tsx
"use client";

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if admin from session storage
    const role = sessionStorage.getItem('userRole');
    setIsAdmin(role === 'admin');
    
    // If not admin, this shouldn't even render, but just in case
    if (role !== 'admin') {
      window.location.href = '/login';
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <Navbar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} isUserMode={false} />

        <div className="flex pt-16">
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

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
    </ProtectedRoute>
  );
}