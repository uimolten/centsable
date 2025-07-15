
"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

interface BudgetTankProps {
  label: string;
  amount: number;
  capacity: number;
  color: string;
  isLocked?: boolean;
  onTap?: () => void;
  isSelected?: boolean;
  className?: string;
}

export function BudgetTank({ label, amount, capacity, color, isLocked, onTap, isSelected, className }: BudgetTankProps) {
  const fillPercentage = capacity > 0 ? (amount / capacity) * 100 : 0;

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <button
        onClick={onTap}
        disabled={isLocked || !onTap}
        className={cn(
            "relative w-full h-48 bg-card/50 border-4 border-border/20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300",
            isSelected && "ring-4 ring-primary ring-offset-2 ring-offset-background",
            isLocked && "cursor-not-allowed opacity-70"
        )}
      >
        <motion.div
          className="absolute bottom-0 left-0 w-full"
          style={{ background: color, boxShadow: `0 0 20px ${color}` }}
          initial={{ height: 0 }}
          animate={{ height: `${fillPercentage}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
            {/* Liquid wave effect */}
            <div className="absolute -top-1 left-0 w-full h-4 bg-transparent">
                <div className="absolute w-[200%] h-4 bg-background/50 rounded-[40%] animate-[wave_3s_cubic-bezier(0.36,0.45,0.63,0.53)_infinite] top-0 left-0" />
                <div className="absolute w-[200%] h-4 bg-transparent rounded-[40%] animate-[wave_3s_cubic-bezier(0.36,0.45,0.63,0.53)_infinite_0.5s] top-0 left-0" />
            </div>
        </motion.div>
        
        {isLocked && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Lock className="w-12 h-12 text-foreground/50" />
            </div>
        )}

      </button>
      <div className="text-center">
        <p className="font-bold text-lg">{label}</p>
        <p className="font-mono text-muted-foreground">${Math.round(amount)}</p>
      </div>
    </div>
  );
}

// Add wave animation to tailwind config if not present
// in tailwind.config.ts -> keyframes
/*
'wave': {
    '0%': { transform: 'translateX(0) translateZ(0) scaleY(1)' },
    '50%': { transform: 'translateX(-25%) translateZ(0) scaleY(0.55)' },
    '100%': { transform: 'translateX(-50%) translateZ(0) scaleY(1)' },
},
*/
// in tailwind.config.ts -> animation
/*
wave: 'wave 3s cubic-bezier(0.36,0.45,0.63,0.53) infinite',
*/
