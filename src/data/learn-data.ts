
import type { Unit } from '@/types/learn';
import { PiggyBank, PieChart, CreditCard, LineChart, Landmark, ShieldCheck, Briefcase } from 'lucide-react';

// Set this to `false` before deploying to production to enable sequential unlocking.
export const DEV_MODE_UNLOCK_ALL = true;

const rawUnitsData: Unit[] = [
  {
    id: 'unit-1',
    title: 'Saving',
    description: "Learn the fundamentals of saving money and building a secure financial future.",
    unitIcon: PiggyBank,
    activities: [
      { id: 's1', title: 'The Importance of Saving', type: 'lesson', state: 'active', xp: 60 },
      { id: 's2', title: 'Creating a Savings Goal', type: 'lesson', state: 'locked', xp: 75 },
      { id: 's3', title: 'Practice: Savings Goals', type: 'practice', state: 'locked', xp: 40 },
      { id: 's4', title: 'Saving Unit Quiz', type: 'quiz', state: 'locked', xp: 100 },
    ],
  },
  {
    id: 'unit-2',
    title: 'Budgeting',
    description: "Master the art of budgeting to take control of your income and expenses.",
    unitIcon: PieChart,
    activities: [
      { id: 'b1', title: 'Why Budgeting Matters', type: 'lesson', state: 'locked', xp: 50 },
      { id: 'b2', title: 'Tracking Income & Expenses', type: 'lesson', state: 'locked', xp: 60 },
      { id: 'bp1', title: 'Practice: Tracking Your Money', type: 'practice', state: 'locked', xp: 40 },
      { id: 'b3', title: 'Building a Budget', type: 'lesson', state: 'locked', xp: 70 },
      { id: 'b4', title: 'Sticking to Your Budget', type: 'lesson', state: 'locked', xp: 70 },
      { id: 'bp2', title: 'Practice: Budget Scenarios', type: 'practice', state: 'locked', xp: 40 },
      { id: 'b5', title: 'Budgeting for Goals', type: 'lesson', state: 'locked', xp: 80 },
      { id: 'bq1', title: 'Budgeting Unit Quiz', type: 'quiz', state: 'locked', xp: 100 },
    ],
  },
  {
    id: 'unit-3',
    title: 'Credit',
    description: "Understand how credit works, from credit cards to building a strong credit score.",
    unitIcon: CreditCard,
    activities: [
      { id: 'c1', title: 'What Is Credit & Why It Matters', type: 'lesson', state: 'locked', xp: 60 },
      { id: 'c2', title: 'Building & Managing Good Credit', type: 'lesson', state: 'locked', xp: 75 },
      { id: 'cp1', title: 'Practice: Credit Habits', type: 'practice', state: 'locked', xp: 40 },
      { id: 'c3', title: 'Understanding Credit Reports & Scores', type: 'lesson', state: 'locked', xp: 70 },
      { id: 'c4', title: 'The Cost of Borrowing & Interest', type: 'lesson', state: 'locked', xp: 70 },
      { id: 'cp2', title: 'Practice: Credit Scenarios', type: 'practice', state: 'locked', xp: 40 },
      { id: 'c5', title: 'Smart Credit Decisions & Avoiding Trouble', type: 'lesson', state: 'locked', xp: 80 },
      { id: 'cq1', title: 'Credit Unit Quiz', type: 'quiz', state: 'locked', xp: 100 },
    ],
  },
  {
    id: 'unit-4',
    title: 'Investing',
    description: "Explore the world of investing and learn how to make your money grow.",
    unitIcon: LineChart,
    activities: [
      { id: 'i1', title: 'What is Investing? The Power of Compounding', type: 'lesson', state: 'locked', xp: 50 },
      { id: 'i2', title: 'The Rules of the Game: Risk & Reward', type: 'lesson', state: 'locked', xp: 60 },
      { id: 'i3', title: 'Choosing Your Gear: Types of Investments', type: 'lesson', state: 'locked', xp: 70 },
      { id: 'i4', title: "Don't Put All Your Items in One Slot: Diversification", type: 'lesson', state: 'locked', xp: 60 },
      { id: 'i5', title: 'Starting Your Quest: How to Actually Invest', type: 'lesson', state: 'locked', xp: 50 },
      { id: 'i6', title: 'Investing Unit Quiz', type: 'quiz', state: 'locked', xp: 25 },
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

// Logic to set the initial state of activities
export const units: Unit[] = rawUnitsData.map((unit, unitIndex) => ({
    ...unit,
    activities: unit.activities.map((activity, activityIndex) => {
        const isFirstActivityOfAll = unitIndex === 0 && activityIndex === 0;
        
        // In dev mode, all activities are active. In prod, only the very first one is.
        const state = DEV_MODE_UNLOCK_ALL ? 'active' : (isFirstActivityOfAll ? 'active' : 'locked');
        
        return { ...activity, state };
    })
}));
