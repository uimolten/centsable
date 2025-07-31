
"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Lock, PiggyBank, Gamepad2, ShoppingCart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tank, SurpriseExpense } from '@/data/minigame-budget-busters-data';
import { cn } from '@/lib/utils';
import { playClickSound, playCorrectSound, playIncorrectSound } from '@/lib/audio-utils';

interface LevelDisplayProps {
  initialBudget: Tank[];
  expense: SurpriseExpense;
  onExpenseCleared: (points: number) => void;
  timeLeft: number;
  currentScore: number;
}

const TankDisplay = ({ tank, onTankClick, disabled }: { tank: Tank, onTankClick: (tank: Tank) => void, disabled: boolean }) => {
  const fillPercentage = (tank.amount / tank.capacity) * 100;
  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={cn(
            "relative w-24 h-48 rounded-t-lg border-4 border-b-0 overflow-hidden transition-all duration-300", 
            tank.locked ? 'border-muted-foreground/50' : tank.color.replace('bg-', 'border-'),
            !tank.locked && !disabled && 'cursor-pointer hover:scale-105 active:scale-95',
            disabled && !tank.locked && 'opacity-70 cursor-not-allowed'
        )}
        onClick={() => !tank.locked && !disabled && onTankClick(tank)}
       >
        <div className="absolute bottom-0 left-0 w-full bg-background/50" style={{ height: '100%' }}></div>
        <motion.div
          className={cn("absolute bottom-0 left-0 w-full", tank.color)}
          initial={{ height: '0%'}}
          animate={{ height: `${fillPercentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
            {tank.locked && <Lock className="w-8 h-8 text-white/50" />}
        </div>
      </div>
       <p className="font-bold text-center">{tank.label}</p>
       <p className="font-mono text-sm text-muted-foreground">${tank.amount.toFixed(2)}</p>
    </div>
  );
};

export function LevelDisplay({ initialBudget, expense, onExpenseCleared, timeLeft, currentScore }: LevelDisplayProps) {
  const [budget, setBudget] = useState(initialBudget);
  const [expensePaid, setExpensePaid] = useState(0);
  const [showExpense, setShowExpense] = useState(false);
  const [points, setPoints] = useState(0);

  // Memoize budget to prevent re-renders unless the initial one changes (which it won't in this new model)
  const startingBudget = useMemo(() => initialBudget, []);

  useEffect(() => {
    // This effect now only handles the appearance of the expense card
    const expenseTimeout = setTimeout(() => {
      setShowExpense(true);
      playIncorrectSound();
    }, 1500); // Appear faster

    return () => clearTimeout(expenseTimeout);
  }, [expense]);


  const getPointsForTank = (tank: Tank) => {
    if (tank.isNeeds) return -25;
    if (tank.isSavings) return 5;
    return 10; // Wants
  };

  const handleTankClick = (clickedTank: Tank) => {
    playClickSound();
    if (clickedTank.amount <= 0) return;

    const transferAmount = Math.min(clickedTank.amount, 50);
    const pointsGained = getPointsForTank(clickedTank);
    setPoints(prev => prev + pointsGained);
    
    setBudget(prevBudget =>
      prevBudget.map(tank =>
        tank.id === clickedTank.id ? { ...tank, amount: tank.amount - transferAmount } : tank
      )
    );

    const newExpensePaid = expensePaid + transferAmount;
    setExpensePaid(newExpensePaid);

    if (newExpensePaid >= expense.cost) {
      playCorrectSound();
      // Award time bonus
      const timeBonus = timeLeft > 10 ? 50 : 0;
      onExpenseCleared(points + pointsGained + timeBonus);
    }
  };

  const amountLeft = expense.cost - expensePaid;

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-4">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Score: <span className="text-primary">{currentScore}</span></h2>
        <div className={cn("text-3xl font-bold", timeLeft <= 10 && "text-destructive animate-pulse")}>
          {timeLeft}s
        </div>
      </div>

      <div className="relative w-full flex-grow flex items-center justify-center">
        <AnimatePresence>
          {showExpense && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-0 z-10 w-full max-w-lg"
            >
              <Card className="text-center bg-destructive/80 border-2 border-destructive-foreground text-destructive-foreground animate-shake">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <AlertCircle className="w-8 h-8"/> BUDGET BUSTER
                  </CardTitle>
                  <CardDescription className="text-destructive-foreground/80">{expense.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {budget.map(tank => (
                <TankDisplay 
                    key={tank.id} 
                    tank={tank} 
                    onTankClick={handleTankClick} 
                    disabled={!showExpense || expensePaid >= expense.cost}
                />
            ))}
        </div>
      </div>
      
      {showExpense && (
         <div className="mt-4 p-4 rounded-lg bg-card/50 w-full max-w-xl text-center">
            <p className="text-lg text-muted-foreground">Amount needed to cover expense:</p>
            <p className="text-4xl font-black text-primary">${Math.max(0, amountLeft).toFixed(2)}</p>
         </div>
      )}

    </div>
  );
}
