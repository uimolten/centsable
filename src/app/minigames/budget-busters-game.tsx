
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Hand, Target, Star, AlertTriangle } from 'lucide-react';
import { gameConfig, SurpriseExpense, MandatoryExpense } from '@/data/minigame-budget-busters-data';
import { LevelDisplay } from '@/components/minigames/level-display';
import { Mascot } from '@/components/lesson/mascot';
import { useAuth } from '@/hooks/use-auth';
import { updateQuestProgress } from '@/ai/flows/update-quest-progress-flow';
import { shuffle } from 'lodash';

type GameState = 'start' | 'playing' | 'level-end';

export function BudgetBustersGame() {
  const { user, refreshUserData } = useAuth();
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameConfig.timer);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentBudget, setCurrentBudget] = useState(gameConfig.tanks);
  const [activeExpense, setActiveExpense] = useState<SurpriseExpense | MandatoryExpense | null>(null);
  const [endGameMessage, setEndGameMessage] = useState({ title: "Time's Up!", description: "You ran out of time!" });

  useEffect(() => {
    const savedHighScore = localStorage.getItem('budgetBustersHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);
  
  const handleGameEnd = useCallback((finalScore: number, title: string, description: string) => {
    setGameState('level-end');
    setEndGameMessage({ title, description });
    const isNewHighScore = finalScore > highScore && finalScore > 0;
    if (isNewHighScore) {
        setHighScore(finalScore);
        localStorage.setItem('budgetBustersHighScore', finalScore.toString());
    }
    if (user && refreshUserData) {
      const updates = [updateQuestProgress({ userId: user.uid, actionType: 'play_minigame_round' })];
      if (isNewHighScore) {
        updates.push(updateQuestProgress({ userId: user.uid, actionType: 'beat_high_score' }));
      }
      Promise.all(updates).then(() => refreshUserData());
    }
  }, [highScore, user, refreshUserData]);

  const timerCallbackRef = useRef(handleGameEnd);
  useEffect(() => {
    timerCallbackRef.current = (finalScore: number) => handleGameEnd(finalScore, "Time's Up!", "You ran out of time!");
  }, [handleGameEnd]);
  
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          timerCallbackRef.current(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [gameState, score]);

  const selectNextExpense = (round: number) => {
    if ((round + 1) % gameConfig.mandatoryExpenseInterval === 0) {
      return shuffle(gameConfig.mandatoryExpenses)[0];
    }
    return shuffle(gameConfig.surpriseExpenses)[0];
  };

  const startGame = () => {
    setCurrentBudget(gameConfig.tanks.map(t => ({...t})));
    setScore(0);
    setCurrentRound(0);
    setActiveExpense(selectNextExpense(0));
    setTimeLeft(gameConfig.timer);
    setGameState('playing');
  }

  const handleExpenseCleared = (points: number, newBudget: typeof currentBudget) => {
    setScore(prev => prev + points);
    setCurrentBudget(newBudget);
    
    const nextRound = currentRound + 1;
    setCurrentRound(nextRound);
    setActiveExpense(selectNextExpense(nextRound));
  };
  
  const handleCantAfford = (finalScore: number) => {
    handleGameEnd(finalScore, "Can't Afford Needs!", "You overspent on wants and couldn't pay for an essential expense.");
  };
  
  if (gameState === 'start') {
    return (
      <Card className="bg-card/50 backdrop-blur-lg border-border/20 text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
            <PieChart className="w-8 h-8 text-primary" /> Budget Busters
          </CardTitle>
          <CardDescription className="text-lg">Handle surprise expenses and pay your mandatory bills before time runs out!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-left p-4 bg-background/50 rounded-lg">
             <div className="flex items-start gap-3"><Hand className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">How to Play:</b> Use your money tanks to cover surprise costs. Every few rounds, a mandatory expense like rent will appear—make sure you have enough to pay it!</p></div>
             <div className="flex items-start gap-3"><Target className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">Goal:</b> Survive as long as possible! Pulling from 'Wants' gives the most points. Pulling from 'Needs' costs points. If you can't afford a mandatory bill, it's game over!</p></div>
             <div className="flex items-start gap-3"><Star className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">High Score:</b> {highScore} points</p></div>
          </div>
          <Button size="lg" className="w-full text-xl font-bold shadow-glow" onClick={startGame}>Start Game</Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'level-end') {
    const isNewHighScore = score > highScore && score > 0;
    return (
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 text-center p-8">
            <CardHeader className="p-0 mb-4">
                <div className="flex justify-center mb-4">
                    <Mascot isHappy={score > 0} isSad={score <= 0} />
                </div>
                <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                    {endGameMessage.title === "Can't Afford Needs!" && <AlertTriangle className="w-8 h-8 text-destructive"/>}
                    {endGameMessage.title}
                </CardTitle>
                <CardDescription className="text-lg">{endGameMessage.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-0">
                {isNewHighScore && (
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-2xl font-bold text-yellow-400 p-3 bg-yellow-400/10 rounded-lg">
                    🎉 New High Score! 🎉
                    </motion.div>
                )}
                <div className="text-6xl font-black text-primary">{score}</div>
                 <div className="flex justify-center gap-4">
                    <Button size="lg" className="text-lg shadow-glow" onClick={startGame}>
                        Play Again
                    </Button>
                 </div>
            </CardContent>
        </Card>
    );
  }

  if (gameState === 'playing' && activeExpense) {
    return (
      <LevelDisplay
        key={currentRound}
        initialBudget={currentBudget}
        expense={activeExpense}
        onExpenseCleared={handleExpenseCleared}
        onCantAfford={handleCantAfford}
        timeLeft={timeLeft}
        currentScore={score}
      />
    );
  }

  return null;
}
