// src/app/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      // Add a small delay to ensure auth is initialized
      setTimeout(async () => {
        try {
          const user = auth.currentUser;
          console.log("Current user:", user?.email);
          
          if (!user) {
            router.push('/login');
            return;
          }
          
          // Admin email check - MAKE SURE THIS IS WORKING
          if (user.email === 'admin@thedailycatch.com') {
            console.log("Direct admin match found, redirecting to admin panel");
            sessionStorage.setItem('userRole', 'admin');
            router.push('/admin');
            return;
          }
          
          // Secondary check from Firestore
          try {
            const userDoc = await getDoc(doc(db, "user_roles", user.uid));
            console.log("User role data:", userDoc.data());
            
            if (userDoc.exists() && userDoc.data().role === "admin") {
              console.log("Admin role found in database");
              sessionStorage.setItem('userRole', 'admin');
              router.push('/admin');
            } else {
              console.log("Regular user, redirecting to user area");
              sessionStorage.setItem('userRole', 'user');
              router.push('/user/near-you');
            }
          } catch (error) {
            console.error("Error checking role:", error);
            router.push('/login?error=database');
          }
        } catch (error) {
          console.error("Auth error:", error);
          router.push('/login?error=auth');
        }
      }, 500);
    };
    
    checkAuthAndRedirect();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}