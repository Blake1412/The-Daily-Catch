// src/app/reset-password/page.tsx
"use client";

import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import Link from 'next/link';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Define the actionCodeSettings with redirectUrl
      const actionCodeSettings = {
        // URL you want to redirect back to after password reset
        url: window.location.origin + '/login?reset=success',
        handleCodeInApp: true
      };
      
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <img
            src="/img/title.png"
            alt="The Daily Catch"
            className="h-12 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold">Reset Password</h1>
        </div>
        
        {success ? (
          <div className="text-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Password reset email sent! Check your inbox.
            </div>
            <Link href="/login" className="text-blue-500 hover:text-blue-700">
              Return to login
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              
              <div className="text-center">
                <Link href="/login" className="text-sm text-blue-500 hover:text-blue-700">
                  Back to login
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}