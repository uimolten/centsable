
"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Level } from '@/data/minigame-budget-busters-data';
import { BudgetTank } from './budget-tank';
import { cn } from '@/lib/utils';
import { AlertCircle, ArrowDown } from 'lucide-react';

interface LevelDisplayProps {
  level: Level;
  onLevelComplete: (score: number, success: boolean) => void;
  highScore: number;
}

const TRANSFER_AMOUNT = 25; // How much money moves per tap

export function LevelDisplay({ level, onLevelComplete, highScore }: LevelDisplayProps) {
  const [budget, setBudget] = useState(level.initialBudget);
  const [expense, setExpense] = useState(level.expense);
  const [timeLeft, setTimeLeft] = useState(level.time);
  const [score, setScore] = useState(0);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [showExpense, setShowExpense] = useState(false);
  
  const handleTapSource = (tankId: string) => {
    setSelectedSource(tankId);
  };

  const handleTapTarget = () => {
    if (!selectedSource) return;

    const sourceTank = budget.find(t => t.id === selectedSource);
    if (!sourceTank || sourceTank.amount < TRANSFER_AMOUNT) return;

    const amountToTransfer = Math.min(sourceTank.amount, TRANSFER_AMOUNT);
    
    // Update budget
    setBudget(prev => prev.map(t => 
      t.id === selectedSource ? { ...t, amount: t.amount - amountToTransfer } : t
    ));

    // Update expense
    setExpense(prev => ({ ...prev, amount: prev.amount - amountToTransfer }));

    // Update score
    const multiplier = sourceTank.category === 'Wants' ? 1.5 : 1;
    setScore(prev => prev + (amountToTransfer * multiplier));

    setSelectedSource(null);
  };
  
  useEffect(() => {
    const expenseTimer = setTimeout(() => setShowExpense(true), 2000);
    return () => clearTimeout(expenseTimer);
  }, []);

  useEffect(() => {
    if (!showExpense) return;

    if (expense.amount <= 0) {
      // Success
      const timeBonus = timeLeft * 10;
      onLevelComplete(score + timeBonus, true);
      return;
    }

    if (timeLeft <= 0) {
      // Failure
      onLevelComplete(score, false);
      return;
    }

    const gameTimer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(gameTimer);
  }, [showExpense, timeLeft, score, expense.amount, onLevelComplete]);

  const wantsTanks = budget.filter(t => t.category === 'Wants');
  const needsTanks = budget.filter(t => t.category === 'Needs');
  const savingsTanks = budget.filter(t => t.category === 'Savings');
  const expenseTank = { id: 'expense', label: expense.name, amount: level.expense.amount - expense.amount, capacity: level.expense.amount };

  return (
    <div className="w-full mx-auto p-4 bg-card/30 rounded-2xl relative overflow-hidden">
        {/* Game UI */}
        <div className="flex justify-between items-center mb-4 p-3 bg-card/50 rounded-lg">
            <div className="text-xl font-bold">Level: <span className="text-primary">{level.level}</span></div>
            <div className="text-xl font-bold">Score: <span className="text-primary">{score}</span></div>
            <div className="text-xl font-bold">Time: <span className={cn(timeLeft <= 10 && "text-destructive animate-pulse")}>{timeLeft}s</span></div>
        </div>

        {/* Tanks Area */}
        <div className="space-y-6">
            <div>
                <h3 className="text-center font-bold text-muted-foreground mb-2">NEEDS (Locked)</h3>
                <div className="grid grid-cols-3 gap-4">
                    {needsTanks.map(tank => <BudgetTank key={tank.id} {...tank} isLocked />)}
                </div>
            </div>
            <div>
                <h3 className="text-center font-bold text-muted-foreground mb-2">WANTS (Tap to use)</h3>
                <div className="grid grid-cols-3 gap-4">
                    {wantsTanks.map(tank => <BudgetTank key={tank.id} {...tank} onTap={() => handleTapSource(tank.id)} isSelected={selectedSource === tank.id} />)}
                </div>
            </div>
             <div>
                <h3 className="text-center font-bold text-muted-foreground mb-2">SAVINGS (Tap to use)</h3>
                <div className="grid grid-cols-3 gap-4">
                    {savingsTanks.map(tank => <BudgetTank key={tank.id} {...tank} onTap={() => handleTapSource(tank.id)} isSelected={selectedSource === tank.id} />)}
                </div>
            </div>
        </div>

        {/* Expense Overlay */}
        <AnimatePresence>
        {showExpense && (
            <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="absolute inset-x-0 bottom-0 p-6 bg-destructive/30 backdrop-blur-md border-t-4 border-destructive"
            >
                <div className="flex items-center justify-around gap-6">
                   <div className="text-center text-destructive-foreground">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.2, type: 'spring' }}}>
                            <AlertCircle className="w-16 h-16 text-destructive mx-auto animate-pulse" />
                        </motion.div>
                        <h2 className="text-3xl font-bold mt-2">BUDGET BUSTER!</h2>
                        <p className="text-xl">{expense.name}</p>
                   </div>
                   {selectedSource && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center animate-bounce"
                        >
                            <ArrowDown className="w-12 h-12 text-primary" />
                            <p className="font-bold text-primary">Tap Below to Pay!</p>
                        </motion.div>
                   )}
                   <BudgetTank
                        label="Amount to Pay"
                        amount={expenseTank.amount}
                        capacity={expenseTank.capacity}
                        color="hsl(var(--destructive))"
                        className="w-48"
                        onTap={handleTapTarget}
                   />
                </div>
            </motion.div>
        )}
        </AnimatePresence>
    </div>
  );
}
