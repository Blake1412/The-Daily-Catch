// src/app/login/page.tsx
"use client";

import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      console.log("Attempting login with:", email);
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const user = credential.user;
      console.log("Login successful:", user?.email);
      
      // Special handling for admin email
      if (user.email === 'admin@thedailycatch.com') {
        console.log("Admin email detected, redirecting to admin panel");
        sessionStorage.setItem('userRole', 'admin');
        router.push('/admin');
        return;
      }
      
      // Check role in database
      const userDoc = await getDoc(doc(db, "user_roles", user.uid));
      
      if (userDoc.exists() && userDoc.data().role === "admin") {
        console.log("Admin role found in database");
        sessionStorage.setItem('userRole', 'admin');
        router.push('/admin');
      } else {
        console.log("Regular user logging in");
        sessionStorage.setItem('userRole', 'user');
        router.push('/user/near-you');
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      
      console.log("Starting Google sign-in flow");
      const result = await signInWithPopup(auth, provider);
      console.log("Google login successful:", result.user?.email);
      
      const user = result.user;
      
      // Check if admin
      if (user.email === 'admin@thedailycatch.com') {
        console.log("Admin email detected via Google login");
        // Ensure admin role is set in database
        await setDoc(doc(db, "user_roles", user.uid), {
          email: user.email,
          role: 'admin',
          updatedAt: new Date().toISOString()
        });
        sessionStorage.setItem('userRole', 'admin');
        router.push('/admin');
        return;
      }
      
      // Check existing role
      const userDoc = await getDoc(doc(db, "user_roles", user.uid));
      
      if (userDoc.exists() && userDoc.data().role === "admin") {
        console.log("Admin role found for Google user");
        sessionStorage.setItem('userRole', 'admin');
        router.push('/admin');
      } else {
        // Set or update user role
        await setDoc(doc(db, "user_roles", user.uid), {
          email: user.email,
          role: 'user',
          updatedAt: new Date().toISOString()
        });
        console.log("Regular user role set for Google user");
        sessionStorage.setItem('userRole', 'user');
        router.push('/user/near-you');
      }
    } catch (err: any) {
      console.error("Google login error:", err);
      setError(err.message || 'Failed to login with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Login</h1>
          <p className="mt-2 text-gray-600">Sign in to access The Daily Catch</p>
        </div>
        
        {error && (
          <div className="p-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}