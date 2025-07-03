"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { TapThePairsStep } from '@/types/lesson';
import { shuffle } from 'lodash';

interface TapThePairsProps {
  step: TapThePairsStep;
  onComplete: () => void;
}

type Item = { id: number; text: string; pairId: number; type: 'term' | 'definition' };

export function TapThePairs({ step, onComplete }: TapThePairsProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  useEffect(() => {
    const terms = step.pairs.map((p, i) => ({ id: i * 2, text: p.term, pairId: i, type: 'term' as const }));
    const definitions = step.pairs.map((p, i) => ({ id: i * 2 + 1, text: p.definition, pairId: i, type: 'definition' as const }));
    setItems(shuffle([...terms, ...definitions]));
  }, [step]);
  
  useEffect(() => {
    if (matchedPairs.length === step.pairs.length) {
      onComplete();
    }
  }, [matchedPairs, step.pairs.length, onComplete]);

  const handleItemClick = (item: Item) => {
    if (matchedPairs.includes(item.pairId)) return;

    if (!selectedItem) {
      setSelectedItem(item);
    } else {
      if (selectedItem.pairId === item.pairId && selectedItem.type !== item.type) {
        // It's a match!
        setMatchedPairs([...matchedPairs, item.pairId]);
        setSelectedItem(null);
      } else {
        // Not a match
        setSelectedItem(null); // Just deselect, can add feedback later
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
            key={item.id}
            variant="outline"
            size="lg"
            className={cn(
              "text-lg h-auto py-4 min-h-[80px] whitespace-normal",
              selectedItem?.id === item.id && "bg-accent",
              matchedPairs.includes(item.pairId) && "opacity-25 !bg-transparent"
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
