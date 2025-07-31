
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Hand, Target, Star, AlertTriangle, ShieldCheck, History, Meh } from 'lucide-react';
import { gameConfig, Expense } from '@/data/minigame-budget-busters-data';
import { LevelDisplay } from '@/components/minigames/level-display';
import { Mascot } from '@/components/lesson/mascot';
import { useAuth } from '@/hooks/use-auth';
import { updateQuestProgress } from '@/ai/flows/update-quest-progress-flow';
import { saveGameSummary } from '@/ai/flows/save-game-summary-flow';
import { shuffle } from 'lodash';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { GameSummary } from '@/types/user';


type GameState = 'start' | 'playing';

export function BudgetBustersGame({ userId }: { userId: string }) {
  const { userData, refreshUserData } = useAuth();
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
  
  const [lastSummary, setLastSummary] = useState<GameSummary | null>(null);
  const [viewingLastSummary, setViewingLastSummary] = useState(false);

  const allExpenses = useRef(shuffle(gameConfig.expenses));
  const expenseIndex = useRef(0);

  useEffect(() => {
    // Set high score from user data if it exists
    const savedHighScore = userData?.gameSummaries?.['budget-busters']?.highScore;
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore.toString(), 10));
    }
    // Set last summary from user data
    if (userData?.gameSummaries?.['budget-busters']) {
      setLastSummary(userData.gameSummaries['budget-busters']);
    }
  }, [userData]);
  
  const handleGameEnd = useCallback(async (currentScore: number, finalBudget: number, finalNeeds: number, finalWants: number, finalConsequences: string[]) => {
    let finalScore = currentScore;
    const spentNothingOnWants = finalWants === 0;

    if (spentNothingOnWants) {
        finalScore -= 100; // Penalty for no wants
    }

    const newHighScore = finalScore > highScore;
    if (newHighScore) {
        setIsNewHighScore(true);
        setHighScore(finalScore);
    } else {
        setIsNewHighScore(false);
    }
    
    const summaryData: GameSummary = {
        score: finalScore,
        highScore: newHighScore ? finalScore : highScore,
        budget: finalBudget,
        spentOnNeeds: finalNeeds,
        spentOnWants: finalWants,
        incurredConsequences: finalConsequences,
        isNewHighScore: newHighScore,
        spentNothingOnWants,
    };

    if(userId) {
       await saveGameSummary({ userId, gameId: 'budget-busters', summaryData });
    }
    
    setLastSummary(summaryData); // Update state for immediate viewing
    
    if (userId && refreshUserData) {
      const updates = [updateQuestProgress({ userId: userId, actionType: 'play_minigame_round' })];
      if (newHighScore) {
        updates.push(updateQuestProgress({ userId: userId, actionType: 'beat_high_score' }));
      }
      await Promise.all(updates);
      await refreshUserData();
    }
    // Instead of setting gameState to 'end', we now reset to 'start'
    setGameState('start');
    setViewingLastSummary(true); // Automatically show the summary

  }, [highScore, userId, refreshUserData]);

  const getNextExpense = () => {
    if (expenseIndex.current >= allExpenses.current.length) {
        expenseIndex.current = 0; // Loop if we run out
        allExpenses.current = shuffle(gameConfig.expenses);
    }
    const nextExpense = allExpenses.current[expenseIndex.current];
    expenseIndex.current += 1;
    return nextExpense;
  }
  
  const advanceToNextRound = useCallback((currentScore: number, currentBudget: number, currentNeeds: number, currentWants: number, currentConsequences: string[]) => {
      if (round + 1 >= gameConfig.rounds) {
          handleGameEnd(currentScore, currentBudget, currentNeeds, currentWants, currentConsequences);
      } else {
          setRound(prev => prev + 1);
          setActiveExpense(getNextExpense());
      }
  }, [round, handleGameEnd]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setBudget(gameConfig.initialBudget);
    setSpentOnNeeds(0);
    setSpentOnWants(0);
    setIncurredConsequences([]);
    setRound(0);
    expenseIndex.current = 0;
    allExpenses.current = shuffle(gameConfig.expenses);
    setActiveExpense(getNextExpense());
    setIsNewHighScore(false);
    setViewingLastSummary(false);
  }

  const handleDecision = (action: 'pay' | 'dismiss') => {
    if (!activeExpense) return;
    
    let newScore = score;
    let newBudget = budget;
    let newSpentOnNeeds = spentOnNeeds;
    let newSpentOnWants = spentOnWants;
    let newConsequences = [...incurredConsequences];

    if (action === 'pay') {
        if (budget < activeExpense.cost) {
            // This case should ideally be prevented by disabling the pay button
            // but as a fallback, we treat it as a dismissal of a need.
            if (activeExpense.type === 'Need' && activeExpense.consequence) {
              newConsequences.push(activeExpense.consequence);
            }
            newScore -= 200;
        } else {
            newBudget -= activeExpense.cost;

            if (activeExpense.type === 'Need') {
                newSpentOnNeeds += activeExpense.cost;
                newScore += 50; // Reward for handling needs
            } else {
                newSpentOnWants += activeExpense.cost;
                newScore += 25; // Smaller reward for wants
            }
        }
    } else { // Dismissed
        if (activeExpense.type === 'Need') {
             newScore -= 200; // Big penalty for dismissing a need
             if (activeExpense.consequence) {
               newConsequences.push(activeExpense.consequence);
             }
        } else { // Dismissed a want
            newScore += 75; // Reward for smart saving
        }
    }

    setScore(newScore);
    setBudget(newBudget);
    setSpentOnNeeds(newSpentOnNeeds);
    setSpentOnWants(newSpentOnWants);
    setIncurredConsequences(newConsequences);
    advanceToNextRound(newScore, newBudget, newSpentOnNeeds, newSpentOnWants, newConsequences);
  };
  
  const renderSummaryCard = (summary: GameSummary) => {
    const totalSpent = summary.spentOnNeeds + summary.spentOnWants;
    const needsPercentage = gameConfig.initialBudget > 0 ? Math.round((summary.spentOnNeeds / gameConfig.initialBudget) * 100) : 0;
    const wantsPercentage = gameConfig.initialBudget > 0 ? Math.round((summary.spentOnWants / gameConfig.initialBudget) * 100) : 0;
    const savedAmount = summary.budget;
    const savedPercentage = gameConfig.initialBudget > 0 ? Math.round((savedAmount / gameConfig.initialBudget) * 100) : 0;
    const didSaveEnough = savedPercentage >= 20;

    return (
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 text-center p-8">
            <CardHeader className="p-0 mb-4">
                <div className="flex justify-center mb-4">
                    <Mascot isHappy={summary.incurredConsequences.length === 0 && !summary.spentNothingOnWants} isSad={summary.incurredConsequences.length > 0 || summary.spentNothingOnWants} />
                </div>
                <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                    Financial Report
                </CardTitle>
                <CardDescription className="text-lg">Here's your performance breakdown.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-0">
                <div className="text-6xl font-black text-primary">{summary.score}</div>
                {summary.isNewHighScore && <p className="font-bold text-yellow-400">🎉 New High Score! 🎉</p>}

                 <div className="space-y-2 text-left p-4 bg-background/50 rounded-lg">
                    <h3 className="font-bold text-center text-lg mb-2">Your 50/30/20 Breakdown</h3>
                    <p className="flex justify-between"><span><b>Needs:</b></span> <span>${summary.spentOnNeeds.toFixed(2)} <span className="text-muted-foreground">({needsPercentage}%)</span></span></p>
                    <p className="flex justify-between"><span><b>Wants:</b></span> <span>${summary.spentOnWants.toFixed(2)} <span className="text-muted-foreground">({wantsPercentage}%)</span></span></p>
                    <p className="flex justify-between">
                        <span><b>Savings:</b></span> 
                        <span className={cn(didSaveEnough ? "text-green-400" : "text-destructive")}>${savedAmount.toFixed(2)} <span className="text-muted-foreground">({savedPercentage}%)</span></span>
                    </p>
                    <p className={cn("text-center font-bold pt-2", didSaveEnough ? "text-green-400" : "text-destructive")}>
                        {didSaveEnough ? '✅ Great job hitting your 20% savings goal!' : '❌ You missed the 20% savings goal.'}
                    </p>
                 </div>

                {summary.spentNothingOnWants && (
                    <div className="space-y-2 text-left p-4 bg-yellow-500/20 rounded-lg">
                        <h3 className="font-bold text-center text-lg mb-2 text-yellow-400 flex items-center justify-center gap-2"><Meh /> A Life Un-Lived</h3>
                        <p className="text-center text-yellow-400/80">
                           You saved a lot, but spent nothing on wants! A good budget includes room for fun. You lost <b>100 points</b> for not living a little.
                        </p>
                    </div>
                )}


                {summary.incurredConsequences.length > 0 && (
                    <div className="space-y-2 text-left p-4 bg-destructive/20 rounded-lg">
                        <h3 className="font-bold text-center text-lg mb-2 text-destructive-foreground">Consequences</h3>
                        <ul className="list-disc list-inside text-destructive-foreground">
                            {summary.incurredConsequences.map((con, i) => <li key={i}>{con}</li>)}
                        </ul>
                    </div>
                )}

                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" className="text-lg shadow-glow" onClick={startGame}>
                        Play Again
                    </Button>
                     <Button size="lg" variant="outline" className="text-lg" onClick={() => {
                         if (viewingLastSummary) {
                             setViewingLastSummary(false);
                         } else {
                            router.push('/minigames');
                         }
                     }}>
                        Close Report
                    </Button>
                 </div>
            </CardContent>
        </Card>
    );
  }

  if (viewingLastSummary && lastSummary) {
      return renderSummaryCard(lastSummary);
  }

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
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="w-full text-xl font-bold shadow-glow" onClick={startGame}>Start Game</Button>
            {lastSummary && (
                <Button size="lg" variant="secondary" className="w-full text-xl font-bold" onClick={() => setViewingLastSummary(true)}>
                    <History className="mr-2" /> View Last Summary
                </Button>
            )}
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

    