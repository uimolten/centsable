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
}

type Item = { id: number; text: string; pairId: number; type: 'term' | 'definition' };

export function TapThePairs({ step, onComplete }: TapThePairsProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [wasCompleted, setWasCompleted] = useState(false);

  useEffect(() => {
    const terms = step.pairs.map((p, i) => ({ id: i * 2, text: p.term, pairId: i, type: 'term' as const }));
    const definitions = step.pairs.map((p, i) => ({ id: i * 2 + 1, text: p.definition, pairId: i, type: 'definition' as const }));
    setItems(shuffle([...terms, ...definitions]));
  }, [step]);
  
  useEffect(() => {
    if (wasCompleted) return;
    if (matchedPairs.length > 0 && matchedPairs.length === step.pairs.length) {
      onComplete(true);
      setWasCompleted(true);
    }
  }, [matchedPairs, step.pairs.length, onComplete, wasCompleted]);

  const handleItemClick = (item: Item) => {
    if (wasCompleted || matchedPairs.includes(item.pairId) || item.id === selectedItem?.id) {
      setSelectedItem(null);
      return;
    };

    if (!selectedItem) {
      setSelectedItem(item);
    } else {
      if (selectedItem.pairId === item.pairId && selectedItem.type !== item.type) {
        // It's a match!
        setMatchedPairs([...matchedPairs, item.pairId]);
        setSelectedItem(null);
      } else {
        // Not a match, create shake effect on selected item then deselect
        const selectedButton = document.getElementById(`pair-item-${selectedItem.id}`);
        selectedButton?.classList.add('animate-shake');
        setTimeout(() => {
            selectedButton?.classList.remove('animate-shake');
            setSelectedItem(null);
        }, 820);
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
              matchedPairs.includes(item.pairId) && "opacity-25 !bg-green-500/30 border-green-500"
            )}
            onClick={() => handleItemClick(item)}
            disabled={matchedPairs.includes(item.pairId)}
          >
            {item.text}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
