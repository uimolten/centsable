
"use client";

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserData } from "@/types/user";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from '@/hooks/use-toast';
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
import { playClickSound, playIncorrectSound } from '@/lib/audio-utils';

interface AccountSettingsProps {
  user: UserData;
}

export function AccountSettings({ user }: AccountSettingsProps) {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const [isResetting, setIsResetting] = useState(false);

  const handlePasswordReset = async () => {
    playClickSound();
    setIsResetting(true);
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast({
        title: "Password Reset Email Sent",
        description: "Check your inbox for instructions to reset your password.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error Sending Email",
        description: error.message,
      });
    } finally {
      setIsResetting(false);
    }
  };
  
  const handleDeleteAccount = () => {
    playIncorrectSound(); // Use a "danger" sound
    // This is a placeholder. A real implementation would require a backend function.
    toast({
        variant: "destructive",
        title: "Account Deletion Unavailable",
        description: "This feature is not yet implemented.",
    });
  }

  const handleSignOut = () => {
    playClickSound();
    signOut();
  }

  return (
    <div>
      <h2 className="text-3xl font-bold font-headline mb-6">Account Settings</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-card/30 backdrop-blur-lg border-border/10">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Manage your account details and security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Email</span>
              <span className="font-semibold">{user.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Password</span>
              <Button variant="secondary" onClick={handlePasswordReset} disabled={isResetting}>
                {isResetting ? 'Sending...' : 'Change Password'}
              </Button>
            </div>
             <Button variant="outline" className="w-full" onClick={handleSignOut}>Log Out</Button>
          </CardContent>
        </Card>
        
        <Card className="bg-destructive/10 backdrop-blur-lg border-destructive/50">
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>These actions are permanent and cannot be undone.</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full" onClick={playClickSound}>Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove all of your progress from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={playClickSound}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90">
                    Delete My Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
