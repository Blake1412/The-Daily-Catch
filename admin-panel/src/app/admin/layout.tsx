// src/app/admin/layout.tsx - Add zIndex management
// Add overflow-hidden to body when sidebar is open

"use client";

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Add body class when sidebar is open to prevent scrolling behind overlay
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <Navbar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />

        <div className="flex pt-16">
          {/* Sidebar with fixed position */}
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

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
    </ProtectedRoute>
  );
}