
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, X, Gift, Sparkles, ShoppingCart, Drama, Ban } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GameEvent, ChoiceEvent, ExpenseEvent, WindfallEvent } from '@/data/minigame-budget-busters-data';
import { playClickSound } from '@/lib/audio-utils';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface LevelDisplayProps {
  budget: number;
  event: GameEvent;
  onDecision: (action: 'pay' | 'dismiss' | 'choose_a' | 'choose_b' | 'skip_choice' | 'collect_windfall') => void;
  round: number;
  totalRounds: number;
  currentScore: number;
  isProcessing: boolean;
}


const ExpenseCard = ({ event, budget, onDecision, isProcessing }: { event: ExpenseEvent, budget: number, onDecision: LevelDisplayProps['onDecision'], isProcessing: boolean }) => {
    const canAfford = budget >= event.cost;
    return (
        <motion.div
            key={event.description}
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-0 z-10 w-full max-w-lg space-y-4"
        >
            <Card className="text-center border-4 bg-card/80 border-border/20">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2 font-black text-2xl text-primary">
                        <ShoppingCart className="w-8 h-8" /> A WILD EXPENSE APPEARS!
                    </CardTitle>
                    <CardDescription className="text-xl text-foreground/80 font-bold py-4">
                        {event.description}
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                <Button
                    size="lg"
                    className="h-24 text-2xl font-black bg-primary hover:bg-primary/80 shadow-glow"
                    onClick={() => { playClickSound(); onDecision('pay'); }}
                    disabled={!canAfford || isProcessing}
                >
                    Pay ${event.cost}
                </Button>
                <Button
                    size="lg"
                    variant="destructive"
                    className="h-24 text-2xl font-black bg-red-600/80 hover:bg-red-600"
                    onClick={() => { playClickSound(); onDecision('dismiss'); }}
                    disabled={isProcessing}
                >
                    <X className="w-8 h-8 mr-2" />
                    Dismiss
                </Button>
            </div>
            {!canAfford && <p className="text-center text-destructive font-bold">You cannot afford this!</p>}
        </motion.div>
    )
}

const ChoiceCard = ({ event, budget, onDecision, isProcessing }: { event: ChoiceEvent, budget: number, onDecision: LevelDisplayProps['onDecision'], isProcessing: boolean}) => {
    const canAffordA = budget >= event.optionA.cost;
    const canAffordB = budget >= event.optionB.cost;

    return (
         <motion.div
            key={event.description}
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-0 z-10 w-full max-w-lg space-y-4"
        >
            <Card className="text-center border-4 bg-card/80 border-border/20">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2 font-black text-2xl text-primary">
                        <Drama className="w-8 h-8" /> DECISION TIME!
                    </CardTitle>
                     <CardDescription className="text-xl text-foreground/80 font-bold py-4">
                        {event.description}
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                 <Button
                    size="lg"
                    variant="outline"
                    className="h-32 text-xl font-bold flex flex-col items-center justify-center gap-2 p-4 whitespace-normal"
                    onClick={() => { playClickSound(); onDecision('choose_a'); }}
                    disabled={!canAffordA || isProcessing}
                >
                    <span className="text-center">{event.optionA.description}</span>
                    <span className="text-primary font-black text-2xl">${event.optionA.cost}</span>
                </Button>
                 <Button
                    size="lg"
                    variant="outline"
                    className="h-32 text-xl font-bold flex flex-col items-center justify-center gap-2 p-4 whitespace-normal"
                    onClick={() => { playClickSound(); onDecision('choose_b'); }}
                    disabled={!canAffordB || isProcessing}
                >
                    <span className="text-center">{event.optionB.description}</span>
                    <span className="text-primary font-black text-2xl">${event.optionB.cost}</span>
                </Button>
            </div>
             <Button
                size="lg"
                variant="secondary"
                className="w-full h-16 text-xl font-bold"
                onClick={() => { playClickSound(); onDecision('skip_choice'); }}
                disabled={isProcessing}
            >
                <Ban className="w-6 h-6 mr-2"/>
                Buy Neither
            </Button>
        </motion.div>
    )
}

const WindfallCard = ({ event, onDecision, isProcessing }: { event: WindfallEvent, onDecision: LevelDisplayProps['onDecision'], isProcessing: boolean}) => {
     return (
         <motion.div
            key={event.description}
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-0 z-10 w-full max-w-lg space-y-4"
        >
            <Card className="text-center border-4 bg-card/80 border-yellow-400/50">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2 font-black text-2xl text-yellow-400">
                        <Gift className="w-8 h-8" /> A WINDFALL!
                    </CardTitle>
                    <CardDescription className="text-xl text-foreground/80 font-bold py-4">
                        {event.description}
                    </CardDescription>
                </CardHeader>
            </Card>

            <Button
                size="lg"
                className="w-full h-24 text-2xl font-black bg-yellow-500 hover:bg-yellow-500/80 text-background shadow-glow"
                onClick={() => { playClickSound(); onDecision('collect_windfall'); }}
                disabled={isProcessing}
            >
                <Sparkles className="w-8 h-8 mr-2"/>
                Collect +${event.income}
            </Button>
        </motion.div>
    )
}

export function LevelDisplay({ budget, event, onDecision, round, totalRounds, currentScore, isProcessing }: LevelDisplayProps) {

  const renderEventCard = () => {
    const props = { budget, onDecision, isProcessing };
    switch (event.type) {
      case 'expense':
        return <ExpenseCard event={event} {...props} />;
      case 'choice':
        return <ChoiceCard event={event} {...props} />;
      case 'windfall':
        return <WindfallCard event={event} {...props} />;
      default:
        return null;
    }
  }

  return (
    <div className={cn("w-full h-full flex flex-col items-center justify-between p-4 transition-opacity", isProcessing && "opacity-50")}>
      <div className="w-full flex justify-between items-center mb-4 bg-card/50 p-3 rounded-lg">
        <div className="flex items-center gap-2 font-bold text-2xl">
            <Wallet className="text-primary"/>
            <span className="text-foreground">${budget.toFixed(2)}</span>
        </div>
        <div className="flex flex-col items-center">
             <h2 className="text-xl font-bold">Event</h2>
             <span className="text-primary text-xl font-bold">{round} / {totalRounds}</span>
        </div>
         <div className="flex flex-col items-center">
             <h2 className="text-xl font-bold">Score</h2>
             <span className="text-primary text-xl font-bold">{currentScore}</span>
        </div>
      </div>

      <div className="relative w-full flex-grow flex items-center justify-center">
        <AnimatePresence>
            {renderEventCard()}
        </AnimatePresence>
      </div>
    </div>
  );
}
