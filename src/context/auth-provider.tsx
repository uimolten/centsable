
"use client";

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { UserData } from '@/types/user';

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async (user: User | null) => {
    if (!user) {
        setUser(null);
        setUserData(null);
        setLoading(false);
        return;
    }
    
    setUser(user);
    try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const data = userDoc.data();
             setUserData({
              uid: user.uid,
              email: data.email,
              displayName: data.displayName || user.displayName || 'New Adventurer',
              photoURL: data.photoURL || user.photoURL,
              role: data.role || 'user',
              xp: data.xp ?? 0,
              level: data.level ?? 1,
              cents: data.cents ?? 0,
              streak: data.streak ?? 0,
              lessonsCompleted: data.lessonsCompleted ?? 0,
              achievements: data.achievements ?? [],
              completedLessons: data.completedLessons ?? [],
              createdAt: data.createdAt,
            });
        } else {
            // If the user exists in Auth but not Firestore, create their record
            const newUserData: Omit<UserData, 'createdAt'> = {
                uid: user.uid,
                email: user.email!,
                displayName: user.displayName || 'New Adventurer',
                photoURL: user.photoURL,
                role: 'user',
                xp: 0,
                level: 1,
                cents: 0,
                streak: 0,
                lessonsCompleted: 0,
                achievements: [],
                completedLessons: []
            };
            await setDoc(userDocRef, {
                ...newUserData,
                createdAt: serverTimestamp(),
            });
            const createdDoc = await getDoc(userDocRef);
            setUserData(createdDoc.data() as UserData);
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
    } finally {
        setLoading(false);
    }
  }, []);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      fetchUserData(user);
    });
    return () => unsubscribe();
  }, [fetchUserData]);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setUserData(null);
  };

  const refreshUserData = async () => {
    if (user) {
      setLoading(true);
      await fetchUserData(user);
    }
  };
  
  const isAdmin = userData?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, userData, loading, isAdmin, signOut, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
