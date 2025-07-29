
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileHeader } from "@/components/profile/profile-header";
import { StatCard } from "@/components/profile/stat-card";
import { Achievements } from "@/components/profile/achievements";
import { AccountSettings } from "@/components/profile/account-settings";
import { Flame, GraduationCap, Coins } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserData } from "@/types/user";
import { updateQuestProgress } from "@/ai/flows/update-quest-progress-flow";
import { LEVEL_THRESHOLDS } from "@/lib/level-config";

export default function ProfilePage() {
  const { user, userData: authUserData, loading: authLoading, refreshUserData } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(authUserData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    setUserData(authUserData);
    if(authUserData) {
        setLoading(false);
    }
  }, [authUserData]);

  const handleUpdateUser = async () => {
    await refreshUserData?.();
    if(user){
      await updateQuestProgress({ userId: user.uid, actionType: 'update_profile' });
      await refreshUserData?.();
    }
  };
  
  if (authLoading || loading || !user || !userData) {
    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-32 w-32 rounded-full" />
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
        {/* Achievements Skeleton */}
        <div>
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-24 w-24 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  const currentLevelThreshold = LEVEL_THRESHOLDS.find(t => t.level === userData.level);
  const nextLevelThreshold = LEVEL_THRESHOLDS.find(t => t.level === userData.level + 1);
  
  const xpForCurrentLevel = currentLevelThreshold?.totalXPNeeded ?? 0;
  const xpForNextLevel = nextLevelThreshold?.totalXPNeeded ?? userData.xp;
  
  const xpInCurrentLevel = userData.xp - xpForCurrentLevel;
  const xpToNextLevel = xpForNextLevel - xpForCurrentLevel;

  const progressPercentage = xpToNextLevel > 0 ? (xpInCurrentLevel / xpToNextLevel) * 100 : 100;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      <ProfileHeader 
        user={userData} 
        onUpdateUser={handleUpdateUser} 
        xpInCurrentLevel={xpInCurrentLevel}
        xpToNextLevel={xpToNextLevel}
        progressPercentage={progressPercentage}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={Flame} value={userData.streak} label="Day Streak" />
        <StatCard icon={Coins} value={userData.cents} label="Cents Balance" />
        <StatCard icon={GraduationCap} value={userData.lessonsCompleted} label="Lessons Completed" />
      </div>

      <Achievements earnedAchievements={userData.achievements} />
      
      <AccountSettings user={userData} />
    </div>
  );
}
