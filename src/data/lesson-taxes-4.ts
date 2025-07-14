
import type { Lesson } from '@/types/lesson';

export const lessonTaxes4: Lesson = {
  id: 't4',
  title: 'Tax Credits, Deductions & Refunds',
  modules: [
    {
      title: 'Saving Money on Taxes',
      xp: 7,
      steps: [
        {
          type: 'intro',
          text: "Let's learn about two powerful ways to lower your tax bill: Credits and Deductions.",
        },
        {
          type: 'multiple-choice',
          question: 'Which do you think saves you more money: a $1,000 deduction or a $1,000 credit?',
          options: [
            { id: 'opt1', text: '$1,000 deduction' },
            { id: 'opt2', text: '$1,000 credit' },
            { id: 'opt3', text: "They're the same" },
          ],
          correctAnswer: 'opt2',
          reinforcement: "Correct! A credit is a dollar-for-dollar reduction of your tax bill.",
        },
        {
          type: 'concept',
          text: "A <b>Tax Deduction</b> lowers your taxable income. If you're in a 10% tax bracket, a $1,000 deduction saves you $100. A <b>Tax Credit</b> directly reduces the tax you owe. A $1,000 credit saves you $1,000. Credits are more powerful!",
        },
        {
          type: 'tap-the-pairs',
          instructions: 'Match the term to its effect.',
          pairs: [
            { term: 'Tax Credit', definition: 'Directly reduces your tax bill.' },
            { term: 'Tax Deduction', definition: 'Lowers your taxable income.' },
            { term: 'Refund', definition: 'Money you get back if you overpaid.' },
          ],
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You've learned how to save money on your taxes. That's a valuable skill!",
          rewards: {
            xp: 7,
            coins: 5,
          },
        },
      ],
    },
  ],
};
