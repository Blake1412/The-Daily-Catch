// src/components/UserProtectedRoute.tsx
"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function UserProtectedRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!isMounted) return;
      
      if (!user) {
        console.log("No user, redirecting to login");
        router.push('/login');
        return;
      }
      
      // Allow access to both regular users and admins
      const userRole = sessionStorage.getItem('userRole') || '';
      
      // For admin users, check if they're trying to access user pages directly
      if (userRole === 'admin') {
        // If role is already set as admin, allow normal access
        console.log("Admin accessing user area, allowing access");
        setAuthenticated(true);
        setLoading(false);
        return;
      }
      
      // Check if this is admin@thedailycatch.com
      if (user.email === 'admin@thedailycatch.com') {
        sessionStorage.setItem('userRole', 'admin');
        setAuthenticated(true);
        setLoading(false);
        return;
      }
      
      // Regular user or unknown, check from DB
      try {
        const userDoc = await getDoc(doc(db, "user_roles", user.uid));
        
        if (userDoc.exists() && userDoc.data().role === "admin") {
          // It's an admin accessing user area
          sessionStorage.setItem('userRole', 'admin');
        } else {
          // It's a regular user
          sessionStorage.setItem('userRole', 'user');
        }
        
        setAuthenticated(true);
        setLoading(false);
      } catch (error) {
        console.error("Error checking user role:", error);
        setAuthenticated(false);
        router.push('/login?error=database');
      }
    });

    // Safety timeout
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
      }
    }, 3000);

    return () => {
      isMounted = false;
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return authenticated ? <>{children}</> : null;
}