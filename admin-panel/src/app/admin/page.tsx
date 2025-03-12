// src/app/admin/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';

export default function AdminDashboard()
{
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">System Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold">124</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Active Today</p>
              <p className="text-2xl font-bold">28</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Spots Added</p>
              <p className="text-2xl font-bold">57</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Admin Users</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <Link href="/admin/users" className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <div className="bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span>User Management</span>
            </Link>
            <Link href="/admin/create-user" className="flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div className="bg-green-500 h-10 w-10 rounded-full flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <span>Create User</span>
            </Link>
            <Link href="/admin/users/add-admin" className="flex items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div className="bg-purple-500 h-10 w-10 rounded-full flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span>Add Admin</span>
            </Link>
            <Link href="/admin/panel" className="flex items-center p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
              <div className="bg-red-500 h-10 w-10 rounded-full flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-2">Database</h3>
            <div className="flex items-center">
              <div className="bg-green-500 h-3 w-3 rounded-full mr-2"></div>
              <span>Online (93% capacity)</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">API Services</h3>
            <div className="flex items-center">
              <div className="bg-green-500 h-3 w-3 rounded-full mr-2"></div>
              <span>All services operational</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Storage</h3>
            <div className="flex items-center">
              <div className="bg-yellow-500 h-3 w-3 rounded-full mr-2"></div>
              <span>78% capacity (warning)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}