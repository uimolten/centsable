"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { cn } from '@/lib/utils';
import type { InteractiveSortStep, SortItem } from '@/types/lesson';

const ItemType = 'SORT_ITEM';

interface DraggableItemProps {
  item: SortItem;
}

const DraggableItem = ({ item }: DraggableItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: item.id, correctBox: item.correctBox },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={cn(
        'p-4 bg-card border border-border/20 rounded-lg cursor-grab text-center font-semibold',
        isDragging ? 'opacity-50' : 'opacity-100'
      )}
    >
      {item.text}
    </div>
  );
};

interface DropBoxProps {
  boxId: 'box1' | 'box2';
  label: string;
  onDrop: (item: { id: string; correctBox: string }, boxId: string) => void;
  children: React.ReactNode;
}

const DropBox = ({ boxId, label, onDrop, children }: DropBoxProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item: { id: string; correctBox: string }) => onDrop(item, boxId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="space-y-2">
        <h3 className="text-xl font-bold text-center text-primary">{label}</h3>
        <div
          ref={drop}
          className={cn(
            'p-4 border-2 border-dashed border-border/50 rounded-lg min-h-[200px] space-y-2 transition-colors',
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
  onComplete: () => void;
}

export function InteractiveSort({ step, onComplete }: InteractiveSortProps) {
  const [unplacedItems, setUnplacedItems] = useState<SortItem[]>(step.items);
  const [box1Items, setBox1Items] = useState<SortItem[]>([]);
  const [box2Items, setBox2Items] = useState<SortItem[]>([]);

  const handleDrop = (droppedItem: { id: string, correctBox: string }, targetBoxId: string) => {
    const itemToMove = unplacedItems.find(i => i.id === droppedItem.id);
    if (!itemToMove) return;

    if (itemToMove.correctBox === targetBoxId) {
      setUnplacedItems(unplacedItems.filter(i => i.id !== droppedItem.id));
      if (targetBoxId === 'box1') {
        setBox1Items([...box1Items, itemToMove]);
      } else {
        setBox2Items([...box2Items, itemToMove]);
      }
    } else {
      // Handle incorrect drop (e.g., shake animation)
      console.log('Incorrect drop');
    }
  };
  
  useEffect(() => {
    if (unplacedItems.length === 0) {
      onComplete();
    }
  }, [unplacedItems, onComplete]);

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
        
        <div className="p-4 bg-background rounded-lg grid grid-cols-1 md:grid-cols-3 gap-2 min-h-[100px]">
          {unplacedItems.map(item => <DraggableItem key={item.id} item={item} />)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DropBox boxId="box1" label={step.box1Label} onDrop={handleDrop}>
             {box1Items.map(item => <div key={item.id} className="p-4 bg-card/80 border border-green-500/50 rounded-lg text-center font-semibold">{item.text}</div>)}
          </DropBox>
          <DropBox boxId="box2" label={step.box2Label} onDrop={handleDrop}>
            {box2Items.map(item => <div key={item.id} className="p-4 bg-card/80 border border-green-500/50 rounded-lg text-center font-semibold">{item.text}</div>)}
          </DropBox>
        </div>
      </motion.div>
    </DndProvider>
  );
}
