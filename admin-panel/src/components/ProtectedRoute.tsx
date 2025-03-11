// src/components/ProtectedRoute.tsx
"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Prevent redirect loops
  const isErrorRedirect = searchParams?.has('error');

  useEffect(() => {
    let isMounted = true;
    console.log("ProtectedRoute mounted");
    
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!isMounted) return;
      
      console.log("Auth state changed:", user ? `User ${user.email} logged in` : "No user");
      
      if (!user) {
        console.log("No user, redirecting to login");
        router.push('/login');
        return;
      }
      
      // Check if user is admin@thedailycatch.com
      if (user.email === 'admin@thedailycatch.com') {
        console.log("Admin email match, access granted");
        setAuthenticated(true);
        setLoading(false);
        return;
      }
      
      // Check for admin role in user_roles collection
      try {
        console.log("Checking user role for:", user.uid);
        const userDoc = await getDoc(doc(db, "user_roles", user.uid));
        
        if (userDoc.exists() && userDoc.data().role === "admin") {
          console.log("Admin role confirmed for", user.email);
          setAuthenticated(true);
          setLoading(false);
        } else {
          console.log("Not an admin, redirecting to user area:", user.email);
          router.push('/user/dashboard');
        }
      } catch (error) {
        console.error("Error checking admin role:", error);
        setLoading(false);
        
        // Only redirect if not already on an error page
        if (!isErrorRedirect) {
          console.log("Error, redirecting to /user/dashboard as fallback");
          router.push('/user/dashboard');
        }
      }
    });

    // Safety timeout
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        console.log("Safety timeout triggered");
        setLoading(false);
        
        if (!authenticated && !isErrorRedirect) {
          router.push('/login?error=timeout');
        }
      }
    }, 5000);

    return () => {
      isMounted = false;
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [router, isErrorRedirect, authenticated]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}