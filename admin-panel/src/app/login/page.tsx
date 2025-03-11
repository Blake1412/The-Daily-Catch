// src/app/login/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
// Fix these import paths based on your actual file structure
import { auth, db } from '../../config/firebase'; 
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// If auth.ts utility exists, use it. Otherwise, define function inline
// import { assignUserRole } from '../../utils/auth';

// Inline definition in case the import fails
const assignUserRole = async (uid: string, email: string | null, role: string = 'user'): Promise<void> => {
  console.log(`Assigning role ${role} to user ${email} (${uid})`);
  
  try {
    // Save to Firestore
    await setDoc(doc(db, "user_roles", uid), {
      email: email || 'unknown@email.com',
      role: role,
      createdAt: new Date().toISOString()
    });
    
    console.log(`Role ${role} successfully assigned to ${email}`);
  } catch (error) {
    console.error("Error assigning user role:", error);
    throw error;
  }
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for error parameter in URL
  useEffect(() => {
    const errorType = searchParams?.get('error');
    if (errorType === 'unauthorized') {
      setError('This account does not have admin access');
    } else if (errorType === 'server') {
      setError('Server error occurred. Please try again later.');
    } else if (errorType === 'timeout') {
      setError('Authentication timed out. Please try again.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const user = credential.user;

      // Add null check for user.email
      if (user && user.email === 'admin@thedailycatch.com') {
        router.push('/admin');
        return;
      }

      // Check for admin role in user_roles collection
      try {
        if (user && user.uid) {
          const userDoc = await getDoc(doc(db, "user_roles", user.uid));
          
          if (userDoc.exists() && userDoc.data().role === "admin") {
            router.push('/admin');
          } else {
            router.push('/user/dashboard');
          }
        } else {
          throw new Error('User object is invalid');
        }
      } catch (roleError) {
        console.error("Role check error:", roleError);
        router.push('/user/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
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

      const result = await signInWithPopup(auth, provider);
      console.log("Google login successful:", result.user?.email);
      const user = result.user;

      if (!user) {
        throw new Error('Failed to authenticate with Google');
      }

      // Check if user has an existing role
      try {
        const userDoc = await getDoc(doc(db, "user_roles", user.uid));

        // If no role exists, assign a default user role
        if (!userDoc.exists()) {
          console.log("No role found, assigning default user role for:", user.email);
          await assignUserRole(user.uid, user.email, 'user');
        }

        // Add null check for user.email
        if (user.email === 'admin@thedailycatch.com' ||
          (userDoc.exists() && userDoc.data().role === 'admin')) {
          router.push('/admin');
        } else {
          router.push('/user/dashboard');
        }
      } catch (roleError) {
        console.error("Role check error:", roleError);
        // Default to user
        await assignUserRole(user.uid, user.email, 'user');
        router.push('/user/dashboard');
      }
    } catch (err: any) {
      console.error("Google login error:", err);
      setError(err.message || 'Failed to log in with Google');
    } finally {
      setLoading(false);
    }
  };

  // Rest of your component remains the same...
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      {/* Your form HTML */}
      {/* ... */}
    </div>
  );
}