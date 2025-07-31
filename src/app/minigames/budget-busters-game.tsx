
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Hand, Target, Star, AlertTriangle, ShieldCheck } from 'lucide-react';
import { gameConfig, Expense } from '@/data/minigame-budget-busters-data';
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
  const [budget, setBudget] = useState(gameConfig.initialBudget);
  const [spentOnNeeds, setSpentOnNeeds] = useState(0);
  const [spentOnWants, setSpentOnWants] = useState(0);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const [endGameMessage, setEndGameMessage] = useState({ title: "Time's Up!", description: "You survived! Let's see how you did." });

  const allExpenses = useRef(shuffle(gameConfig.expenses));
  const expenseIndex = useRef(0);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('budgetBustersHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);
  
  const handleGameEnd = useCallback((title: string, description: string) => {
    setGameState('level-end');
    setEndGameMessage({ title, description });
    const isNewHighScore = score > highScore && score > 0;
    if (isNewHighScore) {
        setHighScore(score);
        localStorage.setItem('budgetBustersHighScore', score.toString());
    }
    if (user && refreshUserData) {
      const updates = [updateQuestProgress({ userId: user.uid, actionType: 'play_minigame_round' })];
      if (isNewHighScore) {
        updates.push(updateQuestProgress({ userId: user.uid, actionType: 'beat_high_score' }));
      }
      Promise.all(updates).then(() => refreshUserData());
    }
  }, [highScore, score, user, refreshUserData]);

  useEffect(() => {
    if (timeLeft === 0 && gameState === 'playing') {
      handleGameEnd("Time's Up!", "You survived! Let's see how you did.");
    }
  }, [timeLeft, gameState, handleGameEnd]);
  
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [gameState]);

  const getNextExpense = () => {
    if (expenseIndex.current >= allExpenses.current.length) {
        expenseIndex.current = 0; // Loop if we run out
        allExpenses.current = shuffle(gameConfig.expenses);
    }
    const nextExpense = allExpenses.current[expenseIndex.current];
    expenseIndex.current += 1;
    return nextExpense;
  }

  const startGame = () => {
    setBudget(gameConfig.initialBudget);
    setScore(0);
    setTimeLeft(gameConfig.timer);
    setSpentOnNeeds(0);
    setSpentOnWants(0);
    expenseIndex.current = 0;
    allExpenses.current = shuffle(gameConfig.expenses);
    setCurrentExpense(getNextExpense());
    setGameState('playing');
  }

  const handleDecision = (action: 'pay' | 'dismiss') => {
    if (!currentExpense) return;

    if (action === 'pay') {
        if (budget < currentExpense.cost) {
            // This shouldn't happen for wants due to disabled button, so it must be a Need.
            handleGameEnd("Can't Afford Needs!", currentExpense.consequence ?? "You couldn't afford an essential expense.");
            return;
        }

        const newBudget = budget - currentExpense.cost;
        setBudget(newBudget);

        if (currentExpense.type === 'Need') {
            setSpentOnNeeds(prev => prev + currentExpense.cost);
            setScore(prev => prev + 50); // Reward for handling needs
        } else {
            setSpentOnWants(prev => prev + currentExpense.cost);
            setScore(prev => prev + 25); // Smaller reward for wants
        }
    } else { // Dismissed a want
        setScore(prev => prev + 10); // Reward for smart saving
    }

    // Move to next expense
    setCurrentExpense(getNextExpense());
  };
  
  if (gameState === 'start') {
    return (
      <Card className="bg-card/50 backdrop-blur-lg border-border/20 text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
            <PieChart className="w-8 h-8 text-primary" /> Budget Busters
          </CardTitle>
          <CardDescription className="text-lg">Make smart spending decisions to survive the month!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-left p-4 bg-background/50 rounded-lg">
             <div className="flex items-start gap-3"><Hand className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">How to Play:</b> Events will pop up. Pay for 'Needs' to survive. Choose wisely whether to 'Pay' for or 'Dismiss' 'Wants'.</p></div>
             <div className="flex items-start gap-3"><AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">Goal:</b> Keep your budget afloat! If you can't afford a 'Need', it's game over. Dismissing 'Wants' is a smart move!</p></div>
             <div className="flex items-start gap-3"><Star className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">High Score:</b> {highScore} points</p></div>
          </div>
          <Button size="lg" className="w-full text-xl font-bold shadow-glow" onClick={startGame}>Start Game</Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'end') {
    const isNewHighScore = score > highScore && score > 0;
    const totalSpent = spentOnNeeds + spentOnWants;
    const needsPercentage = totalSpent > 0 ? Math.round((spentOnNeeds / totalSpent) * 100) : 0;
    const wantsPercentage = totalSpent > 0 ? Math.round((spentOnWants / totalSpent) * 100) : 0;
    const savedPercentage = totalSpent > 0 ? 100 - needsPercentage - wantsPercentage : 100;

    return (
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 text-center p-8">
            <CardHeader className="p-0 mb-4">
                <div className="flex justify-center mb-4">
                    <Mascot isHappy={!endGameMessage.title.includes("Can't Afford")} />
                </div>
                <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                    {endGameMessage.title.includes("Can't Afford") && <AlertTriangle className="w-8 h-8 text-destructive"/>}
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

  if (gameState === 'playing' && currentExpense) {
    return (
      <LevelDisplay
        key={expenseIndex.current}
        budget={budget}
        expense={currentExpense}
        onDecision={handleDecision}
        timeLeft={timeLeft}
        currentScore={score}
      />
    );
  }

  return null;
}
