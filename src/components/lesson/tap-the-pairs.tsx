
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { TapThePairsStep } from '@/types/lesson';
import { shuffle } from 'lodash';

interface TapThePairsProps {
  step: TapThePairsStep;
  onComplete: (isCorrect: boolean) => void;
  incorrectAttempts: number;
  hasAnswered: boolean;
  isCorrect: boolean | null;
}

type Item = { id: number; text: string; pairId: number; type: 'term' | 'definition' };

export function TapThePairs({ step, onComplete, incorrectAttempts, hasAnswered, isCorrect }: TapThePairsProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [hintShown, setHintShown] = useState(false);

  useEffect(() => {
    const terms = step.pairs.map((p, i) => ({ id: i * 2, text: p.term, pairId: i, type: 'term' as const }));
    const definitions = step.pairs.map((p, i) => ({ id: i * 2 + 1, text: p.definition, pairId: i, type: 'definition' as const }));
    setItems(shuffle([...terms, ...definitions]));
    setMatchedPairs([]);
    setSelectedItem(null);
    setHintShown(false);
  }, [step]);
  
  const isCompleteAndCorrect = hasAnswered && isCorrect === true;

  useEffect(() => {
    if (hasAnswered) return;

    if (items.length > 0 && matchedPairs.length === step.pairs.length) {
      onComplete(true);
    }
  }, [matchedPairs, step.pairs.length, onComplete, items.length, hasAnswered]);
  
  useEffect(() => {
    if (incorrectAttempts >= 3 && !hintShown) {
      const unmatchedPairIndex = step.pairs.findIndex((p, index) => !matchedPairs.includes(index));
      if (unmatchedPairIndex !== -1) {
        setMatchedPairs(prev => [...prev, unmatchedPairIndex]);
        setHintShown(true);
        setSelectedItem(null); // Deselect any active item
      }
    }
  }, [incorrectAttempts, hintShown, matchedPairs, step.pairs]);

  const handleItemClick = (item: Item) => {
    if (isCompleteAndCorrect || matchedPairs.includes(item.pairId)) {
      return;
    };

    if (item.id === selectedItem?.id) {
        setSelectedItem(null);
        return;
    }

    if (!selectedItem) {
      setSelectedItem(item);
    } else {
      if (selectedItem.pairId === item.pairId && selectedItem.type !== item.type) {
        // It's a match!
        setMatchedPairs(prev => [...prev, item.pairId]);
        setSelectedItem(null);
      } else {
        // Not a match, create shake effect on selected item then deselect
        const selectedButton = document.getElementById(`pair-item-${selectedItem.id}`);
        const currentButton = document.getElementById(`pair-item-${item.id}`);

        selectedButton?.classList.add('animate-shake');
        currentButton?.classList.add('animate-shake');

        setTimeout(() => {
            selectedButton?.classList.remove('animate-shake');
            currentButton?.classList.remove('animate-shake');
            setSelectedItem(null);
        }, 820);
        onComplete(false);
      }
    }
  };

  return (
    <motion.div
      key="tap-the-pairs"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center">{step.instructions}</h2>
      {hintShown && (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-primary text-lg text-center"
        >
            Hint: I helped you with one pair!
        </motion.div>
      )}
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <Button
            id={`pair-item-${item.id}`}
            key={item.id}
            variant="outline"
            size="lg"
            className={cn(
              "text-lg h-auto py-4 min-h-[80px] whitespace-normal transition-all duration-300",
              selectedItem?.id === item.id && "bg-accent ring-2 ring-primary",
              (isCompleteAndCorrect || matchedPairs.includes(item.pairId)) && "opacity-50 !bg-green-500/30 border-green-500 cursor-not-allowed"
            )}
            onClick={() => handleItemClick(item)}
            disabled={isCompleteAndCorrect || matchedPairs.includes(item.pairId)}
          >
            {item.text}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
