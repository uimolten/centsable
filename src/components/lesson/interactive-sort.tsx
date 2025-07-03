"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { cn } from '@/lib/utils';
import type { InteractiveSortStep, SortItem as BaseSortItem } from '@/types/lesson';

const ItemType = 'SORT_ITEM';

interface SortItem extends BaseSortItem {
    location: 'pool' | 'box1' | 'box2';
}

interface DraggableItemProps {
  item: SortItem;
}

const DraggableItem = ({ item }: DraggableItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      layout
      className={cn(
        'p-4 bg-card border border-border/20 rounded-lg cursor-grab text-center font-semibold transition-all',
        isDragging ? 'opacity-50 scale-105 z-10' : 'opacity-100'
      )}
    >
      {item.text}
    </motion.div>
  );
};

interface DropZoneProps {
  zoneId: 'pool' | 'box1' | 'box2';
  onDrop: (item: { id: string }, zoneId: 'pool' | 'box1' | 'box2') => void;
  children: React.ReactNode;
  className?: string;
  label?: string;
}

const DropZone = ({ zoneId, onDrop, children, className, label }: DropZoneProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item: { id: string }) => onDrop(item, zoneId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="space-y-2">
      {label && <h3 className="text-xl font-bold text-center text-primary">{label}</h3>}
      <div
        ref={drop}
        className={cn(
          'p-4 border-2 border-dashed border-border/50 rounded-lg min-h-[100px] transition-colors',
          'flex flex-wrap items-start content-start gap-2',
          className,
          isOver ? 'bg-primary/20 border-primary' : ''
        )}
      >
        <AnimatePresence>
          {children}
        </AnimatePresence>
      </div>
    </div>
  );
};


interface InteractiveSortProps {
  step: InteractiveSortStep;
  onComplete: (isCorrect: boolean) => void;
}

export function InteractiveSort({ step, onComplete }: InteractiveSortProps) {
  const [items, setItems] = useState<SortItem[]>([]);
  const [wasCompleted, setWasCompleted] = useState(false);

  useEffect(() => {
    setItems(step.items.map(item => ({...item, location: 'pool'})));
  }, [step]);
  
  const handleDrop = (droppedItem: { id: string }, targetZoneId: 'pool' | 'box1' | 'box2') => {
    if (wasCompleted) return;
    setItems(prevItems => 
        prevItems.map(item => 
            item.id === droppedItem.id ? { ...item, location: targetZoneId } : item
        )
    );
  };
  
  useEffect(() => {
    if (wasCompleted) return;

    const unplacedItems = items.filter(i => i.location === 'pool');
    if (items.length > 0 && unplacedItems.length === 0) {
      const isCorrect = items.every(item => item.location === item.correctBox);
      onComplete(isCorrect);
      setWasCompleted(true);
    }
  }, [items, onComplete, wasCompleted]);

  return (
    <DndProvider backend={HTML5Backend}>
      <motion.div
        key="interactive-sort"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center">{step.instructions}</h2>
        
        <DropZone zoneId="pool" onDrop={handleDrop} className="bg-background min-h-[100px] justify-center">
            {items.filter(i => i.location === 'pool').map(item => (
                <DraggableItem key={item.id} item={item} />
            ))}
        </DropZone>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DropZone zoneId="box1" label={step.box1Label} onDrop={handleDrop} className="min-h-[200px]">
             {items.filter(i => i.location === 'box1').map(item => (
                <DraggableItem key={item.id} item={item} />
            ))}
          </DropZone>
          <DropZone zoneId="box2" label={step.box2Label} onDrop={handleDrop} className="min-h-[200px]">
            {items.filter(i => i.location === 'box2').map(item => (
                <DraggableItem key={item.id} item={item} />
            ))}
          </DropZone>
        </div>
      </motion.div>
    </DndProvider>
  );
}
