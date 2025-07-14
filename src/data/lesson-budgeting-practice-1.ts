
import type { Lesson } from '@/types/lesson';

export const lessonBudgetingPractice1: Lesson = {
  id: 'bp1',
  title: 'Practice: Tracking Your Money',
  modules: [
    {
      title: 'Practice Dojo',
      xp: 15,
      steps: [
        {
          type: 'intro',
          text: "Welcome to the practice dojo! 🥋 Let's drill the basics of tracking your money.",
        },
        {
          type: 'multiple-choice',
          question: "Money you get from your part-time job is an example of...",
          options: [
            { id: 'opt1', text: 'An expense' },
            { id: 'opt2', text: 'A need' },
            { id: 'opt3', text: 'Income' },
            { id: 'opt4', text: 'A want' },
          ],
          correctAnswer: 'opt3',
          reinforcement: 'Correct! Income is any money coming in.',
        },
        {
          type: 'multiple-choice',
          question: "Your monthly phone bill is a...",
          options: [
            { id: 'opt1', text: 'Fixed Expense' },
            { id: 'opt2', text: 'Variable Expense' },
            { id: 'opt3', text: 'Spending Leak' },
            { id: 'opt4', text: 'Want' },
          ],
          correctAnswer: 'opt1',
          reinforcement: 'You got it! It stays the same every month.',
        },
        {
          type: 'interactive-sort',
          instructions: 'Sort these common teen expenses.',
          box1Label: 'Needs',
          box2Label: 'Wants',
          items: [
            { id: 'item-1', text: 'Weekly groceries', correctBox: 'box1' },
            { id: 'item-2', text: 'Spotify Premium', correctBox: 'box2' },
            { id: 'item-3', text: 'Gas for the car to get to school', correctBox: 'box1' },
            { id: 'item-4', text: 'Going to the movies', correctBox: 'box2' },
          ],
        },
        {
          type: 'scenario',
          text: 'You buy a <b>$4</b> energy drink three times a week. How much is this "spending leak" costing you per month (assuming 4 weeks)?'
        },
        {
          type: 'fill-in-the-blank',
          question: 'Your weekly cost is <b>$12</b>. Your monthly cost is $______.',
          correctAnswer: '48',
          reinforcement: "Exactly! Small leaks can drain your wallet fast.",
        },
        {
          type: 'complete',
          title: 'PRACTICE COMPLETE!',
          text: 'Your money tracking skills are sharp. Well done!',
          rewards: {
            xp: 15,
            coins: 5,
          },
        },
      ],
    },
  ],
};
