
"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Award, Coins } from 'lucide-react';
import { Mascot } from '../lesson/mascot';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
  reward: number;
}

export function LevelUpModal({ isOpen, onClose, newLevel, reward }: LevelUpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative text-center space-y-6 flex flex-col items-center bg-card/50 backdrop-blur-xl border-2 border-primary shadow-glow rounded-2xl p-8 md:p-12 w-full max-w-md m-4"
      >
        <Mascot isHappy />

        <div className="flex flex-col items-center">
            <h1 className="text-5xl font-black text-primary font-headline animate-pulse">LEVEL UP!</h1>
            <p className="text-2xl text-muted-foreground mt-2">You've reached Level {newLevel}!</p>
        </div>

        <div className="flex flex-col items-center gap-4 bg-background/50 p-6 rounded-lg w-full">
            <h2 className="font-bold text-lg text-foreground">REWARDS EARNED</h2>
            <div className="flex items-center gap-4 justify-center">
                <div className="flex items-center gap-2 text-2xl font-bold text-yellow-400">
                    <Coins className="w-8 h-8" />
                    <span>+{reward}</span>
                </div>
            </div>
        </div>

        <Button size="lg" className="text-lg font-bold shadow-glow w-full" onClick={onClose}>
          Continue
        </Button>
      </motion.div>
    </div>
  );
}

    