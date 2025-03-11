// src/utils/auth.ts
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function assignUserRole(uid: string, email: string, role: string = 'user'): Promise<void> {
  console.log(`Assigning role ${role} to user ${email} (${uid})`);
  
  try {
    // Save to Firestore
    await setDoc(doc(db, "user_roles", uid), {
      email: email,
      role: role,
      createdAt: new Date().toISOString()
    });
    
    console.log(`Role ${role} successfully assigned to ${email}`);
  } catch (error) {
    console.error("Error assigning user role:", error);
    throw error;
  }
}

export async function checkUserRole(uid: string): Promise<string> {
  try {
    // Special case for admin email
    const user = auth.currentUser;
    if (user?.email === 'admin@thedailycatch.com') {
      return 'admin';
    }
    
    const userDoc = await getDoc(doc(db, "user_roles", uid));
    
    if (userDoc.exists()) {
      return userDoc.data().role;
    } else {
      // Default role is 'user'
      return 'user';
    }
  } catch (error) {
    console.error("Error checking user role:", error);
    return 'user'; // Default to user on error
  }
}