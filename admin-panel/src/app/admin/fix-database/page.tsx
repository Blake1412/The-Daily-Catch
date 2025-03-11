// src/app/admin/fix-database/page.tsx
"use client";

import React, { useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../../config/firebase';

export default function FixDatabasePage() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');

  const fixCurrentUserRole = async () => {
    try {
      setStatus('');
      setError('');
      
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError('You must be logged in');
        return;
      }
      
      await setDoc(doc(db, "user_roles", currentUser.uid), {
        email: currentUser.email,
        role: "admin"
      });
      
      setStatus(`Role for ${currentUser.email} set to admin successfully!`);
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || 'An error occurred');
    }
  };
  
  const assignRoleToEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setStatus('');
      setError('');
      
      if (!email) {
        setError('Please enter an email address');
        return;
      }
      
      // For demo purposes, we'll use the email as the user ID
      // This would normally need to query Firebase Auth to get the actual UID
      const uid = btoa(email).replace(/[=+/]/g, '').substring(0, 28);
      
      await setDoc(doc(db, "user_roles", uid), {
        email: email,
        role: role
      });
      
      setStatus(`Role for ${email} set to ${role}! (Note: This is a mock UID for demo))`);
      setEmail('');
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Fix Database Configuration</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {status && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {status}
        </div>
      )}
      
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">Fix Current User</h2>
        <button
          onClick={fixCurrentUserRole}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 w-full"
        >
          Make Current User Admin
        </button>
        
        <p className="text-sm text-gray-600">
          This will add or update the user_roles document for your current user.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-lg font-bold mb-4">Assign Role to Email</h2>
        <form onSubmit={assignRoleToEmail}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="user@example.com"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Assign Role
          </button>
        </form>
      </div>
    </div>
  );
}