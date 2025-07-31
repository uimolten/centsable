
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Hand, Target, Star } from 'lucide-react';
import { gameConfig, SurpriseExpense } from '@/data/minigame-budget-busters-data';
import { LevelDisplay } from '@/components/minigames/level-display';
import { Mascot } from '@/components/lesson/mascot';
import { useAuth } from '@/hooks/use-auth';
import { updateQuestProgress } from '@/ai/flows/update-quest-progress-flow';
import { shuffle } from 'lodash';

type GameState = 'start' | 'playing' | 'end';

export function BudgetBustersGame() {
  const { user, refreshUserData } = useAuth();
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameConfig.timer);
  const [expenses, setExpenses] = useState<SurpriseExpense[]>([]);
  const [currentExpenseIndex, setCurrentExpenseIndex] = useState(0);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('budgetBustersHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  const triggerQuestUpdate = async (isNewHighScore: boolean) => {
    if (!user || !refreshUserData) return;
    
    const updates = [updateQuestProgress({ userId: user.uid, actionType: 'play_minigame_round' })];
    if (isNewHighScore) {
      updates.push(updateQuestProgress({ userId: user.uid, actionType: 'beat_high_score' }));
    }
    
    await Promise.all(updates);
    await refreshUserData();
  };
  
  const handleGameEnd = useCallback(() => {
    setGameState('end');
    const isNewHighScore = score > highScore && score > 0;
    if (isNewHighScore) {
        setHighScore(score);
        localStorage.setItem('budgetBustersHighScore', score.toString());
    }
    triggerQuestUpdate(isNewHighScore);
  }, [score, highScore, user, refreshUserData]);

  const handleGameEndRef = useRef(handleGameEnd);
  useEffect(() => {
    handleGameEndRef.current = handleGameEnd;
  }, [handleGameEnd]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          handleGameEndRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [gameState]);


  const startGame = () => {
    setExpenses(shuffle(gameConfig.surpriseExpenses));
    setCurrentExpenseIndex(0);
    setScore(0);
    setTimeLeft(gameConfig.timer);
    setGameState('playing');
  }
  
  const handleNextExpense = (points: number) => {
    setScore(prev => prev + points);
    setCurrentExpenseIndex(prev => prev + 1);
  }

  const handleRestart = () => {
    startGame();
  };

  const currentExpense = expenses[currentExpenseIndex] ?? gameConfig.surpriseExpenses[0];

  if (gameState === 'start') {
    return (
      <Card className="bg-card/50 backdrop-blur-lg border-border/20 text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
            <PieChart className="w-8 h-8 text-primary" /> Budget Busters
          </CardTitle>
          <CardDescription className="text-lg">Handle endless surprise expenses before time runs out!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-left p-4 bg-background/50 rounded-lg">
             <div className="flex items-start gap-3"><Hand className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">How to Play:</b> A surprise expense will pop up! Drag money from your 'Wants', 'Savings', and 'Needs' tanks to cover the cost.</p></div>
             <div className="flex items-start gap-3"><Target className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">Goal:</b> Prioritize! Pulling from 'Wants' gives you the most points. Pulling from 'Needs' will cost you points!</p></div>
             <div className="flex items-start gap-3"><Star className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">High Score:</b> {highScore} points</p></div>
          </div>
          <Button size="lg" className="w-full text-xl font-bold shadow-glow" onClick={startGame}>Start Game</Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'end') {
    const isNewHighScore = score > highScore && score > 0;
    return (
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 text-center p-8">
            <CardHeader className="p-0 mb-4">
                <div className="flex justify-center mb-4">
                    <Mascot isHappy={score > 0} isSad={score <= 0} />
                </div>
                <CardTitle className="text-3xl font-bold">Time's Up!</CardTitle>
                <CardDescription className="text-lg">You survived {currentExpenseIndex} budget busters!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-0">
                {isNewHighScore && (
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-2xl font-bold text-yellow-400 p-3 bg-yellow-400/10 rounded-lg">
                    🎉 New High Score! 🎉
                    </motion.div>
                )}
                <div className="text-6xl font-black text-primary">{score}</div>
                 <div className="flex justify-center gap-4">
                    <Button size="lg" className="text-lg shadow-glow" onClick={handleRestart}>
                        Play Again
                    </Button>
                 </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <LevelDisplay
      key={currentExpenseIndex}
      initialBudget={gameConfig.tanks}
      expense={currentExpense}
      onExpenseCleared={handleNextExpense}
      timeLeft={timeLeft}
      currentScore={score}
    />
  );
}
