
import type { Lesson } from '@/types/lesson';

export const lessonInsurance1: Lesson = {
  id: 'ui1',
  title: 'What is Insurance & Why Bother?',
  modules: [
    {
      title: 'Financial Protection',
      xp: 5,
      steps: [
        {
          type: 'intro',
          text: "New Quest Line: Financial Protection! Life has random, unlucky events. Insurance is the shield you use to protect your money from them. 🛡️",
        },
        {
          type: 'concept',
          text: "Insurance is a promise: You pay a small amount of money regularly, and in exchange, a company agrees to cover the cost of a really big, unexpected expense.",
        },
        {
          type: 'tap-the-pairs',
          instructions: 'Match the action to the meaning!',
          pairs: [
            { term: 'Your Payment', definition: 'A small, regular fee' },
            { term: "Company's Promise", definition: 'Covers a big, unexpected cost' },
          ],
        },
        {
          type: 'fill-in-the-blank',
          question: 'The whole point of insurance is to protect you from a major financial _____.',
          correctAnswer: 'loss/hit',
          reinforcement: "Exactly! It's your safety net.",
        },
        {
          type: 'complete',
          title: 'QUEST COMPLETE!',
          text: "You've learned the basics of financial protection.",
          rewards: {
            xp: 5,
            coins: 0,
          },
        },
      ],
    },
  ],
};
