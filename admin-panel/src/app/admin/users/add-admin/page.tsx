// src/app/admin/users/add-admin/page.tsx
"use client";

import React, { useState } from 'react';
import { db } from '../../../../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function AddAdminPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      // This is just a placeholder implementation
      // In a real app, you'd verify the user exists first
      
      // Simulate a check to Firebase
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error("Error adding admin:", error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Admin</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              User Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter existing user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Enter the email of an existing user to promote them to admin
            </p>
          </div>
          
          {status === 'success' && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
              User has been granted admin privileges
            </div>
          )}
          
          {status === 'error' && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
              Error promoting user. Please verify the email and try again.
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Promote to Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}