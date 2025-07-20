
import type { Lesson } from '@/types/lesson';

export const lessonTaxesQuiz: Lesson = {
  id: 'tq1',
  title: 'Taxes Unit Quiz',
  modules: [
    {
      title: 'Final Challenge',
      xp: 25,
      steps: [
        {
          type: 'intro',
          text: "<b>THE FINAL CHALLENGE!</b> 👑 You've learned why taxes matter, how they're paid, and how they'll affect your future. Time to test your mastery!",
        },
        {
          type: 'multiple-choice',
          question: 'What is the primary reason we pay taxes?',
          options: [
            { id: 'opt1', text: 'To give the government extra money.' },
            { id: 'opt2', text: 'To fund public services like schools and roads.' },
            { id: 'opt3', text: 'To make products more expensive.' },
            { id: 'opt4', text: 'To get a refund every year.' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'multiple-choice',
          question: 'Your take-home pay after taxes have been taken out is called...',
          options: [
            { id: 'opt1', text: 'Gross Income' },
            { id: 'opt2', text: 'Revenue' },
            { id: 'opt3', text: 'Net Income' },
            { id: 'opt4', text: 'A Deduction' },
          ],
          correctAnswer: 'opt3',
        },
        {
          type: 'multiple-choice',
          question: "Which form tells your employer how much tax to withhold from your paycheck?",
          options: [
            { id: 'opt1', text: 'W-2' },
            { id: 'opt2', text: '1040' },
            { id: 'opt3', text: 'W-4' },
            { id: 'opt4', text: '1099' },
          ],
          correctAnswer: 'opt3',
        },
        {
          type: 'fill-in-the-blank',
          question: "A ________ directly reduces the amount of tax you owe, dollar-for-dollar.",
          correctAnswer: 'credit',
        },
        {
          type: 'multiple-choice',
          question: "If you work for yourself as a freelancer, you are responsible for paying...",
          options: [
            { id: 'opt1', text: 'Sales Tax' },
            { id: 'opt2', text: 'Property Tax' },
            { id: 'opt3', text: 'Self-Employment Tax' },
            { id: 'opt4', text: 'No taxes at all' },
          ],
          correctAnswer: 'opt3',
        },
        {
          type: 'tap-the-pairs',
          instructions: 'Match the tax term to its definition.',
          pairs: [
            { term: 'Tax Refund', definition: 'Money returned to you if you overpaid taxes.' },
            { term: 'Revenue', definition: 'The total income a government collects.' },
            { term: 'Tax Deduction', definition: 'Lowers your total taxable income.' },
            { term: 'W-2', definition: 'An annual summary of your earnings from one job.' },
          ],
        },
        {
          type: 'complete',
          title: 'TAXES UNIT COMPLETE!',
          text: "You're officially a Taxes Master! 🏆 You have the knowledge to navigate your financial future.",
          rewards: {
            xp: 25,
            coins: 10,
          },
        },
      ],
    },
  ],
};
