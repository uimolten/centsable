
import type { Lesson } from '@/types/lesson';

export const lessonTaxes2: Lesson = {
  id: 't2',
  title: 'Understanding Paychecks & Withholding',
  modules: [
    {
      title: 'Pay Stub Mystery',
      xp: 8,
      steps: [
        {
          type: 'intro',
          text: "You’re paid $500 but your check says $430. Why? Let's solve the pay stub mystery.",
        },
        {
          type: 'concept',
          text: "The difference is because taxes were withheld before you even saw your money. This is called **tax withholding**.",
        },
        {
          type: 'concept',
          text: "Let's define two key terms. <b>Gross Income</b> is your total pay before any taxes are taken out. <b>Net Income</b> is your take-home pay after taxes are deducted.",
        },
        {
          type: 'tap-the-pairs',
          instructions: 'Match the term to its definition!',
          pairs: [
            { term: 'Gross Income', definition: 'Total pay before taxes' },
            { term: 'Net Income', definition: 'Take-home pay after taxes' },
            { term: 'Withholding', definition: 'Taxes taken out by an employer' },
          ],
        },
        {
          type: 'concept',
          text: "Let's look at a sample pay stub. You'll see sections for Earnings, Deductions (federal tax, state tax, payroll taxes), and your final Net Pay.",
          image: "https://placehold.co/400x225",
          imageHint: 'paycheck stub'
        },
        {
            type: 'goal-builder',
            instructions: 'Why do you think taxes are taken out automatically instead of leaving it up to you?',
            inputType: 'text',
            placeholder: 'e.g., To make sure they get paid',
            storageKey: 'withholdingReason',
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You've cracked the code of your paycheck!",
          rewards: {
            xp: 8,
            coins: 5,
          },
        },
      ],
    },
  ],
};
