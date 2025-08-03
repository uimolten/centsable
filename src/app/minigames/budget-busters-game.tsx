
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Hand, Target, Star, AlertTriangle, ShieldCheck, History, Meh, Frown } from 'lucide-react';
import { gameConfig, GameEvent } from '@/data/minigame-budget-busters-data';
import { LevelDisplay } from '@/components/minigames/level-display';
import { Mascot } from '@/components/lesson/mascot';
import { useAuth } from '@/hooks/use-auth';
import { updateQuestProgress } from '@/ai/flows/update-quest-progress-flow';
import { saveGameSummary } from '@/ai/flows/save-game-summary-flow';
import { awardGameRewards } from '@/ai/flows/award-game-rewards-flow';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { GameSummary } from '@/types/user';


type GameState = 'start' | 'playing';
type NegativeFlag = 'missed_work';
type SummaryViewType = 'last' | 'high' | null;

// Fisher-Yates shuffle algorithm
const shuffle = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export function BudgetBustersGame({ userId }: { userId: string }) {
  const { userData, refreshUserData, triggerLevelUp, triggerRewardAnimation } = useAuth();
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [initialBudget, setInitialBudget] = useState(gameConfig.initialBudget);
  const [budget, setBudget] = useState(gameConfig.initialBudget);
  const [spentOnNeeds, setSpentOnNeeds] = useState(0);
  const [spentOnWants, setSpentOnWants] = useState(0);
  const [activeEvent, setActiveEvent] = useState<GameEvent | null>(null);
  const [round, setRound] = useState(0);
  const [incurredConsequences, setIncurredConsequences] = useState<string[]>([]);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  
  const [lastSummary, setLastSummary] = useState<GameSummary | null>(null);
  const [highScoreSummary, setHighScoreSummary] = useState<GameSummary | null>(null);
  const [viewingSummary, setViewingSummary] = useState<GameSummary | null>(null);
  const [summaryViewType, setSummaryViewType] = useState<SummaryViewType>(null);
  const [negativeFlags, setNegativeFlags] = useState<NegativeFlag[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const eventDeck = useRef<GameEvent[]>([]);
  const eventIndex = useRef(0);

  useEffect(() => {
    const gameData = userData?.gameSummaries?.['budget-busters'];
    if (gameData) {
        setHighScore(gameData.bestAttempt?.score ?? 0);
        setLastSummary(gameData.lastAttempt ?? null);
        setHighScoreSummary(gameData.bestAttempt ?? null);
    }
  }, [userData]);
  
  const handleGameEnd = useCallback(async (currentScore: number, finalBudget: number, finalNeeds: number, finalWants: number, finalConsequences: string[], startingBudget: number) => {
    let finalScore = currentScore;
    let scorePenalty = 0;
    
    const wantsPercentage = startingBudget > 0 ? (finalWants / startingBudget) * 100 : 0;
    const spentTooLittleOnWants = wantsPercentage < 10;
    
    if (spentTooLittleOnWants) {
        scorePenalty += 100;
    }
    
    const savedAmount = finalBudget;
    const savingsPercentage = startingBudget > 0 ? (savedAmount / startingBudget) * 100 : 0;
    const missedSavingsGoal = savingsPercentage < 20;
    
    if (missedSavingsGoal) {
        scorePenalty += 150;
    }

    if(finalConsequences.length > 0) {
        scorePenalty += finalConsequences.length * 75;
    }

    finalScore = finalScore - scorePenalty;

    const newHighScoreAchieved = finalScore > highScore;
    if (newHighScoreAchieved) {
        setIsNewHighScore(true);
        setHighScore(finalScore);
    } else {
        setIsNewHighScore(false);
    }
    
    const summaryData: GameSummary = {
        score: finalScore,
        highScore: newHighScoreAchieved ? finalScore : highScore,
        budget: finalBudget,
        spentOnNeeds: finalNeeds,
        spentOnWants: finalWants,
        incurredConsequences: finalConsequences,
        isNewHighScore: newHighScoreAchieved,
        spentTooLittleOnWants: spentTooLittleOnWants,
        missedSavingsGoal,
        scorePenalty,
        initialBudget: startingBudget,
    };

    setLastSummary(summaryData);
    if (!viewingSummary) {
        setViewingSummary(summaryData);
        setSummaryViewType('last');
    }
    
    if(userId) {
       await saveGameSummary({ userId, gameId: 'budget-busters', summaryData });
       const rewardResult = await awardGameRewards({ userId, gameId: 'budget-busters', score: finalScore });
       
       if (rewardResult.xpAwarded > 0 || rewardResult.centsAwarded > 0) {
           triggerRewardAnimation({ xp: rewardResult.xpAwarded, cents: rewardResult.centsAwarded });
       }
       
       const xpResult = await refreshUserData?.();

       if (xpResult?.leveledUp && xpResult.newLevel && xpResult.rewardCents) {
        triggerLevelUp({ newLevel: xpResult.newLevel, reward: xpResult.rewardCents });
       }
    }
    
    if (userId) {
      const updates = [updateQuestProgress({ userId: userId, actionType: 'play_minigame_round' })];
      if (newHighScoreAchieved) {
        updates.push(updateQuestProgress({ userId: userId, actionType: 'beat_high_score' }));
      }
      await Promise.all(updates);
    }

  }, [highScore, userId, refreshUserData, triggerLevelUp, triggerRewardAnimation, viewingSummary]);

  const getNextEvent = (currentFlags: NegativeFlag[]): GameEvent => {
    const eligibleEvents = eventDeck.current.slice(eventIndex.current).filter(event => {
        if (event.type === 'windfall' && event.prerequisites?.forbiddenFlags) {
            return !event.prerequisites.forbiddenFlags.some(flag => currentFlags.includes(flag));
        }
        return true;
    });

    if (eligibleEvents.length === 0) {
      // If no eligible events are left, we might need a fallback. For now, just take the next one.
      const nextEvent = eventDeck.current[eventIndex.current];
      eventIndex.current += 1;
      return nextEvent;
    }
    
    const nextEvent = eligibleEvents[0];
    // Find the original index in the deck to advance the pointer correctly
    const originalIndex = eventDeck.current.findIndex(e => e.description === nextEvent.description && e.type === nextEvent.type);
    eventIndex.current = originalIndex + 1;
    
    return nextEvent;
  }
  
  const advanceToNextRound = (currentScore: number, currentBudget: number, currentNeeds: number, currentWants: number, currentConsequences: string[], currentFlags: NegativeFlag[], startingBudget: number) => {
      if (round + 1 >= gameConfig.rounds) {
          // This is the final round, end the game.
          setActiveEvent(null); // Clear the current event to prevent multiple clicks
          handleGameEnd(currentScore, currentBudget, currentNeeds, currentWants, currentConsequences, startingBudget);
      } else {
          setRound(prev => prev + 1);
          setActiveEvent(getNextEvent(currentFlags));
          setIsProcessing(false);
      }
  };

  const createEventDeck = () => {
      const { events, guaranteedNeeds } = gameConfig;
      const guaranteedEvents = events.filter(e => guaranteedNeeds.includes(e.description));
      const randomEvents = events.filter(e => !guaranteedNeeds.includes(e.description));
      
      const shuffledRandomEvents = shuffle(randomEvents);

      const maxWindfalls = 3;
      let windfallCount = 0;
      const filteredShuffledEvents = shuffledRandomEvents.filter(e => {
        if (e.type === 'windfall') {
            if (windfallCount < maxWindfalls) {
                windfallCount++;
                return true;
            }
            return false;
        }
        return true;
      });

      // Take the remaining needed events to fill up to the round count
      const remainingSlots = gameConfig.rounds - guaranteedEvents.length;
      const finalDeck = [...guaranteedEvents, ...filteredShuffledEvents.slice(0, remainingSlots)];
      
      eventDeck.current = shuffle(finalDeck);
      eventIndex.current = 0;
  }


  const startGame = () => {
    const newInitialBudget = gameConfig.initialBudget;
    setInitialBudget(newInitialBudget);
    setGameState('playing');
    setScore(0);
    setBudget(newInitialBudget);
    setSpentOnNeeds(0);
    setSpentOnWants(0);
    setIncurredConsequences([]);
    setRound(0);
    createEventDeck();
    setActiveEvent(getNextEvent([]));
    setIsNewHighScore(false);
    setViewingSummary(null);
    setSummaryViewType(null);
    setNegativeFlags([]);
  }

  const handleDecision = (action: 'pay' | 'dismiss' | 'choose_a' | 'choose_b' | 'skip_choice' | 'collect_windfall') => {
    if (!activeEvent || isProcessing) return;

    setIsProcessing(true);
    
    let newScore = score;
    let newBudget = budget;
    let newSpentOnNeeds = spentOnNeeds;
    let newSpentOnWants = spentOnWants;
    let newConsequences = [...incurredConsequences];
    let newNegativeFlags = [...negativeFlags];

    switch(activeEvent.type) {
        case 'expense':
            if (action === 'pay') {
                if (budget >= activeEvent.cost) {
                    newBudget -= activeEvent.cost;
                    if (activeEvent.category === 'Need') {
                        newSpentOnNeeds += activeEvent.cost;
                        newScore += 50;
                    } else {
                        newSpentOnWants += activeEvent.cost;
                        newScore += 25;
                    }
                }
            } else { // Dismissed
                if (activeEvent.category === 'Need') {
                    newScore -= 200;
                    if (activeEvent.consequence) newConsequences.push(activeEvent.consequence);
                } else { // Dismissed a want
                    newScore += 75;
                }
            }
            break;
        case 'choice':
            if (action === 'choose_a' && budget >= activeEvent.optionA.cost) {
                newBudget -= activeEvent.optionA.cost;
                activeEvent.category === 'Need' ? newSpentOnNeeds += activeEvent.optionA.cost : newSpentOnWants += activeEvent.optionA.cost;
                newScore += 25;
            } else if (action === 'choose_b' && budget >= activeEvent.optionB.cost) {
                newBudget -= activeEvent.optionB.cost;
                activeEvent.category === 'Need' ? newSpentOnNeeds += activeEvent.optionB.cost : newSpentOnWants += activeEvent.optionB.cost;
                newScore += 25;
            } else if (action === 'skip_choice') {
                if (activeEvent.category === 'Need' && activeEvent.consequence) {
                    newScore -= 200;
                    newConsequences.push(activeEvent.consequence.text);
                    if (activeEvent.consequence.flag) {
                        newNegativeFlags.push(activeEvent.consequence.flag);
                    }
                } else { // Skipped a want
                    newScore += 75; 
                }
            }
            break;
        case 'windfall':
            if (action === 'collect_windfall') {
                newBudget += activeEvent.income;
                newScore += 50;
            }
            break;
    }

    setScore(newScore);
    setBudget(newBudget);
    setSpentOnNeeds(newSpentOnNeeds);
    setSpentOnWants(newSpentOnWants);
    setIncurredConsequences(newConsequences);
    setNegativeFlags(newNegativeFlags);
    advanceToNextRound(newScore, newBudget, newSpentOnNeeds, newSpentOnWants, newConsequences, newNegativeFlags, initialBudget);
  };
  
  const renderSummaryCard = (summary: GameSummary) => {
    const baseBudget = summary.initialBudget || gameConfig.initialBudget;
    const needsPercentage = baseBudget > 0 ? Math.round((summary.spentOnNeeds / baseBudget) * 100) : 0;
    const wantsPercentage = baseBudget > 0 ? Math.round((summary.spentOnWants / baseBudget) * 100) : 0;
    const savedAmount = summary.budget;
    const savedPercentage = baseBudget > 0 ? Math.round((savedAmount / baseBudget) * 100) : 0;

    return (
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 text-center p-8">
            <CardHeader className="p-0 mb-4">
                <div className="flex justify-center mb-4">
                    <Mascot isHappy={!summary.missedSavingsGoal && !summary.spentNothingOnWants && summary.incurredConsequences.length === 0} isSad={summary.missedSavingsGoal || summary.spentNothingOnWants || summary.incurredConsequences.length > 0} />
                </div>
                <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                    Financial Report
                </CardTitle>
                <CardDescription className="text-lg">Here's your performance breakdown.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-0">
                <div className="text-6xl font-black text-primary">{summary.score}</div>
                {summary.isNewHighScore && summaryViewType === 'last' && <p className="font-bold text-yellow-400">🎉 New High Score! 🎉</p>}
                {summary.scorePenalty > 0 && <p className="font-bold text-destructive">Total Penalties: -{summary.scorePenalty} points</p>}

                 <div className="space-y-2 text-left p-4 bg-background/50 rounded-lg">
                    <h3 className="font-bold text-center text-lg mb-2">Your 50/30/20 Breakdown</h3>
                    <p className="flex justify-between"><span><b>Needs:</b></span> <span>${summary.spentOnNeeds.toFixed(2)} <span className="text-muted-foreground">({needsPercentage}%)</span></span></p>
                    <p className="flex justify-between"><span><b>Wants:</b></span> <span>${summary.spentOnWants.toFixed(2)} <span className="text-muted-foreground">({wantsPercentage}%)</span></span></p>
                    <p className="flex justify-between">
                        <span><b>Savings:</b></span> 
                        <span className={cn(summary.missedSavingsGoal ? "text-destructive" : "text-green-400")}>${savedAmount.toFixed(2)} <span className="text-muted-foreground">({savedPercentage}%)</span></span>
                    </p>
                 </div>
                
                 {summary.missedSavingsGoal && (
                    <div className="space-y-2 text-left p-4 bg-red-500/20 rounded-lg">
                        <h3 className="font-bold text-center text-lg mb-2 text-destructive flex items-center justify-center gap-2"><Frown /> Missed Savings Goal (-150 Points)</h3>
                        <p className="text-center text-red-400/80">
                           You saved less than 20% of your income. This is a key part of a healthy budget. The goal is to balance today's needs with tomorrow's goals.
                        </p>
                    </div>
                 )}

                {summary.spentNothingOnWants && (
                    <div className="space-y-2 text-left p-4 bg-yellow-500/20 rounded-lg">
                        <h3 className="font-bold text-center text-lg mb-2 text-yellow-400 flex items-center justify-center gap-2"><Meh /> A Life Un-Lived (-100 Points)</h3>
                        <p className="text-center text-yellow-400/80">
                           You spent less than 10% of your budget on wants! A good budget includes room for fun and enjoyment. It's all about balance.
                        </p>
                    </div>
                )}


                {summary.incurredConsequences.length > 0 && (
                    <div className="space-y-2 text-left p-4 bg-destructive/20 rounded-lg">
                        <h3 className="font-bold text-center text-lg mb-2 text-destructive flex items-center justify-center gap-2"><AlertTriangle /> Consequences (-{summary.incurredConsequences.length * 75} Points)</h3>
                        <p className="text-center text-destructive/80 mb-2">Dismissing critical needs has real-world consequences and hurts your score:</p>
                        <ul className="list-disc list-inside text-destructive/90 text-center">
                            {summary.incurredConsequences.map((con, i) => <li key={i}>{con}</li>)}
                        </ul>
                    </div>
                )}

                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" className="text-lg shadow-glow" onClick={startGame}>
                        Play Again
                    </Button>
                     <Button size="lg" variant="outline" className="text-lg" onClick={() => { setGameState('start'); setViewingSummary(null); setSummaryViewType(null); }}>
                        Close Report
                    </Button>
                 </div>
            </CardContent>
        </Card>
    );
  }

  if (viewingSummary && !activeEvent) {
      return renderSummaryCard(viewingSummary);
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
             <div className="flex items-start gap-3"><Hand className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">How to Play:</b> You have ${gameConfig.initialBudget} for {gameConfig.rounds} financial events. Handle expenses, make choices, and get windfalls.</p></div>
             <div className="flex items-start gap-3"><AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><p><b className="text-foreground">Goal:</b> Score points by making smart choices. Dismissing 'Wants' is good, but dismissing 'Needs' has severe consequences! Try to follow the <b>50/30/20 rule</b> (50% Needs, 30% Wants, 20% Savings).</p></div>
             <div className="flex items-center gap-3"><Star className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <Button 
                    variant="link"
                    onClick={() => {if (highScoreSummary) { setViewingSummary(highScoreSummary); setSummaryViewType('high');}}}
                    disabled={!highScoreSummary}
                    className="p-0 h-auto text-lg text-foreground"
                >
                  <b className="text-foreground">High Score: {highScore}</b>
                </Button>
             </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="w-full text-xl font-bold shadow-glow" onClick={startGame}>Start Game</Button>
            {lastSummary && (
                <Button size="lg" variant="secondary" className="w-full text-xl font-bold" onClick={() => { setViewingSummary(lastSummary); setSummaryViewType('last'); }}>
                    <History className="mr-2" /> View Last Summary
                </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'playing' && activeEvent) {
    return (
      <LevelDisplay
        key={eventIndex.current}
        budget={budget}
        event={activeEvent}
        onDecision={handleDecision}
        round={round + 1}
        totalRounds={gameConfig.rounds}
        currentScore={score}
        isProcessing={isProcessing}
      />
    );
  }

  return (
    <div className="text-center p-8">
        <p className="text-lg font-semibold animate-pulse">Calculating your results...</p>
    </div>
  );
}
