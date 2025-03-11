// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import
    {
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
        User as FirebaseUser
    } from 'firebase/auth';

export function useAuth()
{
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() =>
    {
        const unsubscribe = onAuthStateChanged(auth, (user) =>
        {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) =>
    {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () =>
    {
        return signOut(auth);
    };

    return { user, loading, login, logout };
}