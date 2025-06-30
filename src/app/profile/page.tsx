"use client";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-32 w-32 mb-4 border-4 border-primary">
          <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
          <AvatarFallback className="text-4xl">{user.email?.[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold font-headline">{user.displayName || 'Anonymous Adventurer'}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{user.email}</p>
      </div>
      {/* Additional profile content will go here */}
    </div>
  );
}
