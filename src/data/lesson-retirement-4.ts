
import type { Lesson } from '@/types/lesson';

export const lessonRetirement4: Lesson = {
  id: 'r4',
  title: 'Starting the Quest: Your First Step to Freedom',
  modules: [
    {
      title: 'Starting Your Adventure',
      xp: 8,
      steps: [
        {
          type: 'intro',
          text: "Final Quest: Starting Your Adventure! Knowledge is great, but action is better. Here's the first real step you can take on your path to Financial Freedom.",
        },
        {
          type: 'concept',
          text: "The easiest way to start as a teen is to open a Custodial Roth IRA. This is an account in your name that a parent or guardian helps you manage.",
        },
        {
          type: 'multiple-choice',
          question: 'What do you need to start? (Select all that apply)',
          options: [
            { id: 'opt1', text: '1. Talk to a trusted adult.' },
            { id: 'opt2', text: '2. Find a brokerage that offers custodial accounts.' },
            { id: 'opt3', text: '3. Contribute a small amount of money (even $20!).' },
            { id: 'opt4', text: '4. Be 18 years old.' },
          ],
          correctAnswer: ['opt1', 'opt2', 'opt3'],
        },
        {
          type: 'concept',
          text: 'The most powerful move? Set up automatic contributions. Even just $5 a week adds up incredibly fast over time thanks to compounding!',
        },
        {
          type: 'concept',
          text: "That's it! By taking these small steps now, you're giving your 'Future You' an incredible head start. You've completed the Financial Freedom questline! 🚀",
        },
        {
          type: 'complete',
          title: 'UNIT COMPLETE!',
          text: 'Your path to Financial Freedom has begun!',
          rewards: {
            xp: 8,
            coins: 0,
          },
        },
      ],
    },
  ],
};
