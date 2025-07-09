
import type { Lesson } from '@/types/lesson';

export const lessonBudgetingPractice1: Lesson = {
  id: 'bp1',
  title: 'Practice: The 50/30/20 Rule',
  modules: [
    {
      title: 'Practice Dojo',
      xp: 40,
      steps: [
        {
          type: 'intro',
          text: "Welcome to the practice dojo! 🥋 Let's drill the 50/30/20 rule until it's second nature.",
        },
        {
          type: 'multiple-choice',
          question: "You get a job that pays <b>$1,000</b> a month. Using the 50/30/20 rule, how much should go to your <b>Needs</b>?",
          options: [
            { id: 'opt1', text: '$200' },
            { id: 'opt2', text: '$300' },
            { id: 'opt3', text: '$500' },
            { id: 'opt4', text: '$1000' },
          ],
          correctAnswer: 'opt3',
          reinforcement: 'Correct! 50% of $1,000 is $500.',
        },
        {
            type: 'multiple-choice',
            question: "From that same <b>$1,000</b> paycheck, how much is your budget for <b>Wants</b>?",
            options: [
              { id: 'opt1', text: '$200' },
              { id: 'opt2', text: '$300' },
              { id: 'opt3', text: '$500' },
              { id: 'opt4', text: '$100' },
            ],
            correctAnswer: 'opt2',
            reinforcement: 'You got it! 30% of $1,000 is $300.',
        },
        {
          type: 'interactive-sort',
          instructions: 'Sort these expenses into the correct budget category.',
          box1Label: 'Needs',
          box2Label: 'Wants',
          items: [
            { id: 'item-1', text: 'Weekly groceries', correctBox: 'box1' },
            { id: 'item-2', text: 'Spotify Premium', correctBox: 'box2' },
            { id: 'item-3', text: 'Your share of the phone bill', correctBox: 'box1' },
            { id: 'item-4', text: 'Going to the movies', correctBox: 'box2' },
            { id: 'item-5', text: 'Gas for the car to get to school', correctBox: 'box1' },
            { id: 'item-6', text: 'New shoes you saw at the mall', correctBox: 'box2' },
          ],
        },
        {
          type: 'complete',
          title: 'PRACTICE COMPLETE!',
          text: 'Your 50/30/20 skills are sharp. Well done!',
          rewards: {
            xp: 40,
            coins: 5,
          },
        },
      ],
    },
  ],
};
