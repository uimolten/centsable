
"use client";

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { shuffle } from 'lodash';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { savingsSorterItems } from '@/data/minigame-savings-sorter-data';
import { PiggyBank, Hand, Target, Star, Timer, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { updateQuestProgress } from '@/ai/flows/update-quest-progress-flow';
import { playClickSound, playCorrectSound, playIncorrectSound } from '@/lib/audio-utils';
import { awardGameRewards } from '@/ai/flows/award-game-rewards-flow';
import { saveGameSummary } from '@/ai/flows/save-game-summary-flow';
import type { GameSummary } from '@/types/user';
import { useToast } from '@/hooks/use-toast';
import { REWARD_LIMIT } from '@/data/minigame-credit-swipe-data'; // Re-use from another game config
import { toZonedTime } from 'date-fns-tz';
import { intervalToDuration, formatDuration, isBefore, startOfDay, addDays, subDays } from 'date-fns';

type GameState = 'start' | 'playing' | 'end';
type ItemCategory = 'Need' | 'Want';

interface GameItem {
  id: number;
  text: string;
  category: ItemCategory;
}

const GAME_DURATION = 30; // seconds
const PACIFIC_TIMEZONE = 'America/Los_Angeles';

const formatHMS = (duration: Duration) => {
    const hours = (duration.hours ?? 0).toString().padStart(2, '0');
    const minutes = (duration.minutes ?? 0).toString().padStart(2, '0');
    const seconds = (duration.seconds ?? 0).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

const RewardStatus = () => {
    const { userData } = useAuth();
    const [cooldown, setCooldown] = useState('');
    const [rewardsLeft, setRewardsLeft] = useState(REWARD_LIMIT);

    useEffect(() => {
        if (!userData) return;

        const rewardHistory = (userData.dailyRewardClaims ?? []).map(t => t.toDate());
        
        const nowInPacific = toZonedTime(new Date(), PACIFIC_TIMEZONE);
        let lastResetTime = startOfDay(nowInPacific);
        lastResetTime.setHours(5);

        if (isBefore(nowInPacific, lastResetTime)) {
            lastResetTime = subDays(lastResetTime, 1);
        }
        
        const recentRewards = rewardHistory.filter(ts => isBefore(lastResetTime, toZonedTime(ts, PACIFIC_TIMEZONE)));
        setRewardsLeft(REWARD_LIMIT - recentRewards.length);

        if (recentRewards.length >= REWARD_LIMIT) {
            let nextResetTime = startOfDay(nowInPacific);
            nextResetTime.setHours(5);
            if (isBefore(nextResetTime, nowInPacific) || nowInPacific.getTime() === nextResetTime.getTime()) {
              nextResetTime = addDays(nextResetTime, 1);
            }
            
            const updateCooldown = () => {
                const zonedNow = toZonedTime(new Date(), PACIFIC_TIMEZONE);
                if (isBefore(zonedNow, nextResetTime)) {
                    const duration = intervalToDuration({ start: zonedNow, end: nextResetTime });
                    setCooldown(formatHMS(duration));
                } else {
                    setCooldown('');
                    setRewardsLeft(REWARD_LIMIT);
                    if (intervalId) clearInterval(intervalId);
                }
            };
            
            updateCooldown();
            const intervalId = setInterval(updateCooldown, 1000);
            return () => clearInterval(intervalId);
        } else {
            setCooldown('');
        }
    }, [userData]);

    if (rewardsLeft > 0) {
        return (
            <div className="flex items-center gap-3 text-green-400"><ShieldCheck className="w-6 h-6" /><p><b>Rewards Active:</b> {rewardsLeft}/{REWARD_LIMIT} available</p></div>
        );
    }
    
    return (
         <div className="flex items-center gap-3 text-yellow-300"><Timer className="w-6 h-6" /><p><b>Next Reward In:</b> <span className="font-semibold text-yellow-300">{cooldown}</span></p></div>
    );
}

export function SavingsSorterGame() {
  const { user, userData, refreshUserData, triggerRewardAnimation, triggerLevelUp } = useAuth();
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>('start');
  const [items, setItems] = useState<GameItem[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const gameData = userData?.gameSummaries?.['savings-sorter'];
    if (gameData) {
        setHighScore(gameData.bestAttempt?.score ?? 0);
    }
  }, [userData]);


  const handleGameEnd = useCallback(async () => {
    setGameState('end');
    playIncorrectSound(); // Time's up sound

    const finalScore = score;
    const isNewHighScore = finalScore > highScore;
    if (isNewHighScore) {
      setHighScore(finalScore);
    }
    
    const summaryData: GameSummary = {
        score: finalScore,
        isNewHighScore: isNewHighScore,
        highScore: isNewHighScore ? finalScore : highScore,
    };

    if (user?.uid) {
        await saveGameSummary({ userId: user.uid, gameId: 'savings-sorter', summaryData });
       
        const questUpdates = [updateQuestProgress({ userId: user.uid, actionType: 'play_minigame_round'})];
        if (isNewHighScore) {
            questUpdates.push(updateQuestProgress({ userId: user.uid, actionType: 'beat_high_score'}));
        }
        await Promise.all(questUpdates);
       
        const rewardResult = await awardGameRewards({ userId: user.uid, gameId: 'savings-sorter', score: finalScore });
       
        if (rewardResult.success) {
            triggerRewardAnimation({ xp: rewardResult.xpAwarded, cents: rewardResult.centsAwarded });
        } else {
            toast({ variant: 'default', title: 'No Reward This Time', description: rewardResult.message });
        }
       
        const xpResult = await refreshUserData?.();
        if (xpResult?.leveledUp && xpResult.newLevel && xpResult.rewardCents) {
            triggerLevelUp({ newLevel: xpResult.newLevel, reward: xpResult.rewardCents });
        }
    }
  }, [score, highScore, user, refreshUserData, triggerRewardAnimation, triggerLevelUp, toast]);


  const startGame = () => {
    playClickSound();
    setItems(shuffle(savingsSorterItems));
    setCurrentItemIndex(0);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameState('playing');
  };

  const handleAnswer = (selectedCategory: ItemCategory) => {
    if (feedback) return; // Prevent multiple answers for the same item

    playClickSound();
    const currentItem = items[currentItemIndex];
    if (currentItem.category === selectedCategory) {
      playCorrectSound();
      setScore(prev => prev + 100);
      setFeedback('correct');
    } else {
      playIncorrectSound();
      setScore(prev => Math.max(0, prev - 50));
      setFeedback('incorrect');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentItemIndex < items.length - 1) {
        setCurrentItemIndex(prev => prev + 1);
      } else {
        // Loop back to the beginning if we run out of unique items
        setCurrentItemIndex(0);
        setItems(shuffle(savingsSorterItems));
      }
    }, 500);
  };
  
  useEffect(() => {
    if (gameState !== 'playing') return;

    if (timeLeft <= 0) {
      handleGameEnd();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft, handleGameEnd]);
  
  const currentItem = items[currentItemIndex];

  if (gameState === 'start') {
    return (
      <Card className="bg-card/50 backdrop-blur-lg border-border/20 text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
            <PiggyBank className="w-8 h-8 text-primary" /> Savings Sorter
          </CardTitle>
          <CardDescription className="text-lg">Quickly sort expenses into Needs and Wants!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-left p-4 bg-background/50 rounded-lg">
             <div className="flex items-start gap-3"><Hand className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b>How to Play:</b> An item will appear. Decide if it's a "Need" (essential) or a "Want" (nice to have) as fast as you can.</p></div>
             <div className="flex items-start gap-3"><Target className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b>Goal:</b> Score as many points as possible before the timer runs out. Correct answers give +100 points, incorrect answers give -50.</p></div>
             <div className="flex items-start gap-3"><Star className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b>High Score:</b> {highScore} points</p></div>
             <RewardStatus />
          </div>
          <Button size="lg" className="w-full text-xl font-bold shadow-glow" onClick={startGame}>Start Game</Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'end') {
    const isNewHighScore = score > highScore && score > 0;
    return (
      <Card className="bg-card/50 backdrop-blur-lg border-border/20 text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Time's Up!</CardTitle>
          <CardDescription className="text-lg">Here's how you did:</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isNewHighScore && (
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-2xl font-bold text-yellow-400 p-3 bg-yellow-400/10 rounded-lg">
              🎉 New High Score! 🎉
            </motion.div>
          )}
          <div className="text-6xl font-black text-primary">{score}</div>
          <p className="text-muted-foreground">Your previous high score was {highScore}.</p>
          <Button size="lg" className="w-full text-xl font-bold shadow-glow" onClick={startGame}>Play Again</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4 p-3 bg-card/50 rounded-lg">
        <div className="text-2xl font-bold">Score: <span className="text-primary">{score}</span></div>
        <div className="text-2xl font-bold">Time: <span className={cn(timeLeft <= 10 && "text-destructive animate-pulse")}>{timeLeft}s</span></div>
      </div>

      <div className="relative h-48 flex items-center justify-center mb-6">
        <AnimatePresence>
          {currentItem && (
             <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "absolute text-3xl font-bold text-center p-6 rounded-lg border-2 w-full",
                feedback === 'correct' && "bg-green-500/20 border-green-500",
                feedback === 'incorrect' && "bg-red-500/20 border-destructive animate-shake",
                !feedback && "bg-card border-border/20"
              )}
            >
              {currentItem.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button 
          className="text-2xl font-bold h-24 bg-blue-600/80 hover:bg-blue-600 border-4 border-blue-500/50 shadow-lg"
          onClick={() => handleAnswer('Need')}
          disabled={!!feedback}
        >
          Need
        </Button>
        <Button 
          className="text-2xl font-bold h-24 bg-purple-600/80 hover:bg-purple-600 border-4 border-purple-500/50 shadow-lg"
          onClick={() => handleAnswer('Want')}
          disabled={!!feedback}
        >
          Want
        </Button>
      </div>
    </div>
  );
}
