
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ShieldCheck, Wallet, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Expense } from '@/data/minigame-budget-busters-data';
import { cn } from '@/lib/utils';
import { playClickSound } from '@/lib/audio-utils';
import { Button } from '../ui/button';

interface LevelDisplayProps {
  budget: number;
  expense: Expense;
  onDecision: (action: 'pay' | 'dismiss') => void;
  round: number;
  totalRounds: number;
  currentScore: number;
}


export function LevelDisplay({ budget, expense, onDecision, round, totalRounds, currentScore }: LevelDisplayProps) {
  
  const handlePay = () => {
    playClickSound();
    onDecision('pay');
  }

  const handleDismiss = () => {
    playClickSound();
    onDecision('dismiss');
  }

  const canAfford = budget >= expense.cost;

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-4">
      <div className="w-full flex justify-between items-center mb-4 bg-card/50 p-3 rounded-lg">
        <div className="flex items-center gap-2 font-bold text-2xl">
            <Wallet className="text-primary"/>
            <span className="text-foreground">${budget.toFixed(2)}</span>
        </div>
        <div className="flex flex-col items-center">
             <h2 className="text-xl font-bold">Round</h2>
             <span className="text-primary text-xl font-bold">{round} / {totalRounds}</span>
        </div>
         <div className="flex flex-col items-center">
             <h2 className="text-xl font-bold">Score</h2>
             <span className="text-primary text-xl font-bold">{currentScore}</span>
        </div>
      </div>

      <div className="relative w-full flex-grow flex items-center justify-center">
        <AnimatePresence>
            <motion.div
              key={expense.description}
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-0 z-10 w-full max-w-lg space-y-4"
            >
              <Card className="text-center border-4 bg-card/80 border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2 font-black text-2xl text-primary">
                     A WILD EXPENSE APPEARS!
                  </CardTitle>
                  <CardDescription className="text-xl text-foreground/80 font-bold py-4">
                    {expense.description}
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                    size="lg" 
                    className="h-24 text-2xl font-black bg-primary hover:bg-primary/80 shadow-glow"
                    onClick={handlePay}
                    disabled={!canAfford}
                >
                    Pay ${expense.cost}
                </Button>
                <Button 
                    size="lg" 
                    variant="destructive" 
                    className="h-24 text-2xl font-black bg-red-600/80 hover:bg-red-600"
                    onClick={handleDismiss}
                >
                    <X className="w-8 h-8 mr-2"/>
                    Dismiss
                </Button>
              </div>
               {!canAfford && <p className="text-center text-destructive font-bold">You cannot afford this!</p>}
               {expense.type === "Need" && <p className="text-center text-yellow-400 font-bold">Dismissing this might have consequences...</p>}
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
