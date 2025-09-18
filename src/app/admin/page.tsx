"use client";

import { AdminRoute } from "@/components/AdminRoute";
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
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

function AdminPageContent() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "You must be logged in to perform this action.",
      });
      return;
    }

    setIsResetting(true);
    try {
      const result = await resetAllUsersProgress({ adminUserId: user.uid });
      if (result.success) {
        toast({
          title: "Success!",
          description: `${result.usersReset} users have had their progress reset.`,
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
                  This will reset the learning progress (XP, level, etc.) for every single user. This action cannot be undone.
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

const ProtectedAdminPage = () => (
    <AdminRoute>
        <AdminPageContent />
    </AdminRoute>
);

export default ProtectedAdminPage;
