// src/components/ProtectedRoute.tsx
"use client";

declare global {
  interface Window {
    forceLogout?: () => Promise<void>;
  }
}

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../config/firebase'; // CHANGE THIS LINE - two levels up
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Force logout function for debugging
  const forceLogout = async () => {
    try {
      await signOut(auth);
      // Clear role from session
      sessionStorage.removeItem('userRole');
      window.location.href = '/login';
    } catch (error) {
      console.error("Error during forced logout:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    console.log("ProtectedRoute mounted");
    
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!isMounted) return;
      
      if (!user) {
        console.log("No user, redirecting to login");
        // Clear role from session
        sessionStorage.removeItem('userRole');
        router.push('/login');
        return;
      }
      
      // Check if user is admin
      try {
        // Direct admin check - always grant access if email matches admin
        if (user.email === 'admin@thedailycatch.com') {
          console.log("Admin email match, access granted");
          sessionStorage.setItem('userRole', 'admin');
          setLoading(false);
          return;
        }
        
        // Check admin role in database
        const userDoc = await getDoc(doc(db, "user_roles", user.uid));
        if (userDoc.exists() && userDoc.data().role === "admin") {
          console.log("Admin role confirmed, access granted");
          sessionStorage.setItem('userRole', 'admin');
          setLoading(false);
        } else {
          console.log("Not admin, redirecting to user area");
          sessionStorage.setItem('userRole', 'user');
          router.push('/user/near-you');
        }
      } catch (error) {
        console.error("Error checking admin role:", error);
        router.push('/login?error=permission');
      }
    });

    // Safety timeout
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
      }
    }, 3000);

    // Debug - Add a global function to force logout
    window.forceLogout = forceLogout;

    return () => {
      isMounted = false;
      unsubscribe();
      clearTimeout(timeoutId);
      delete window.forceLogout;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}