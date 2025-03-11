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
      <body suppressHydrationWarning={true}>
        <div className="min-h-screen bg-white">
          {/* Navbar */}
          <Navbar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />
          
          {/* Main Content using flex for perfect centering */}
          <div className="pt-16">
            <div 
              className={`flex transition-all duration-300 ease-in-out ${
                sidebarOpen ? 'md:pl-60 justify-start' : 'md:pl-40'
              }`}
            >
              <main className="p-6 w-full max-w-6xl">
                {children}
              </main>
            </div>
          </div>
          
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        </div>
      </body>
    </html>
  );
}