import type { LucideIcon } from 'lucide-react';

export type ActivityState = 'locked' | 'active' | 'completed';
export type ActivityType = 'lesson' | 'practice' | 'quiz';

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  state: ActivityState;
  xp: number;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  unitIcon: LucideIcon;
  activities: Activity[];
}
