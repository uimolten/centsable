
"use client";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ClientLayout from "../client-layout";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { resetAllUsersProgress } from "@/ai/flows/reset-all-users-progress-flow";
import { Loader2 } from "lucide-react";

function AdminPageContent() {
  const { user, isAdmin, authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/auth');
      } else if (!isAdmin) {
        router.push('/');
      }
    }
  }, [user, isAdmin, authLoading, router]);

  const handleReset = async () => {
    setIsResetting(true);
    try {
      const result = await resetAllUsersProgress();
      if (result.success) {
        toast({
          title: "Success!",
          description: `Reset learning progress for ${result.usersReset} users.`,
        });
      } else {
        throw new Error(result.message || "An unknown error occurred.");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Reset Failed",
        description: error.message,
      });
    } finally {
      setIsResetting(false);
    }
  };

  if (authLoading || !isAdmin) {
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
        Use the tools below to manage the application.
      </p>

      <div className="mt-8 max-w-md space-y-4">
        <div className="p-6 border border-destructive/50 rounded-lg bg-destructive/10">
          <h3 className="text-xl font-bold text-destructive-foreground">Danger Zone</h3>
          <p className="text-destructive-foreground/80 mt-2">
            This action is irreversible and will reset the learning progress (XP, level, completed lessons) for all users.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="mt-4 w-full" disabled={isResetting}>
                {isResetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Reset All User Progress
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all learning progress for every user in the database. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset} className="bg-destructive hover:bg-destructive/90">
                  Yes, reset all progress
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
    return (
        <ClientLayout>
            <AdminPageContent />
        </ClientLayout>
    )
}
