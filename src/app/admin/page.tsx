"use client";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth');
      } else if (!isAdmin) {
        router.push('/');
      }
    }
  }, [user, isAdmin, loading, router]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-bold">Verifying Access...</h1>
        <div className="mt-8 flex flex-col items-center gap-4">
          <Skeleton className="h-8 w-full max-w-md" />
          <Skeleton className="h-8 w-full max-w-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold font-headline">Admin Panel</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Welcome, Admin! This is where you can manage the application. Content coming soon!
      </p>
    </div>
  );
}
