
import type { Unit } from '@/types/learn';
import { PiggyBank, PieChart, CreditCard, LineChart, Landmark, ShieldCheck, Briefcase } from 'lucide-react';

// Set this to `true` to allow users to access any lesson, `false` to enforce sequential unlocking.
export const DEV_MODE_UNLOCK_ALL = true;

const rawUnitsData: Unit[] = [
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
      { id: 'b1', title: 'Where Does Your Money Go?', type: 'lesson', state: 'locked', xp: 5 },
      { id: 'b2', title: 'The 50/30/20 Rule', type: 'lesson', state: 'locked', xp: 7 },
      { id: 'b3', title: 'Building Your Game Plan', type: 'lesson', state: 'locked', xp: 7 },
      { id: 'b4', title: 'Staying in the Game', type: 'lesson', state: 'locked', xp: 5 },
      { id: 'bp1', title: 'Practice: The Budget Allocator', type: 'practice', state: 'locked', xp: 15 },
      { id: 'bq1', title: 'Budgeting Unit Quiz', type: 'quiz', state: 'locked', xp: 25 },
    ],
  },
  {
    id: 'unit-3',
    title: 'Credit',
    description: "Understand how credit works, from credit cards to building a strong credit score.",
    unitIcon: CreditCard,
    activities: [
      { id: 'c1', title: 'What Is Credit & Why It Matters', type: 'lesson', state: 'locked', xp: 8 },
      { id: 'c2', title: 'Building & Managing Good Credit', type: 'lesson', state: 'locked', xp: 10 },
      { id: 'cp1', title: 'Practice: Credit Habits', type: 'practice', state: 'locked', xp: 15 },
      { id: 'c3', title: 'Understanding Credit Reports & Scores', type: 'lesson', state: 'locked', xp: 8 },
      { id: 'c4', title: 'The Cost of Borrowing & Interest', type: 'lesson', state: 'locked', xp: 8 },
      { id: 'cp2', title: 'Practice: Credit Scenarios', type: 'practice', state: 'locked', xp: 15 },
      { id: 'c5', title: 'Smart Credit Decisions & Avoiding Trouble', type: 'lesson', state: 'locked', xp: 10 },
      { id: 'cq1', title: 'Credit Unit Quiz', type: 'quiz', state: 'locked', xp: 25 },
    ],
  },
  {
    id: 'unit-4',
    title: 'Investing',
    description: "Explore the world of investing and learn how to make your money grow.",
    unitIcon: LineChart,
    activities: [
      { id: 'i1', title: 'What is Investing? The Power of Compounding', type: 'lesson', state: 'locked', xp: 5 },
      { id: 'i2', title: 'The Rules of the Game: Risk & Reward', type: 'lesson', state: 'locked', xp: 7 },
      { id: 'i3', title: 'Choosing Your Gear: Types of Investments', type: 'lesson', state: 'locked', xp: 8 },
      { id: 'i4', title: "Don't Put All Your Items in One Slot: Diversification", type: 'lesson', state: 'locked', xp: 7 },
      { id: 'i5', title: 'Starting Your Quest: How to Actually Invest', type: 'lesson', state: 'locked', xp: 5 },
      { id: 'iq1', title: 'Investing Unit Quiz', type: 'quiz', state: 'locked', xp: 25 },
    ],
  },
  {
    id: 'unit-5',
    title: 'Taxes',
    description: "Demystify taxes and understand your responsibilities as a taxpayer.",
    unitIcon: Landmark,
    activities: [
      { id: 't1', title: 'Taxes 101: What They Are & Why We Have Them', type: 'lesson', state: 'locked', xp: 8 },
      { id: 't2', title: 'Decoding Your Paycheck', type: 'lesson', state: 'locked', xp: 8 },
      { id: 'tp1', title: 'Practice: Paycheck Detective', type: 'practice', state: 'locked', xp: 15 },
      { id: 't3', title: 'How to File Your Taxes', type: 'lesson', state: 'locked', xp: 10 },
      { id: 't4', title: 'Lowering Your Tax Bill & Future Taxes', type: 'lesson', state: 'locked', xp: 10 },
      { id: 'tp2', title: 'Practice: Mini Tax Return', type: 'practice', state: 'locked', xp: 15 },
      { id: 'tq1', title: 'Taxes Unit Quiz', type: 'quiz', state: 'locked', xp: 25 },
    ],
  },
  {
    id: 'unit-6',
    title: 'Retirement Planning',
    description: "It's never too early to start! Learn the basics of planning for the long term.",
    unitIcon: Briefcase,
    activities: [
      { id: 'r1', title: 'The Ultimate Endgame: What is Financial Freedom?', type: 'lesson', state: 'locked', xp: 8 },
      { id: 'r2', title: 'The Magic of Time: Your Greatest Superpower', type: 'lesson', state: 'locked', xp: 8 },
      { id: 'r3', title: 'Choosing Your Treasure Chest: Roth IRAs & 401(k)s', type: 'lesson', state: 'locked', xp: 8 },
      { id: 'r4', title: 'Starting the Quest: Your First Step to Freedom', type: 'lesson', state: 'locked', xp: 8 },
      { id: 'rp1', title: 'Practice: Your First Freedom Plan', type: 'practice', state: 'locked', xp: 15 },
      { id: 'rq1', title: 'Financial Freedom Unit Quiz', type: 'quiz', state: 'locked', xp: 25 },
    ],
  },
  {
    id: 'unit-7',
    title: 'Understanding Insurance',
    description: "Learn how insurance protects you and your assets from unexpected events.",
    unitIcon: ShieldCheck,
    activities: [
      { id: 'ui1', title: 'What is Insurance & Why Bother?', type: 'lesson', state: 'locked', xp: 5 },
      { id: 'ui2', title: 'The Language of Insurance: Unlocking the Code', type: 'lesson', state: 'locked', xp: 7 },
      { id: 'ui3', title: "Leveling Up: Types of Insurance You'll Actually Need", type: 'lesson', state: 'locked', xp: 7 },
      { id: 'ui4', title: 'Choosing Your Shield: How to Pick a Policy', type: 'lesson', state: 'locked', xp: 5 },
      { id: 'uip1', title: 'Practice: Scenario Simulator', type: 'practice', state: 'locked', xp: 15 },
      { id: 'uiq1', title: 'Insurance Unit Quiz', type: 'quiz', state: 'locked', xp: 25 },
    ],
  },
];

// This logic is now handled dynamically in the LearnPage component based on user progress.
export const units: Unit[] = rawUnitsData;
