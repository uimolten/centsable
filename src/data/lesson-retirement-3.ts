
import type { Lesson } from '@/types/lesson';

export const lessonRetirement3: Lesson = {
  id: 'r3',
  title: 'Choosing Your Treasure Chest: Roth IRAs & 401(k)s',
  modules: [
    {
      title: 'Choosing Your Treasure Chest',
      xp: 8,
      steps: [
        {
          type: 'intro',
          text: 'New Quest: Choosing Your Treasure Chest! To use the magic of compounding, you need a special place to keep your investments. These have tax superpowers!',
        },
        {
          type: 'concept',
          text: "The first is a Roth IRA. Think of it as a treasure chest where all the money it earns is 100% tax-free when you take it out later. The government can't touch your earnings! 🤯",
        },
        {
          type: 'multiple-choice',
          question: 'What is the superpower of a Roth IRA?',
          options: [
            { id: 'opt1', text: 'Grows faster' },
            { id: 'opt2', text: 'Tax-free growth' },
            { id: 'opt3', text: "It's free money" },
          ],
          correctAnswer: 'opt2',
          reinforcement: "Correct! That's a huge advantage.",
        },
        {
          type: 'concept',
          text: "The second is a 401(k). This is an investment account you get through a job. Its superpower is the 'employer match'.",
        },
        {
          type: 'concept',
          text: "An 'employer match' is literally free money. If you put in $50, your company might put in another $50 to match it. You just doubled your money instantly!",
        },
        {
          type: 'multiple-choice',
          question: 'What is the special superpower of a 401(k)?',
          options: [
            { id: 'opt1', text: "It's risk-free" },
            { id: 'opt2', text: 'The employer match' },
            { id: 'opt3', text: 'It\'s managed by the government' },
          ],
          correctAnswer: 'opt2',
          reinforcement: 'Always take the free money! 💰',
        },
        {
          type: 'complete',
          title: 'QUEST COMPLETE!',
          text: 'You know where to store your treasure.',
          rewards: {
            xp: 8,
            coins: 0,
          },
        },
      ],
    },
  ],
};
