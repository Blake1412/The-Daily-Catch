// src/app/user/profile/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { auth } from '../../../config/firebase';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        email: currentUser.email,
        displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
        photoURL: currentUser.photoURL
      });
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      <div className="bg-white shadow-md rounded p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-500 rounded-full h-16 w-16 flex items-center justify-center text-white text-2xl font-bold">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="h-16 w-16 rounded-full" />
            ) : (
              user.displayName?.charAt(0).toUpperCase() || 'U'
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-bold">{user.displayName}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-bold mb-2">Account Information</h3>
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Type</p>
                <p>Regular User</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}