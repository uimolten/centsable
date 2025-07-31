
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
  const [budget, setBudget] = useState(gameConfig.initialBudget);
  const [spentOnNeeds, setSpentOnNeeds] = useState(0);
  const [spentOnWants, setSpentOnWants] = useState(0);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const [round, setRound] = useState(0);
  const [endGameMessage, setEndGameMessage] = useState({ title: "Round Over!", description: "Let's see how you did." });

  const allExpenses = useRef(shuffle(gameConfig.expenses));
  const expenseIndex = useRef(0);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('budgetBustersHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);
  
  const handleGameEnd = useCallback((title: string, description: string) => {
    setGameState('end');
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

  const getNextExpense = () => {
    if (expenseIndex.current >= allExpenses.current.length) {
        expenseIndex.current = 0; // Loop if we run out
        allExpenses.current = shuffle(gameConfig.expenses);
    }
    const nextExpense = allExpenses.current[expenseIndex.current];
    expenseIndex.current += 1;
    return nextExpense;
  }
  
  const advanceToNextRound = () => {
      if (round + 1 >= gameConfig.rounds) {
          handleGameEnd("Game Over!", "You survived! Let's see how your budget held up.");
      } else {
          setRound(prev => prev + 1);
          setCurrentExpense(getNextExpense());
      }
  }

  const startGame = () => {
    setBudget(gameConfig.initialBudget);
    setScore(0);
    setSpentOnNeeds(0);
    setSpentOnWants(0);
    setRound(0);
    expenseIndex.current = 0;
    allExpenses.current = shuffle(gameConfig.expenses);
    setCurrentExpense(getNextExpense());
    setGameState('playing');
  }

  const handleDecision = (action: 'pay' | 'dismiss') => {
    if (!currentExpense) return;

    if (action === 'pay') {
        if (budget < currentExpense.cost) {
            handleGameEnd("Game Over!", `You couldn't afford a critical expense: ${currentExpense.description}`);
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
    } else { // Dismissed
        if (currentExpense.type === 'Need') {
             setScore(prev => prev - 200); // Big penalty for dismissing a need
             // Optionally show consequence message here before advancing
        } else { // Dismissed a want
            setScore(prev => prev + 75); // Reward for smart saving
        }
    }

    advanceToNextRound();
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
             <div className="flex items-start gap-3"><Hand className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">How to Play:</b> You have ${gameConfig.initialBudget} for {gameConfig.rounds} financial events. Decide to 'Pay' for or 'Dismiss' each one.</p></div>
             <div className="flex items-start gap-3"><AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">Goal:</b> End with the highest score! Try to follow the <b>50/30/20 rule</b> (50% Needs, 30% Wants, 20% Savings). Dismissing wants is smart, but dismissing needs has serious consequences!</p></div>
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
    const savedAmount = gameConfig.initialBudget - totalSpent;
    const savedPercentage = Math.round((savedAmount / gameConfig.initialBudget) * 100);
    const savedSuccessfully = savedPercentage >= 20;

    return (
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 text-center p-8">
            <CardHeader className="p-0 mb-4">
                <div className="flex justify-center mb-4">
                    <Mascot isHappy={!endGameMessage.title.includes("Game Over!")} />
                </div>
                <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                    {endGameMessage.title.includes("Game Over!") && <AlertTriangle className="w-8 h-8 text-destructive"/>}
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

                 <div className="space-y-2 text-left p-4 bg-background/50 rounded-lg">
                    <h3 className="font-bold text-center text-lg mb-2">Your 50/30/20 Breakdown</h3>
                    <p><b>Needs:</b> {needsPercentage}%</p>
                    <p><b>Wants:</b> {wantsPercentage}%</p>
                    <p><b>Saved:</b> {savedPercentage}% ({savedSuccessfully ? 'Great job! ✅' : 'Try to save more! ❌'})</p>
                 </div>

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
        round={round + 1}
        totalRounds={gameConfig.rounds}
        currentScore={score}
      />
    );
  }

  return null;
}
