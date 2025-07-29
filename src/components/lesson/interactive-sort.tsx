
"use client";

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
  canDrag: boolean;
}

const DraggableItem = ({ item, canDrag }: DraggableItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: item.id },
    canDrag: canDrag,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [item.id, canDrag]);

  return (
    <motion.div
      ref={drag}
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className={cn(
        'p-4 bg-card border border-border/20 rounded-lg text-center font-semibold transition-all',
        isDragging ? 'opacity-50 scale-105 z-10' : 'opacity-100',
        canDrag ? 'cursor-grab' : 'cursor-not-allowed'
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
  }), [onDrop, zoneId]);

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
  items: SortItem[];
  onItemsChange: (items: SortItem[]) => void;
  hasAnswered: boolean;
  isCorrect: boolean | null;
  incorrectAttempts: number;
}

export function InteractiveSort({ step, items, onItemsChange, hasAnswered, isCorrect }: InteractiveSortProps) {

  const handleDrop = (droppedItem: { id: string }, targetZoneId: 'pool' | 'box1' | 'box2') => {
    if (hasAnswered) return;
    const newItems = items.map(item => 
        item.id === droppedItem.id ? { ...item, location: targetZoneId } : item
    );
    onItemsChange(newItems);
  };
  
  return (
      <motion.div
        key="interactive-sort"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-4 bg-card/50 backdrop-blur-lg border border-border/20 rounded-2xl p-8 md:p-12 w-full"
      >
        <DropZone zoneId="pool" onDrop={handleDrop} className="bg-background min-h-[100px] justify-center">
            {items.filter(i => i.location === 'pool').map(item => (
                <DraggableItem key={item.id} item={item} canDrag={!hasAnswered} />
            ))}
        </DropZone>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DropZone zoneId="box1" label={step.box1Label} onDrop={handleDrop} className="min-h-[200px]">
             {items.filter(i => i.location === 'box1').map(item => (
                <DraggableItem key={item.id} item={item} canDrag={!hasAnswered} />
            ))}
          </DropZone>
          <DropZone zoneId="box2" label={step.box2Label} onDrop={handleDrop} className="min-h-[200px]">
            {items.filter(i => i.location === 'box2').map(item => (
                <DraggableItem key={item.id} item={item} canDrag={!hasAnswered} />
            ))}
          </DropZone>
        </div>
      </motion.div>
  );
}
