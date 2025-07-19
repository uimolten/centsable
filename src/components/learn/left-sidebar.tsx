
"use client";

import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Quest } from '@/types/quests';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Gem, Coins, CheckCircle2, Loader2, X } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Skeleton } from '../ui/skeleton';
import { QuestIcon } from './quest-icon';
import { generateDailyQuests } from '@/ai/flows/generate-daily-quests-flow';
import { isSameDay, isBefore } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface QuestItemProps {
  quest: Quest;
}

const QuestItem = ({ quest }: QuestItemProps) => {
  const progress = (quest.currentProgress / quest.targetAmount) * 100;
  
  return (
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0">
        {quest.isCompleted ? (
          <CheckCircle2 className="w-10 h-10 text-primary" />
        ) : (
          <QuestIcon questId={quest.questId} className="w-10 h-10" />
        )}
      </div>
      <div className="flex-grow min-w-0">
        <p className={cn("font-semibold leading-tight", quest.isCompleted && "line-through text-muted-foreground")}>
          {quest.description.replace('[X]', quest.targetAmount.toString())}
        </p>
        {!quest.isCompleted && (
          <div className="flex items-center gap-2 mt-1">
            <Progress value={progress} className="h-2 flex-grow" />
            <span className="text-xs font-mono text-muted-foreground">
              {quest.currentProgress}/{quest.targetAmount}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center flex-shrink-0 ml-2">
        <div className="flex items-center gap-1 font-bold text-primary">
          <Gem className="w-4 h-4" />
          <span>{quest.rewardXP}</span>
        </div>
        <div className="flex items-center gap-1 font-bold text-yellow-400">
          <Coins className="w-4 h-4" />
          <span>{quest.rewardCents}</span>
        </div>
      </div>
    </div>
  );
};


interface LeftSidebarProps {
  isSheet?: boolean;
}

export function LeftSidebar({ isSheet = false }: LeftSidebarProps) {
  const { user, userData, refreshUserData } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);

  const quests = useMemo(() => userData?.dailyQuests ?? [], [userData?.dailyQuests]);

  useEffect(() => {
    const generateQuestsIfNeeded = async () => {
      if (!user || !userData) return;

      const pacificTimeZone = 'America/Los_Angeles';
      const now = new Date();
      const nowInPacific = toZonedTime(now, pacificTimeZone);
      
      let lastGeneratedDate: Date | null = null;
      if (userData.lastQuestGenerated) {
        lastGeneratedDate = toZonedTime(userData.lastQuestGenerated.toDate(), pacificTimeZone);
      }
      
      const fiveAmTodayPacific = new Date(nowInPacific);
      fiveAmTodayPacific.setHours(5, 0, 0, 0);

      const needsNewQuests = !lastGeneratedDate || 
                             (!isSameDay(nowInPacific, lastGeneratedDate) && isBefore(lastGeneratedDate, fiveAmTodayPacific));

      if (needsNewQuests && !isGenerating) {
        setIsGenerating(true);
        try {
          await generateDailyQuests({ userId: user.uid });
          await refreshUserData?.();
        } catch (error) {
          console.error("Failed to generate new quests:", error);
        } finally {
          setIsGenerating(false);
        }
      }
    };

    generateQuestsIfNeeded();
  }, [user, userData, isGenerating, refreshUserData]);

  const renderContent = () => {
    if (isGenerating || !userData) {
      return (
        <div className="space-y-4 px-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      );
    }
    
    if (quests.length === 0) {
      return (
        <div className="text-center text-muted-foreground px-6 py-12">
          New quests will arrive tomorrow! Check back to continue your adventure.
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        {quests.map(quest => (
          <QuestItem key={quest.id} quest={quest} />
        ))}
      </div>
    );
  };
  
  return (
    <Card className="bg-card/90 backdrop-blur-lg border-border/10 p-0 relative overflow-hidden h-full flex flex-col">
       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_100%_50%_at_50%_-20%,hsl(var(--primary)/0.15),transparent)]" />
       
       {isSheet && (
          <button onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))} className="absolute top-3 right-3 z-50">
             <X className="w-6 h-6 text-muted-foreground" />
          </button>
       )}

      <CardHeader className="relative z-10">
        <CardTitle className="text-2xl font-bold font-headline">Daily Quests</CardTitle>
        <CardDescription>Complete quests to earn XP and Cents!</CardDescription>
      </CardHeader>
      <Separator className="mx-6 w-auto bg-border/20" />
      <CardContent className="py-6 flex-grow relative z-10">
        {renderContent()}
      </CardContent>
      <Separator className="mx-6 w-auto bg-border/20" />
      <CardFooter className="py-4 relative z-10">
          <p className="text-xs text-muted-foreground w-full text-center">
              Quests refresh daily at 5 AM PT.
          </p>
      </CardFooter>
    </Card>
  );
}
