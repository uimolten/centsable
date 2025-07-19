
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { School, Road, Siren, Hospital, Plane } from 'lucide-react';
import type { InteractiveTownStep, InteractiveTownItem } from '@/types/lesson';
import { cn } from '@/lib/utils';

const iconMap = {
  school: School,
  road: Road,
  police: Siren,
  hospital: Hospital,
  jet: Plane,
};

interface InteractiveTownProps {
  step: InteractiveTownStep;
}

const TownItem = ({ item }: { item: InteractiveTownItem }) => {
  const Icon = iconMap[item.icon];
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: Math.random() * 0.5 }}
          className="absolute"
          style={{ top: item.position.top, left: item.position.left }}
        >
          <Button
            size="icon"
            className="rounded-full h-12 w-12 bg-primary/80 backdrop-blur-sm border-2 border-primary text-primary-foreground shadow-glow animate-pulse hover:animate-none"
          >
            <Icon className="h-6 w-6" />
          </Button>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent className="bg-card/80 backdrop-blur-md border-border/20">
        <p>{item.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export function InteractiveTown({ step }: InteractiveTownProps) {
  return (
    <motion.div
      key="interactive-town"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl"
    >
      <TooltipProvider>
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border-2 border-border/20 bg-card/50">
          <Image
            src="https://placehold.co/800x450"
            alt="A cartoon town showing various public services."
            layout="fill"
            objectFit="cover"
            data-ai-hint="cartoon town"
          />
          {step.items.map(item => (
            <TownItem key={item.id} item={item} />
          ))}
        </div>
      </TooltipProvider>
    </motion.div>
  );
}
