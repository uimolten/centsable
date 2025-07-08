
import type { Lesson } from '@/types/lesson';

export const lessonSaving4: Lesson = {
  id: 's4',
  title: 'Savings Unit Quiz',
  modules: [
    {
      title: 'Final Challenge',
      xp: 100,
      steps: [
        {
          type: 'intro',
          text: "THE FINAL CHALLENGE! 👑 Time to test your knowledge of the Savings Unit. Let's do this!",
        },
        {
          type: 'multiple-choice',
          question: 'Saving money means...',
          options: [
            { id: 'opt1', text: 'Spending it on wants' },
            { id: 'opt2', text: 'Putting it aside for the future' },
            { id: 'opt3', text: 'Forgetting about it' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'tap-the-pairs',
          instructions: 'Match the term to its definition.',
          pairs: [
            { term: 'Need', definition: 'Something you must have' },
            { term: 'Want', definition: 'Something fun to have' },
          ],
        },
        {
          type: 'fill-in-the-blank',
          question: "The 'T' in SMART goals stands for ____________.",
          correctAnswer: 'Time-bound',
          reinforcement: 'Time-bound is correct!',
        },
        {
          type: 'multiple-choice',
          question: 'Which of these goals is the most Specific?',
          options: [
            { id: 'opt1', text: 'Save for a vacation.' },
            { id: 'opt2', text: 'Save for a trip to Japan.' },
            { id: 'opt3', text: 'Save $3,000 for a 10-day trip to Japan next summer.' },
          ],
          correctAnswer: 'opt3',
        },
        {
          type: 'multiple-choice',
          question: 'True or False: A goal is Achievable even if you have no way to get the money for it.',
          options: [
            { id: 'true', text: 'True' },
            { id: 'false', text: 'False' },
          ],
          correctAnswer: 'false',
        },
        {
          type: 'multiple-choice',
          question: "Maria wants to save $50 for new shoes, but she hasn't set a deadline. Which SMART element is missing?",
          options: [
            { id: 's', text: 'Specific (S)' },
            { id: 'm', text: 'Measurable (M)' },
            { id: 't', text: 'Time-bound (T)' },
          ],
          correctAnswer: 't',
        },
        {
          type: 'multiple-choice',
          question: 'You have $15. Which of these is a Need?',
          options: [
            { id: 'game', image: 'https://placehold.co/200x200', imageHint: 'video game icon', text: 'Video Game' },
            { id: 'bus', image: 'https://placehold.co/200x200', imageHint: 'bus pass icon', text: 'Bus Pass' },
            { id: 'coffee', image: 'https://placehold.co/200x200', imageHint: 'coffee cup icon', text: 'Fancy Coffee' },
          ],
          correctAnswer: 'bus',
        },
        {
          type: 'multiple-choice',
          question: 'What is the main reason to set a financial goal?',
          options: [
            { id: 'opt1', text: 'To impress your friends.' },
            { id: 'opt2', text: 'To give your money a mission and motivation.' },
            { id: 'opt3', text: 'To have less money to spend.' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'complete',
          title: 'UNIT COMPLETE!',
          text: "You're officially a Savings Master! 🏆",
          rewards: {
            xp: 100,
            coins: 25,
          },
        },
      ],
    },
  ],
};
