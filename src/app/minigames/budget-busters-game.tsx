
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Hand, Target, Star, AlertTriangle, ShieldCheck, ArrowLeft } from 'lucide-react';
import { gameConfig, Expense } from '@/data/minigame-budget-busters-data';
import { LevelDisplay } from '@/components/minigames/level-display';
import { Mascot } from '@/components/lesson/mascot';
import { useAuth } from '@/hooks/use-auth';
import { updateQuestProgress } from '@/ai/flows/update-quest-progress-flow';
import { shuffle } from 'lodash';
import { useRouter } from 'next/navigation';

type GameState = 'start' | 'playing' | 'end';

export function BudgetBustersGame({ userId }: { userId: string }) {
  const { refreshUserData } = useAuth();
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [budget, setBudget] = useState(gameConfig.initialBudget);
  const [spentOnNeeds, setSpentOnNeeds] = useState(0);
  const [spentOnWants, setSpentOnWants] = useState(0);
  const [activeExpense, setActiveExpense] = useState<Expense | null>(null);
  const [round, setRound] = useState(0);
  const [incurredConsequences, setIncurredConsequences] = useState<string[]>([]);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  const allExpenses = useRef(shuffle(gameConfig.expenses));
  const expenseIndex = useRef(0);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('budgetBustersHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);
  
  const handleGameEnd = useCallback(async () => {
    const newHighScore = score > highScore;
    if (newHighScore) {
        setIsNewHighScore(true);
        setHighScore(score);
        localStorage.setItem('budgetBustersHighScore', score.toString());
    } else {
        setIsNewHighScore(false);
    }
    
    if (userId && refreshUserData) {
      const updates = [updateQuestProgress({ userId: userId, actionType: 'play_minigame_round' })];
      if (newHighScore) {
        updates.push(updateQuestProgress({ userId: userId, actionType: 'beat_high_score' }));
      }
      await Promise.all(updates);
      await refreshUserData();
    }
    
    setGameState('end');
  }, [highScore, score, userId, refreshUserData]);

  const getNextExpense = () => {
    if (expenseIndex.current >= allExpenses.current.length) {
        expenseIndex.current = 0; // Loop if we run out
        allExpenses.current = shuffle(gameConfig.expenses);
    }
    const nextExpense = allExpenses.current[expenseIndex.current];
    expenseIndex.current += 1;
    return nextExpense;
  }
  
  const advanceToNextRound = useCallback(() => {
      if (round + 1 >= gameConfig.rounds) {
          handleGameEnd();
      } else {
          setRound(prev => prev + 1);
          setActiveExpense(getNextExpense());
      }
  }, [round, handleGameEnd]);

  const startGame = () => {
    setBudget(gameConfig.initialBudget);
    setScore(0);
    setSpentOnNeeds(0);
    setSpentOnWants(0);
    setIncurredConsequences([]);
    setRound(0);
    expenseIndex.current = 0;
    allExpenses.current = shuffle(gameConfig.expenses);
    setActiveExpense(getNextExpense());
    setGameState('playing');
  }

  const handleDecision = (action: 'pay' | 'dismiss') => {
    if (!activeExpense) return;

    if (action === 'pay') {
        if (budget < activeExpense.cost) {
            // This case should ideally be prevented by disabling the pay button
            // but as a fallback, we treat it as a dismissal of a need.
            if (activeExpense.type === 'Need' && activeExpense.consequence) {
              setIncurredConsequences(prev => [...prev, activeExpense.consequence!]);
            }
            setScore(prev => prev - 200);
        } else {
            const newBudget = budget - activeExpense.cost;
            setBudget(newBudget);

            if (activeExpense.type === 'Need') {
                setSpentOnNeeds(prev => prev + activeExpense.cost);
                setScore(prev => prev + 50); // Reward for handling needs
            } else {
                setSpentOnWants(prev => prev + activeExpense.cost);
                setScore(prev => prev + 25); // Smaller reward for wants
            }
        }
    } else { // Dismissed
        if (activeExpense.type === 'Need') {
             setScore(prev => prev - 200); // Big penalty for dismissing a need
             if (activeExpense.consequence) {
               setIncurredConsequences(prev => [...prev, activeExpense.consequence]);
             }
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
             <div className="flex items-start gap-3"><AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">Goal:</b> Score points by making smart choices. Dismissing 'Wants' is good, but dismissing 'Needs' has severe consequences! Try to follow the <b>50/30/20 rule</b> (50% Needs, 30% Wants, 20% Savings).</p></div>
             <div className="flex items-start gap-3"><Star className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">High Score:</b> {highScore} points</p></div>
          </div>
          <Button size="lg" className="w-full text-xl font-bold shadow-glow" onClick={startGame}>Start Game</Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'end') {
    const totalSpent = spentOnNeeds + spentOnWants;
    const needsPercentage = totalSpent > 0 ? Math.round((spentOnNeeds / gameConfig.initialBudget) * 100) : 0;
    const wantsPercentage = totalSpent > 0 ? Math.round((spentOnWants / gameConfig.initialBudget) * 100) : 0;
    const savedAmount = budget;
    const savedPercentage = Math.round((savedAmount / gameConfig.initialBudget) * 100);
    const didSaveEnough = savedPercentage >= 20;

    return (
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 text-center p-8">
            <CardHeader className="p-0 mb-4">
                <div className="flex justify-center mb-4">
                    <Mascot isHappy={incurredConsequences.length === 0} isSad={incurredConsequences.length > 0} />
                </div>
                <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                    Round Over!
                </CardTitle>
                <CardDescription className="text-lg">Here's your financial report card.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-0">
                <div className="text-6xl font-black text-primary">{score}</div>
                {isNewHighScore && <p className="font-bold text-yellow-400">🎉 New High Score! 🎉</p>}


                 <div className="space-y-2 text-left p-4 bg-background/50 rounded-lg">
                    <h3 className="font-bold text-center text-lg mb-2">Your 50/30/20 Breakdown</h3>
                    <p><b>Needs ({needsPercentage}%):</b> ${spentOnNeeds.toFixed(2)}</p>
                    <p><b>Wants ({wantsPercentage}%):</b> ${spentOnWants.toFixed(2)}</p>
                    <p><b>Saved ({savedPercentage}%):</b> ${savedAmount.toFixed(2)} {didSaveEnough ? '✅ Well done!' : '❌ Missed 20% savings goal'}</p>
                 </div>

                {incurredConsequences.length > 0 && (
                    <div className="space-y-2 text-left p-4 bg-destructive/20 rounded-lg">
                        <h3 className="font-bold text-center text-lg mb-2 text-destructive-foreground">Consequences</h3>
                        <ul className="list-disc list-inside text-destructive-foreground">
                            {incurredConsequences.map((con, i) => <li key={i}>{con}</li>)}
                        </ul>
                    </div>
                )}

                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" className="text-lg shadow-glow" onClick={startGame}>
                        Play Again
                    </Button>
                     <Button size="lg" variant="outline" className="text-lg" onClick={() => router.push('/minigames')}>
                        <ArrowLeft className="mr-2"/> Back to Arcade
                    </Button>
                 </div>
            </CardContent>
        </Card>
    );
  }

  if (gameState === 'playing' && activeExpense) {
    return (
      <LevelDisplay
        key={expenseIndex.current}
        budget={budget}
        expense={activeExpense}
        onDecision={handleDecision}
        round={round + 1}
        totalRounds={gameConfig.rounds}
        currentScore={score}
      />
    );
  }

  return null;
}
