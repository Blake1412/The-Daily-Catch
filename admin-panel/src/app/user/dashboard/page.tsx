// src/app/user/dashboard/page.tsx - Create this file
"use client";

import React from 'react';
import { auth } from '../../../config/firebase';

export default function UserDashboard() {
  const user = auth.currentUser;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome to The Daily Catch</h1>
      
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-xl font-bold mb-4">
          Hello, {user?.email?.split('@')[0] || 'User'}
        </h2>
        
        <p className="mb-4">
          Welcome to your fishing dashboard. Here you can find information about fishing spots near you,
          view your profile, and connect with other anglers.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded border border-blue-100">
            <h3 className="font-bold text-lg mb-2">Today's Forecast</h3>
            <p>Perfect conditions for fishing! Sunny with light winds.</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded border border-green-100">
            <h3 className="font-bold text-lg mb-2">Recent Activity</h3>
            <p>5 new fishing spots added in your area this week.</p>
          </div>
        </div>
      </div>
    </div>
  );
}