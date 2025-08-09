
import { PiggyBank, PieChart, CreditCard, LucideIcon } from 'lucide-react';

export interface Minigame {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  requiredUnitId: string; // which unit needs to be completed to unlock this
}

export const minigames: Minigame[] = [
  {
    id: 'savings-sorter',
    title: 'Savings Sorter',
    description: 'Quickly sort expenses into Needs and Wants to rack up points!',
    icon: PiggyBank,
    requiredUnitId: 'unit-1', // Unlocks after completing Savings unit
  },
  {
    id: 'budget-busters',
    title: 'Budget Busters',
    description: 'Handle surprise expenses before time runs out!',
    icon: PieChart,
    requiredUnitId: 'unit-2', // Unlocks after completing Budgeting unit
  },
  {
    id: 'credit-swipe',
    title: 'Credit Swipe',
    description: 'Play as a loan officer and approve or deny applications. Swipe wisely!',
    icon: CreditCard,
    requiredUnitId: 'unit-3', // Unlocks after completing Credit unit
  },
];
