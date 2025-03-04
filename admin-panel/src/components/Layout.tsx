'use client';  // This ensures this component is only rendered on the client

import React, { ReactNode, useState } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

    // Function to toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar */}
            <aside
                className={`w-60 bg-[#0F243B] p-6 text-white transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-60'}`}
            >
                <ul>
                    <li className="py-3 hover:bg-[#1E2A3D]">
                        <a href="#" className="text-lg">Near You</a>
                    </li>
                    <li className="py-3 hover:bg-[#1E2A3D]">
                        <a href="#" className="text-lg">My Profile</a>
                    </li>
                    <li className="py-3 hover:bg-[#1E2A3D]">
                        <a href="#" className="text-lg">Map View</a>
                    </li>
                    <li className="py-3 hover:bg-[#1E2A3D]">
                        <a href="#" className="text-lg">Saved</a>
                    </li>
                    <li className="py-3 hover:bg-[#1E2A3D]">
                        <a href="#" className="text-lg">Settings</a>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
                {/* Top Navbar */}
                <header className="bg-[#0F243B] p-5 flex justify-between items-center shadow-md">
                    <div className="text-white font-bold text-2xl">The Daily Catch</div>
                    <button onClick={toggleSidebar} className="text-white md:hidden">
                        {/* Hamburger menu */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </header>

                {/* Main Content Area */}
                <main className="p-6 text-[#1E1E1E] flex justify-center">
                    <div className="max-w-4xl w-full">{children}</div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
