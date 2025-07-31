
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Hand, Target, Star } from 'lucide-react';
import { levels as gameLevels, Level } from '@/data/minigame-budget-busters-data';
import { LevelDisplay } from '@/components/minigames/level-display';
import { Mascot } from '@/components/lesson/mascot';
import { useAuth } from '@/hooks/use-auth';
import { updateQuestProgress } from '@/ai/flows/update-quest-progress-flow';

type GameState = 'start' | 'playing' | 'level-end';

export function BudgetBustersGame() {
  const { user, refreshUserData } = useAuth();
  const [gameState, setGameState] = useState<GameState>('start');
  const [levelIndex, setLevelIndex] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [wasSuccess, setWasSuccess] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameLevels[levelIndex].timer);

  const handleLevelCompleteRef = useRef<(score: number, success: boolean) => void>();

  useEffect(() => {
    const savedHighScore = localStorage.getItem('budgetBustersHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  const triggerQuestUpdate = async (isSuccess: boolean, newScore: number) => {
    if (!user || !refreshUserData) return;
    
    const updates = [updateQuestProgress({ userId: user.uid, actionType: 'play_minigame_round' })];
    if (isSuccess && newScore > highScore) {
      updates.push(updateQuestProgress({ userId: user.uid, actionType: 'beat_high_score' }));
    }
    
    await Promise.all(updates);
    await refreshUserData();
  };

  const handleLevelComplete = useCallback((score: number, success: boolean) => {
    const timeBonus = success ? timeLeft * 50 : 0;
    const totalScore = score + timeBonus; 
    setFinalScore(totalScore);
    setWasSuccess(success);
    setGameState('level-end');
    
    const isNewHighScore = success && totalScore > highScore;
    if (isNewHighScore) {
      setHighScore(totalScore);
      localStorage.setItem('budgetBustersHighScore', totalScore.toString());
    }
    
    triggerQuestUpdate(success, totalScore);
  }, [timeLeft, highScore, user, refreshUserData]);

  useEffect(() => {
    handleLevelCompleteRef.current = handleLevelComplete;
  }, [handleLevelComplete]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          handleLevelCompleteRef.current?.(0, false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [gameState]);


  const startGame = () => {
    setTimeLeft(gameLevels[levelIndex].timer);
    setGameState('playing');
  }

  const handleNext = () => {
    if (wasSuccess && levelIndex < gameLevels.length - 1) {
      const newLevelIndex = levelIndex + 1;
      setLevelIndex(newLevelIndex);
      setTimeLeft(gameLevels[newLevelIndex].timer);
      setGameState('playing');
    } else {
      setLevelIndex(0);
      setTimeLeft(gameLevels[0].timer);
      setGameState('start');
    }
  };

  const handleRestart = () => {
    setTimeLeft(gameLevels[levelIndex].timer);
    setGameState('playing');
  };

  const currentLevel = gameLevels[levelIndex];

  if (gameState === 'start') {
    return (
      <Card className="bg-card/50 backdrop-blur-lg border-border/20 text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
            <PieChart className="w-8 h-8 text-primary" /> Budget Busters
          </CardTitle>
          <CardDescription className="text-lg">Handle surprise expenses before time runs out!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-left p-4 bg-background/50 rounded-lg">
             <div className="flex items-start gap-3"><Hand className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">How to Play:</b> A surprise expense will pop up! Drag money from your 'Wants' and 'Savings' tanks to cover the cost before the timer runs out.</p></div>
             <div className="flex items-start gap-3"><Target className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">Goal:</b> Prioritize! Pulling from 'Wants' gives you a higher score bonus than pulling from 'Savings'. Needs are locked.</p></div>
             <div className="flex items-start gap-3"><Star className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">High Score:</b> {highScore} points</p></div>
          </div>
          <Button size="lg" className="w-full text-xl font-bold shadow-glow" onClick={startGame}>Start Game</Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'level-end') {
    return (
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 text-center p-8">
            <CardHeader className="p-0 mb-4">
                <div className="flex justify-center mb-4">
                    <Mascot isHappy={wasSuccess} isSad={!wasSuccess} />
                </div>
                <CardTitle className="text-3xl font-bold">{wasSuccess ? "Crisis Averted!" : "Time's Up!"}</CardTitle>
                <CardDescription className="text-lg">{wasSuccess ? "You handled that budget buster like a pro." : "That surprise expense got the better of you."}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-0">
                <div className="text-6xl font-black text-primary">{finalScore}</div>
                 <div className="flex justify-center gap-4">
                    <Button size="lg" variant="outline" className="text-lg" onClick={handleRestart}>Try Again</Button>
                    <Button size="lg" className="text-lg shadow-glow" onClick={handleNext}>
                        {wasSuccess && levelIndex < gameLevels.length - 1 ? "Next Level" : "Main Menu"}
                    </Button>
                 </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <LevelDisplay
      key={levelIndex}
      level={currentLevel}
      onLevelComplete={handleLevelComplete}
      timeLeft={timeLeft}
    />
  );
}
