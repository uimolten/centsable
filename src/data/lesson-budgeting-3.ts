
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting3: Lesson = {
  id: 'b3',
  title: 'Building Your Game Plan: How to Create a Budget',
  modules: [
    {
      title: 'Build Your Game Plan',
      xp: 70,
      steps: [
        {
          type: 'intro',
          text: "New Quest: Build Your Game Plan! You've tracked your spending and learned the 50/30/20 rule. Now, let's create your first budget.",
        },
        {
          type: 'concept',
          text: "Step 1: Calculate your monthly income. This is any money you get from jobs, allowance, or side hustles.",
        },
        {
          type: 'scenario',
          text: "You earn $100 from a part-time job and get $40 for allowance. What's your total monthly income?",
        },
        {
          type: 'fill-in-the-blank',
          question: 'Total monthly income: $______',
          correctAnswer: '140',
          reinforcement: "Great! That's the number we'll work with.",
        },
        {
          type: 'concept',
          text: "Step 2: Plan your spending using the 50/30/20 rule as your guide. With an income of $140, your plan is: <br> • 50% Needs = $70 <br> • 30% Wants = $42 <br> • 20% Savings = $28",
        },
        {
          type: 'concept',
          text: "Step 3: As you spend money during the month, track it against your plan. Did you stay under your 'Wants' limit? Awesome!",
        },
        {
          type: 'multiple-choice',
          question: "What's the final step of budgeting?",
          options: [
            { id: 'opt1', text: 'Set it and forget it' },
            { id: 'opt2', text: 'Track your spending against your plan' },
            { id: 'opt3', text: 'Spend all your money' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'complete',
          title: 'QUEST COMPLETE!',
          text: "You now have a powerful game plan for your money.",
          rewards: {
            xp: 70,
            coins: 10,
          },
        },
      ],
    },
  ],
};
