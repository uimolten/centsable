
"use client";

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc, collection, getDocs, Timestamp, query, orderBy } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { UserData } from '@/types/user';
import { Quest } from '@/types/quests';
import { getLevelFromXP } from '@/lib/level-config';

interface LevelUpData {
    newLevel: number;
    reward: number;
}

interface RewardAnimationData {
    xp: number;
    cents: number;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  authLoading: boolean; // For initial auth check
  signOut: () => Promise<void>;
  refreshUserData: () => Promise<UserData | null>;
  isAdmin: boolean;
  levelUpData: LevelUpData | null;
  triggerLevelUp: (data: LevelUpData) => void;
  closeLevelUpModal: () => void;
  rewardAnimationData: RewardAnimationData | null;
  triggerRewardAnimation: (data: RewardAnimationData) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false); // For subsequent data refreshes
  const [authLoading, setAuthLoading] = useState(true); // For the initial auth state check
  const [levelUpData, setLevelUpData] = useState<LevelUpData | null>(null);
  const [rewardAnimationData, setRewardAnimationData] = useState<RewardAnimationData | null>(null);

  const fetchUserData = useCallback(async (user: User | null, isInitialLoad: boolean = false): Promise<UserData | null> => {
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
        return null;
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
        
        let fetchedData;

        if (userDoc.exists()) {
            const data = userDoc.data();
            // Recalculate level on client to ensure it's always in sync with XP
            const calculatedLevel = getLevelFromXP(data.xp ?? 0);
             fetchedData = {
              uid: user.uid,
              email: data.email,
              displayName: data.displayName || user.displayName || 'New Adventurer',
              photoURL: data.photoURL || user.photoURL,
              role: data.role || 'user',
              xp: data.xp ?? 0,
              level: calculatedLevel,
              cents: data.cents ?? 0,
              streak: data.streak ?? 0,
              lessonsCompleted: data.lessonsCompleted ?? 0,
              achievements: data.achievements ?? [],
              completedLessons: data.completedLessons ?? [],
              lastQuestGenerated: data.lastQuestGenerated,
              createdAt: data.createdAt,
              dailyQuests: quests,
              dailyQuestsCompleted: data.dailyQuestsCompleted ?? false,
              gameSummaries: data.gameSummaries ?? {},
            };
        } else {
            // If the user exists in Auth but not Firestore, create their record
            const newUserData: Omit<UserData, 'createdAt' | 'uid' | 'dailyQuests' | 'gameSummaries'> = {
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
                completedLessons: [],
                dailyQuestsCompleted: false,
            };
            await setDoc(userDocRef, {
                ...newUserData,
                createdAt: serverTimestamp(),
            });
            const createdDoc = await getDoc(userDocRef);
            fetchedData = { uid: user.uid, ...createdDoc.data() as Omit<UserData, 'uid' | 'dailyQuests'>, dailyQuests: [], gameSummaries: {} };
        }
        setUserData(fetchedData);
        return fetchedData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
        return null;
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

  const refreshUserData = useCallback(async (): Promise<UserData | null> => {
    if (user) {
      return await fetchUserData(user, false);
    }
    return null;
  }, [user, fetchUserData]);
  
  const isAdmin = userData?.role === 'admin';

  const triggerLevelUp = (data: LevelUpData) => {
    setLevelUpData(data);
  };

  const closeLevelUpModal = () => {
    setLevelUpData(null);
  };

  const triggerRewardAnimation = useCallback((data: RewardAnimationData) => {
    setRewardAnimationData(data);
    // Reset after a delay to allow the animation component to unmount
    setTimeout(() => {
        setRewardAnimationData(null);
    }, 4000);
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading, authLoading, isAdmin, signOut, refreshUserData, levelUpData, triggerLevelUp, closeLevelUpModal, rewardAnimationData, triggerRewardAnimation }}>
      {children}
    </AuthContext.Provider>
  );
}
