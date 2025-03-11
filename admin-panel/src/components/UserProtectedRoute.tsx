// src/components/UserProtectedRoute.tsx
"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../config/firebase';

export default function UserProtectedRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    console.log("UserProtectedRoute mounted");
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!isMounted) return;
      
      if (!user) {
        console.log("No user, redirecting to login");
        router.push('/login');
        return;
      }
      
      // User is logged in, allow access to user area
      setLoading(false);
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

  return <>{children}</>;
}