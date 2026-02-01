
import type { Lesson } from '@/types/lesson';

export const lessonSaving4: Lesson = {
  id: 's4',
  title: 'Savings Unit Quiz',
  modules: [
    {
      title: 'Final Challenge',
      xp: 25,
      steps: [
        {
          type: 'intro',
          text: "<b>THE FINAL CHALLENGE!</b> 👑 Time to test your knowledge of the Savings Unit. Let's do this!",
        },
        {
          type: 'multiple-choice',
          question: 'Saving money means...',
          options: [
            { id: 'opt1', text: 'Spending it on wants' },
            { id: 'opt2', text: 'Putting it aside for the future' },
            { id: 'opt3', text: 'Forgetting about it' },
            { id: 'opt4', text: 'Giving it all away' },
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
          question: "The 'T' in <b>SMART</b> goals stands for ____________.",
          correctAnswer: 'Time-bound',
          reinforcement: 'Time-bound is correct!',
        },
        {
          type: 'multiple-choice',
          question: 'Which of these goals is the most <b>Specific</b>?',
          options: [
            { id: 'opt1', text: 'Save for a vacation.' },
            { id: 'opt2', text: 'Save for a trip to Japan.' },
            { id: 'opt3', text: 'Save $3,000 for a 10-day trip to Japan next summer.' },
            { id: 'opt4', text: 'I want to travel.' },
          ],
          correctAnswer: 'opt3',
        },
        {
          type: 'multiple-choice',
          question: 'True or False: A goal is <b>Achievable</b> even if you have no way to get the money for it.',
          options: [
            { id: 'true', text: 'True' },
            { id: 'false', text: 'False' },
          ],
          correctAnswer: 'false',
        },
        {
          type: 'multiple-choice',
          question: "Maria wants to save <b>$50</b> for new shoes, but she hasn't set a deadline. Which SMART element is missing?",
          options: [
            { id: 's', text: 'Specific (S)' },
            { id: 'm', text: 'Measurable (M)' },
            { id: 'a', text: 'Achievable (A)' },
            { id: 't', text: 'Time-bound (T)' },
          ],
          correctAnswer: 't',
        },
        {
          type: 'multiple-choice',
          question: 'You have <b>$15</b>. Which of these is a <b>Need</b>?',
          options: [
            { id: 'game', image: '/images/video-game.webp', imageHint: 'video game icon', text: 'Video Game' },
            { id: 'bus', image: '/images/bus-pass.webp', imageHint: 'bus pass icon', text: 'Bus Pass' },
            { id: 'coffee', image: '/images/fancy-coffee.webp', imageHint: 'coffee cup icon', text: 'Fancy Coffee' },
            { id: 'backpack', image: '/images/backpack.webp', imageHint: 'school backpack', text: 'A new backpack' },
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
            { id: 'opt4', text: 'To follow a trend.' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'complete',
          title: 'UNIT COMPLETE!',
          text: "You're officially a Savings Master! 🏆",
          rewards: {
            xp: 25,
            coins: 10,
          },
        },
      ],
    },
  ],
};
