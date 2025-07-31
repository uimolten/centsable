
import { Calendar, CreditCard, Search, XCircle, AlertTriangle, LucideIcon } from 'lucide-react';

export interface GameElementConfig {
  type: 'good' | 'bad';
  icon: LucideIcon;
  boost: number; // Vertical velocity change
  scoreChange: number;
}

export const gameElementsConfig: GameElementConfig[] = [
  // Positive Collectibles
  {
    type: 'good',
    icon: Calendar,
    boost: -5, // Upward boost
    scoreChange: 25,
  },
  {
    type: 'good',
    icon: CreditCard, // Represents low utilization
    boost: -5,
    scoreChange: 20,
  },
  {
    type: 'good',
    icon: Search, // Represents checking credit report
    boost: -7,
    scoreChange: 40,
  },

  // Negative Obstacles
  {
    type: 'bad',
    icon: XCircle, // Represents missed payment
    boost: 8, // Downward push
    scoreChange: -50,
  },
  {
    type: 'bad',
    icon: AlertTriangle, // Represents maxed out card
    boost: 6,
    scoreChange: -40,
  },
];

export interface GameConfig {
  gravity: number;
  jumpVelocity: number;
  scrollSpeed: number;
  spawnRate: number; // in frames
}

export const gameConfig: GameConfig = {
  gravity: 0.3,
  jumpVelocity: -8,
  scrollSpeed: 3,
  spawnRate: 90,
};
