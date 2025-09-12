
"use client";

import React, { createContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc, collection, getDocs, Timestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
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
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [levelUpData, setLevelUpData] = useState<LevelUpData | null>(null);
  const [rewardAnimationData, setRewardAnimationData] = useState<RewardAnimationData | null>(null);

  useEffect(() => {
    console.log("Setting up Auth state listener...");
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed. User:", currentUser ? currentUser.uid : null);
      setUser(currentUser);
      if (!currentUser) {
        setAuthLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    // This is the CRITICAL CHANGE. We now check for a valid user.uid.
    if (user?.uid) {
      console.log(`%cSetting up profile listener for UID: ${user.uid}`, "color: yellow;");
      
      const questsQuery = query(collection(db, 'users', user.uid, 'daily_quests'), orderBy('assignedDate', 'desc'));
      
      const userDocRef = doc(db, 'users', user.uid);
      const unsubscribeProfile = onSnapshot(userDocRef, async (docSnap) => {
        if (docSnap.exists()) {
          console.log("%cProfile data received:", "color: lightgreen;", docSnap.data());
          const data = docSnap.data();

          const questsSnapshot = await getDocs(questsQuery);
          const quests = questsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Quest));
          const calculatedLevel = getLevelFromXP(data.xp ?? 0);

          setUserData({
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
            dailyQuests: quests,
            dailyQuestsCompleted: data.dailyQuestsCompleted ?? false,
            dailyRewardClaims: data.dailyRewardClaims ?? [],
            gameSummaries: data.gameSummaries ?? {},
          });
        } else {
          console.log("User document does not exist.");
          // Create user document if it doesn't exist
          const newUserData: Omit<UserData, 'createdAt' | 'uid' | 'dailyQuests' | 'gameSummaries' | 'dailyRewardClaims'> = {
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
          // The listener will pick up the new document, so we don't set state here.
        }
        setLoading(false);
        setAuthLoading(false);
      }, (error) => {
        console.error("Firestore onSnapshot error:", error);
        setUserData(null);
        setLoading(false);
        setAuthLoading(false);
      });

      return () => unsubscribeProfile();
    } else if (!user) {
        // Handles logout case
        setUserData(null);
        setLoading(false);
        setAuthLoading(false);
    }
  }, [user]);

  const signOut = async () => {
    await firebaseSignOut(auth);
  };
  
  const refreshUserData = useCallback(async (): Promise<UserData | null> => {
     if (!user) return null;
     setLoading(true);
     const userDocRef = doc(db, 'users', user.uid);
     const questsQuery = query(collection(db, 'users', user.uid, 'daily_quests'), orderBy('assignedDate', 'desc'));
     
     try {
       const [userDoc, questsSnapshot] = await Promise.all([
         getDoc(userDocRef),
         getDocs(questsQuery),
       ]);
       
       if (userDoc.exists()) {
           const data = userDoc.data();
           const quests = questsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Quest));
           const calculatedLevel = getLevelFromXP(data.xp ?? 0);
           const refreshedData: UserData = {
              uid: user.uid,
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
              dailyQuests: quests,
              dailyQuestsCompleted: data.dailyQuestsCompleted ?? false,
              dailyRewardClaims: data.dailyRewardClaims ?? [],
              gameSummaries: data.gameSummaries ?? {},
           };
           setUserData(refreshedData);
           setLoading(false);
           return refreshedData;
       }
       return null;
     } catch (error) {
       console.error("Error refreshing user data:", error);
       setLoading(false);
       return null;
     }
  }, [user]);

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
    triggerRewardAnimation,
    signOut
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
