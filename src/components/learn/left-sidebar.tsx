
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Gem, Coins, CheckCircle2, Award, Loader2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { QuestIcon } from './quest-icon';
import { generateDailyQuests } from '@/ai/flows/generate-daily-quests-flow';
import { DailyQuest } from '@/types/quests';

const QuestItem = ({ quest }: { quest: DailyQuest }) => {
  const progressPercentage = quest.targetAmount > 0 ? (quest.currentProgress / quest.targetAmount) * 100 : 0;
  
  if (quest.isCompleted) {
    return (
      <div className="flex items-center gap-4 opacity-70">
        <div className="p-3 rounded-lg bg-green-500/20 text-green-400">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="flex-grow">
          <p className="font-semibold text-foreground line-through">{quest.description}</p>
          <p className="text-xs text-muted-foreground">Completed!</p>
        </div>
        <div className="flex items-center gap-1 text-yellow-400">
            <Award className="w-4 h-4"/>
            <span>Claimed</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="bg-primary/10 text-primary p-3 rounded-lg">
        <QuestIcon questId={quest.questId} />
      </div>
      <div className="flex-grow">
        <p className="font-semibold text-foreground">{quest.description}</p>
        <Progress value={progressPercentage} className="h-2 mt-1 bg-muted" />
        <p className="text-xs text-muted-foreground mt-1">{quest.currentProgress} / {quest.targetAmount}</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-primary">
            <Gem className="w-4 h-4" />
            <span>{quest.rewardXP}</span>
        </div>
        <div className="flex items-center gap-1 text-yellow-400">
             <Coins className="w-4 h-4" />
             <span>{quest.rewardCents}</span>
        </div>
      </div>
    </div>
  );
};


export function LeftSidebar() {
  const { user, userData, dailyQuests, loading: authLoading, refreshUserData } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const loading = authLoading || isGenerating;

  useEffect(() => {
    const handleGenerateQuests = async () => {
        if (!authLoading && user && userData) {
            const now = new Date();
            const lastGeneratedDate = userData.lastQuestGenerated?.toDate();
            let shouldGenerate = !lastGeneratedDate;

            if (lastGeneratedDate) {
                const pacificTimezoneOffset = -7 * 60; // PDT offset in minutes
                const localOffset = now.getTimezoneOffset();
                const nowInPacific = new Date(now.getTime() + (pacificTimezoneOffset - localOffset) * 60000);
                
                const lastGeneratedInPacific = new Date(lastGeneratedDate.getTime() + (pacificTimezoneOffset - localOffset) * 60000);
                
                const lastGenDay = lastGeneratedInPacific.getDate();
                const lastGenHour = lastGeneratedInPacific.getHours();

                // If it's a new day, or if it's the same day but after 5 AM and quests were generated before 5 AM
                if (nowInPacific.getDate() !== lastGenDay || (nowInPacific.getHours() >= 5 && lastGenHour < 5)) {
                    shouldGenerate = true;
                }
            }
            
            if (shouldGenerate) {
                setIsGenerating(true);
                await generateDailyQuests({ userId: user.uid });
                await refreshUserData?.(); // Refresh to get the new quests
                setIsGenerating(false);
            }
        }
    }
    handleGenerateQuests();
  }, [user, userData, authLoading, refreshUserData]);

  if (loading) {
    return (
         <Card className="bg-card/50 backdrop-blur-lg border-border/20">
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </CardContent>
        </Card>
    )
  }

  return (
    <div className="space-y-6 w-full max-w-sm">
      <Card className="bg-card/50 backdrop-blur-lg border-border/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-bold">Daily Quests</CardTitle>
          {isGenerating && <Loader2 className="h-5 w-5 animate-spin" />}
        </CardHeader>
        <CardContent className="space-y-4">
            {dailyQuests && dailyQuests.length > 0 ? (
                dailyQuests.map((quest) => (
                    <QuestItem key={quest.questId + quest.description} quest={quest} />
                ))
            ) : (
                <p className="text-muted-foreground text-sm p-4 text-center">Come back tomorrow for new quests!</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
