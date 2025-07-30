
import { PiggyBank, PieChart, CreditCard, LineChart, Landmark, ShieldCheck, Briefcase, LucideIcon } from 'lucide-react';

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
    id: 'credit-climber',
    title: 'Credit Climber',
    description: 'Make smart credit decisions to climb your credit score to the top!',
    icon: CreditCard,
    requiredUnitId: 'unit-3', // Unlocks after completing Credit unit
  },
  {
    id: 'investment-voyage',
    title: 'Investment Voyage',
    description: 'Navigate the market, balance risk and reward, and grow your portfolio.',
    icon: LineChart,
    requiredUnitId: 'unit-4', // Unlocks after completing Investing unit
  },
  {
    id: 'tax-dash',
    title: 'Tax Dash',
    description: 'Race against the clock to identify deductions and file your taxes correctly.',
    icon: Landmark,
    requiredUnitId: 'unit-5', // Unlocks after completing Taxes unit
  },
   {
    id: 'retirement-rush',
    title: 'Retirement Rush',
    description: "Make smart choices to maximize your retirement savings for the long haul.",
    icon: Briefcase,
    requiredUnitId: 'unit-6', // Unlocks after completing Retirement Planning unit
  },
];
