
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
        },
        {
          type: 'scenario',
        },
        {
          type: 'fill-in-the-blank',
          question: 'Total monthly income: $______',
          correctAnswer: '140',
          reinforcement: "Great! That's the number we'll work with.",
        },
        {
          type: 'concept',
        },
        {
          type: 'concept',
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
