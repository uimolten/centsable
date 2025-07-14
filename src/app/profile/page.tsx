
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

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/auth');
      } else {
        const fetchUserData = async () => {
          setLoading(true);
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData({
              uid: user.uid,
              email: data.email,
              displayName: data.displayName || user.displayName,
              photoURL: data.photoURL || user.photoURL,
              role: data.role,
              xp: data.xp ?? 0,
              level: data.level ?? 1,
              cents: data.cents ?? 0,
              streak: data.streak ?? 0,
              lessonsCompleted: data.lessonsCompleted ?? 0,
              achievements: data.achievements ?? [],
              createdAt: data.createdAt,
            });
          }
          setLoading(false);
        };
        fetchUserData();
      }
    }
  }, [user, authLoading, router]);

  const handleUpdateUser = (newUserData: Partial<UserData>) => {
    if (userData) {
      setUserData(prev => ({...prev!, ...newUserData}));
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

  const levelXP = Math.floor(userData.level * 1.5 * 1000);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      <ProfileHeader 
        user={userData} 
        onUpdateUser={handleUpdateUser} 
        levelXP={levelXP}
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
