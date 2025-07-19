
"use client";

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { UserData } from "@/types/user";
import { Pencil, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { updateUsername } from '@/ai/flows/update-username-flow';
import { updateQuestProgress } from '@/ai/flows/update-quest-progress-flow';
import { useAuth } from '@/hooks/use-auth';
import { Logo } from '../logo';

interface ProfileHeaderProps {
  user: UserData;
  onUpdateUser: () => Promise<void>;
  levelXP: number;
}

export function ProfileHeader({ user, onUpdateUser, levelXP }: ProfileHeaderProps) {
  const { refreshUserData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user.displayName ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setDisplayName(user.displayName ?? '');
  }, [user.displayName]);

  const handleSave = async () => {
    if (displayName.trim().length < 3) {
      toast({
        variant: "destructive",
        title: "Username too short",
        description: "Your username must be at least 3 characters long.",
      });
      return;
    }
    
    if (displayName === user.displayName) {
        setIsEditing(false);
        return;
    }

    setIsLoading(true);
    try {
      const result = await updateUsername({ userId: user.uid, newUsername: displayName });

      if (result.success) {
        await onUpdateUser();
        await updateQuestProgress({ userId: user.uid, actionType: 'update_profile' });
        await refreshUserData?.();
        toast({ title: "Username updated successfully!" });
        setIsEditing(false);
      } else {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: result.message || "That username is not appropriate.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Could not update username. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setDisplayName(user.displayName ?? '');
    setIsEditing(false);
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  }

  const progressPercentage = (user.xp / levelXP) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center gap-4 p-8 bg-card/30 backdrop-blur-lg border border-border/10 rounded-2xl"
    >
      <div className="relative">
        <Avatar className="h-32 w-32 mb-4 border-4 border-primary shadow-glow">
          <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
          <AvatarFallback className="text-4xl bg-muted">
            <Logo className="scale-150" />
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex items-center gap-2">
        {!isEditing ? (
          <h1 className="text-4xl font-bold font-headline">{displayName || user.email}</h1>
        ) : (
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="text-4xl font-bold font-headline h-auto bg-background/50 text-center"
            disabled={isLoading}
          />
        )}
        {isEditing ? (
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : 'Save'}
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel} disabled={isLoading}>Cancel</Button>
          </div>
        ) : (
          <Button variant="ghost" size="icon" onClick={handleEdit} className="rounded-full">
            <Pencil className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="w-full max-w-md">
        <div className="flex justify-between items-center text-sm font-semibold text-muted-foreground mb-1">
          <span>Level {user.level}</span>
          <span>{user.xp} / {levelXP} XP</span>
        </div>
        <div className="relative h-4 rounded-full bg-muted/30">
            <div className="absolute inset-0 h-full w-full overflow-hidden rounded-full">
            <motion.div
                className="h-full bg-gradient-to-r from-primary to-green-400"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ 
                    boxShadow: `0 0 10px 1px hsl(var(--primary) / 0.7)` 
                }} 
            />
            </div>
        </div>
      </div>
    </motion.div>
  );
}
