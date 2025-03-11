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
      const user = auth.currentUser;
      
      if (!user) {
        router.push('/login');
        return;
      }
      
      // Check if admin
      if (user.email === 'admin@thedailycatch.com') {
        router.push('/admin');
        return;
      }
      
      try {
        const userDoc = await getDoc(doc(db, "user_roles", user.uid));
        
        if (userDoc.exists() && userDoc.data().role === "admin") {
          router.push('/admin');
        } else {
          router.push('/user/dashboard');
        }
      } catch (error) {
        console.error("Error checking role:", error);
        router.push('/login');
      }
    };
    
    checkAuthAndRedirect();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}