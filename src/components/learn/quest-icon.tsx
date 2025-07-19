
"use client";

import { Flame, BrainCircuit, Target, Gamepad2, User, BookOpen, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const questIconMap: Record<string, LucideIcon> = {
  quiz_whiz: BrainCircuit,
  lesson_learner: BookOpen,
  topic_starter: BookOpen,
  unit_finisher: Target,
  practice_perfect: BrainCircuit,
  game_on: Gamepad2,
  budget_buster_champ: Gamepad2,
  high_scorer: Target,
  login_streak: Flame,
  profile_updater: User,
  explorer: Target,
  default: Target,
};

interface QuestIconProps {
  questId: string;
  className?: string;
}

export function QuestIcon({ questId, className }: QuestIconProps) {
  const Icon = questIconMap[questId] || questIconMap.default;
  return <Icon className={cn("text-muted-foreground", className)} />;
}
