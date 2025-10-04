
import type { Lesson } from '@/types/lesson';

export const lessonTaxes5: Lesson = {
  id: 't5',
  title: 'Taxes & Your Future',
  modules: [
    {
      title: 'Future Taxpayer',
      xp: 8,
      steps: [
        {
          type: 'intro',
          text: "Let's look into the future and see how taxes will be part of your life's biggest milestones.",
        },
        {
          type: 'multiple-choice',
          question: 'Which of these future situations would involve taxes?',
          options: [
            { id: 'opt1', text: 'Starting a freelance business' },
            { id: 'opt2', text: 'Buying a house' },
            { id: 'opt3', text: 'Investing in the stock market' },
            { id: 'opt4', text: 'All of the above' },
          ],
          correctAnswer: 'opt4',
          reinforcement: "Correct! Taxes are a part of almost every big financial step.",
        },
        {
          type: 'concept',
          text: "If you're a freelancer or gig worker (like for DoorDash or Uber), you don't have taxes withheld. You have to pay them yourself! This is called <b>self-employment tax</b>.",
        },
        {
          type: 'concept',
          text: "It's also super important to keep good records of your financial documents, like W-2s and receipts for deductions. This makes tax time much easier and can save you from big surprises.",
          image: "https://picsum.photos/seed/filecabinet/400/225",
          imageHint: 'file cabinet organization'
        },
        {
            type: 'goal-builder',
            instructions: 'What’s one future goal where taxes might play a big role?',
            inputType: 'text',
            placeholder: 'e.g., Buying my first home',
            storageKey: 'futureTaxGoal',
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You're prepared for the future. You're ready for the final quiz!",
          rewards: {
            xp: 8,
            coins: 0,
          },
        },
      ],
    },
  ],
};
