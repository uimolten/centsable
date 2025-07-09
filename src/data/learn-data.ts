
import type { Unit } from '@/types/learn';
import { PiggyBank, PieChart, CreditCard, LineChart, Landmark, ShieldCheck, Briefcase } from 'lucide-react';

export const units: Unit[] = [
  {
    id: 'unit-1',
    title: 'Saving',
    description: "Learn the fundamentals of saving money and building a secure financial future.",
    unitIcon: PiggyBank,
    activities: [
      { id: 's1', title: 'The Importance of Saving', type: 'lesson', state: 'active', xp: 10 },
      { id: 's2', title: 'Creating a Savings Goal', type: 'lesson', state: 'locked', xp: 10 },
      { id: 's3', title: 'Practice: Savings Goals', type: 'practice', state: 'locked', xp: 15 },
      { id: 's4', title: 'Saving Unit Quiz', type: 'quiz', state: 'locked', xp: 25 },
    ],
  },
  {
    id: 'unit-2',
    title: 'Budgeting',
    description: "Master the art of budgeting to take control of your income and expenses.",
    unitIcon: PieChart,
    activities: [
      { id: 'b1', title: 'Why Budgeting Matters', type: 'lesson', state: 'locked', xp: 10 },
      { id: 'b2', title: 'Needs vs. Wants', type: 'lesson', state: 'locked', xp: 10 },
      { id: 'b3', title: 'Practice: Categorize Expenses', type: 'practice', state: 'locked', xp: 15 },
      { id: 'b4', title: 'The 50/30/20 Rule', type: 'lesson', state: 'locked', xp: 10 },
      { id: 'b5', title: 'Budgeting Unit Quiz', type: 'quiz', state: 'locked', xp: 25 },
    ],
  },
  {
    id: 'unit-3',
    title: 'Credit',
    description: "Understand how credit works, from credit cards to building a strong credit score.",
    unitIcon: CreditCard,
    activities: [
      { id: 'c1', title: 'What are Credit Cards?', type: 'lesson', state: 'locked', xp: 10 },
      { id: 'c2', title: 'Understanding Credit Scores', type: 'lesson', state: 'locked', xp: 10 },
      { id: 'c3', title: 'Practice: Good vs. Bad Debt', type: 'practice', state: 'locked', xp: 15 },
      { id: 'c4', title: 'Credit Unit Quiz', type: 'quiz', state: 'locked', xp: 25 },
    ],
  },
  {
    id: 'unit-4',
    title: 'Investing',
    description: "Explore the world of investing and learn how to make your money grow.",
    unitIcon: LineChart,
    activities: [
      { id: 'i1', title: 'Introduction to Investing', type: 'lesson', state: 'locked', xp: 10 },
      { id: 'i2', title: 'Stocks, Bonds, and Funds', type: 'lesson', state: 'locked', xp: 10 },
      { id: 'i3', title: 'Compound Interest Explained', type: 'lesson', state: 'locked', xp: 10 },
      { id: 'i4', title: 'Practice: Risk Tolerance', type: 'practice', state: 'locked', xp: 15 },
      { id: 'i5', title: 'Investing Unit Quiz', type: 'quiz', state: 'locked', xp: 25 },
    ],
  },
  {
    id: 'unit-5',
    title: 'Taxes',
    description: "Demystify taxes and understand your responsibilities as a taxpayer.",
    unitIcon: Landmark,
    activities: [
      { id: 't1', title: 'Why We Pay Taxes', type: 'lesson', state: 'locked', xp: 10 },
      { id: 't2', title: 'Understanding Your Paycheck', type: 'lesson', state: 'locked', xp: 10 },
      { id: 't3', title: 'Taxes Unit Quiz', type: 'quiz', state: 'locked', xp: 25 },
    ],
  },
    {
    id: 'unit-6',
    title: 'Retirement Planning',
    description: "It's never too early to start! Learn the basics of planning for retirement.",
    unitIcon: Briefcase,
    activities: [
      { id: 'r1', title: 'Intro to Retirement Accounts', type: 'lesson', state: 'locked', xp: 10 },
      { id: 'r2', title: 'Retirement Unit Quiz', type: 'quiz', state: 'locked', xp: 25 },
    ],
  },
  {
    id: 'unit-7',
    title: 'Understanding Insurance',
    description: "Learn how insurance protects you and your assets from unexpected events.",
    unitIcon: ShieldCheck,
    activities: [
      { id: 'ui1', title: 'What is Insurance?', type: 'lesson', state: 'locked', xp: 10 },
      { id: 'ui2', title: 'Insurance Unit Quiz', type: 'quiz', state: 'locked', xp: 25 },
    ],
  },
];
