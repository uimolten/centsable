
"use client";

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc, collection, getDocs, Timestamp, query, orderBy } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { UserData } from '@/types/user';
import { Quest } from '@/types/quests';

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  authLoading: boolean; // For initial auth check
  signOut: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false); // For subsequent data refreshes
  const [authLoading, setAuthLoading] = useState(true); // For the initial auth state check

  const fetchUserData = useCallback(async (user: User | null, isInitialLoad: boolean = false) => {
    if (isInitialLoad) {
      setAuthLoading(true);
    } else {
      setLoading(true);
    }

    if (!user) {
        setUser(null);
        setUserData(null);
        setAuthLoading(false);
        setLoading(false);
        return;
    }
    
    setUser(user);
    try {
        const userDocRef = doc(db, 'users', user.uid);
        const questsQuery = query(collection(db, 'users', user.uid, 'daily_quests'), orderBy('assignedDate', 'desc'));
        
        const [userDoc, questsSnapshot] = await Promise.all([
          getDoc(userDocRef),
          getDocs(questsQuery),
        ]);
        
        const quests = questsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Quest));

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
              lastQuestGenerated: data.lastQuestGenerated,
              createdAt: data.createdAt,
              dailyQuests: quests,
            });
        } else {
            // If the user exists in Auth but not Firestore, create their record
            const newUserData: Omit<UserData, 'createdAt' | 'uid' | 'dailyQuests'> = {
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
            setUserData({ uid: user.uid, ...createdDoc.data() as Omit<UserData, 'uid' | 'dailyQuests'>, dailyQuests: [] });
        }

    } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
    } finally {
        setAuthLoading(false);
        setLoading(false);
    }
  }, []);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      fetchUserData(user, true);
    });
    return () => unsubscribe();
  }, [fetchUserData]);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setUserData(null);
  };

  const refreshUserData = useCallback(async () => {
    if (user) {
      await fetchUserData(user, false);
    }
  }, [user, fetchUserData]);
  
  const isAdmin = userData?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, userData, loading, authLoading, isAdmin, signOut, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
