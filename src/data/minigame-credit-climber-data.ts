
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
    boost: -50, // Upward boost (negative Y is up)
    scoreChange: 25,
  },
  {
    type: 'good',
    icon: CreditCard, // Represents low utilization
    boost: -40,
    scoreChange: 20,
  },
  {
    type: 'good',
    icon: Search, // Represents checking credit report
    boost: -70,
    scoreChange: 40,
  },

  // Negative Obstacles
  {
    type: 'bad',
    icon: XCircle, // Represents missed payment
    boost: 60, // Downward push (positive Y is down)
    scoreChange: -50,
  },
  {
    type: 'bad',
    icon: AlertTriangle, // Represents maxed out card
    boost: 50,
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
