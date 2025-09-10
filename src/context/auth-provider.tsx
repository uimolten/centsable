"use client";

import React, { createContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
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

  const fetchUserData = useCallback(async (currentUser: User | null): Promise<UserData | null> => {
    if (!currentUser) {
        setUserData(null);
        return null;
    }
    
    try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const questsQuery = query(collection(db, 'users', currentUser.uid, 'daily_quests'), orderBy('assignedDate', 'desc'));
        
        const [userDoc, questsSnapshot] = await Promise.all([
          getDoc(userDocRef),
          getDocs(questsQuery),
        ]);
        
        const quests = questsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Quest));
        
        let fetchedData;

        if (userDoc.exists()) {
            const data = userDoc.data();
            const calculatedLevel = getLevelFromXP(data.xp ?? 0);
             fetchedData = {
              uid: currentUser.uid,
              email: data.email,
              displayName: data.displayName || currentUser.displayName || 'New Adventurer',
              photoURL: data.photoURL || currentUser.photoURL,
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
              dailyRewardClaims: data.dailyRewardClaims ?? [],
              gameSummaries: data.gameSummaries ?? {},
            };
        } else {
            const newUserData: Omit<UserData, 'createdAt' | 'uid' | 'dailyQuests' | 'gameSummaries' | 'dailyRewardClaims'> = {
                email: currentUser.email!,
                displayName: currentUser.displayName || 'New Adventurer',
                photoURL: currentUser.photoURL,
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
            fetchedData = { uid: currentUser.uid, ...createdDoc.data() as Omit<UserData, 'uid' | 'dailyQuests'>, dailyQuests: [], dailyRewardClaims: [], gameSummaries: {} };
        }
        setUserData(fetchedData);
        return fetchedData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
        return null;
    }
  }, []);

  useEffect(() => {
    setAuthLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (newUser) => {
      setUser(newUser);
      await fetchUserData(newUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [fetchUserData]);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setUserData(null);
  };

  const refreshUserData = useCallback(async (): Promise<UserData | null> => {
    setLoading(true);
    const refreshedData = await fetchUserData(user);
    setLoading(false);
    return refreshedData;
  }, [user, fetchUserData]);
  
  const isAdmin = useMemo(() => userData?.role === 'admin', [userData]);

  const triggerLevelUp = useCallback((data: LevelUpData) => {
    setLevelUpData(data);
  }, []);

  const closeLevelUpModal = useCallback(() => {
    setLevelUpData(null);
  }, []);

  const triggerRewardAnimation = useCallback((data: RewardAnimationData) => {
    setRewardAnimationData(data);
    setTimeout(() => {
        setRewardAnimationData(null);
    }, 4000);
  }, []);

  const value = useMemo(() => ({
    user,
    userData,
    loading,
    authLoading,
    signOut,
    refreshUserData,
    isAdmin,
    levelUpData,
    triggerLevelUp,
    closeLevelUpModal,
    rewardAnimationData,
    triggerRewardAnimation
  }), [
    user, 
    userData, 
    loading, 
    authLoading, 
    refreshUserData, 
    isAdmin, 
    levelUpData, 
    triggerLevelUp, 
    closeLevelUpModal, 
    rewardAnimationData, 
    triggerRewardAnimation
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
