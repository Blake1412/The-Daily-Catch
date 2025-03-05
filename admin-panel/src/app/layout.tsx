"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  return (
    <html lang="en">
      {/* Add suppressHydrationWarning to ignore mismatches on the body tag */}
      <body suppressHydrationWarning={true}>
        <div className="min-h-screen bg-white">
          {/* Navbar */}
          <Navbar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />
          
          {/* Main Content - fixed position that stays visible */}
          <main className="pt-16 p-6">
            {children}
          </main>
          
          {/* Sidebar - appears on top of content */}
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        </div>
      </body>
    </html>
  );
}