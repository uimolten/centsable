
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting3: Lesson = {
  id: 'b3',
  title: 'Building Your Game Plan: How to Create a Budget',
  modules: [
    {
      title: 'Build Your Game Plan',
      xp: 7,
      steps: [
        {
          type: 'intro',
          text: "New Quest: Build Your Game Plan! You've tracked your spending and learned the 50/30/20 rule. Now, let's create your first budget.",
        },
        {
          type: 'concept',
          text: "<b>Step 1:</b> Calculate your monthly income. This is any money you get from jobs, allowance, or side hustles.",
        },
        {
          type: 'scenario',
          text: 'You earn <b>$100</b> from a part-time job and get <b>$40</b> for allowance.',
        },
        {
          type: 'fill-in-the-blank',
          question: 'What is your total monthly income? $______',
          correctAnswer: '140',
          reinforcement: "Great! That's the number we'll work with.",
        },
        {
          type: 'concept',
          text: "<b>Step 2:</b> Plan your spending using the 50/30/20 rule as your guide.",
        },
        {
          type: 'concept',
          text: "For an income of $140:<br><b>50% Needs</b> = $70<br><b>30% Wants</b> = $42<br><b>20% Savings</b> = $28",
        },
        {
          type: 'concept',
          text: "<b>Step 3:</b> As you spend money during the month, track it against your plan. Did you stay under your 'Wants' limit? Awesome!",
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
            xp: 7,
            coins: 10,
          },
        },
      ],
    },
  ],
};
