
"use client";

import React, { createContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, onSnapshot, collection, query, orderBy } from 'firebase/firestore';
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
  authLoading: boolean; 
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
  const [loading, setLoading] = useState(true);
  const [levelUpData, setLevelUpData] = useState<LevelUpData | null>(null);
  const [rewardAnimationData, setRewardAnimationData] = useState<RewardAnimationData | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // If there's no user, we can immediately stop loading.
      if (!currentUser) {
        setUserData(null);
        setLoading(false);
      }
      // If there IS a user, we wait for the Firestore listener to set loading to false.
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      setLoading(true);
      
      // Listener for the main user document
      const userDocRef = doc(db, 'users', user.uid);
      const unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const calculatedLevel = getLevelFromXP(data.xp ?? 0);
          setUserData(prevData => ({
            ...(prevData ?? {}), // Ensure prevData is not null
            uid: docSnap.id,
            email: data.email,
            displayName: data.displayName || 'New Adventurer',
            photoURL: data.photoURL,
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
            dailyQuestsCompleted: data.dailyQuestsCompleted ?? false,
            dailyRewardClaims: data.dailyRewardClaims ?? [],
            gameSummaries: data.gameSummaries ?? {},
          } as UserData));
        } else {
          setUserData(null);
        }
        // Don't set loading to false here; wait for quest listener
      }, (error) => {
        console.error("User document onSnapshot error:", error);
        setUserData(null);
        setLoading(false);
      });
      
      // Listener for the quests subcollection
      const questsQuery = query(collection(db, 'users', user.uid, 'daily_quests'), orderBy('assignedDate', 'desc'));
      const unsubscribeQuests = onSnapshot(questsQuery, (querySnapshot) => {
        const quests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Quest));
        setUserData(prevData => {
            if (!prevData) return null; // Should not happen if user is logged in
            return {
                ...prevData,
                dailyQuests: quests,
            }
        });
        setLoading(false); // Data is now fully loaded after both listeners have fired.
      }, (error) => {
        console.error("Quests subcollection onSnapshot error:", error);
        setLoading(false);
      });

      return () => {
        unsubscribeProfile();
        unsubscribeQuests();
      };
    } else {
        // This handles the case where the user logs out.
        setUserData(null);
        setLoading(false);
    }
  }, [user]);

  const signOut = async () => {
    await firebaseSignOut(auth);
  };
  
  const refreshUserData = useCallback(async (): Promise<UserData | null> => {
     return userData;
  }, [userData]);

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
    authLoading: loading,
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
    isAdmin, 
    levelUpData, 
    rewardAnimationData,
    refreshUserData,
    triggerLevelUp,
    closeLevelUpModal,
    triggerRewardAnimation
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
