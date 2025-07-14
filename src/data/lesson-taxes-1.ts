
import type { Lesson } from '@/types/lesson';

export const lessonTaxes1: Lesson = {
  id: 't1',
  title: 'Taxes 101: What They Are & Why We Have Them',
  modules: [
    {
      title: 'The Case of the Shrinking Paycheck',
      xp: 4,
      steps: [
        {
          type: 'intro',
          text: "You land your first job, promised a wage of $15/hour. You work 10 hours, expecting to earn $150...",
        },
        {
          type: 'multiple-choice',
          question: "But when you get your first paycheck, it's only for $128. What happened to the other $22?",
          options: [
            { id: 'opt1', text: 'Your boss made a mistake.' },
            { id: 'opt2', text: 'Some of it went to a required savings plan.' },
            { id: 'opt3', text: 'The government took a portion for taxes.' },
          ],
          correctAnswer: 'opt3',
          reinforcement: "That's right. That missing money wasn't a mistake—it was taxes! But where does it actually go? Let’s find out.",
        },
        {
          type: 'concept',
          text: "Taxes are required payments you make to federal, state, and local governments. Think of it as crowdfunding for our country. This collective money, called <b>revenue</b>, is used to pay for shared services that benefit everyone.",
        },
        {
          type: 'concept',
          text: "Click on the different elements in your town to see what taxes help fund!",
          image: "https://placehold.co/400x225",
          imageHint: 'town services collage',
        },
      ],
    },
    {
      title: 'Core Tax Terms',
      xp: 4,
      steps: [
        {
          type: 'tap-the-pairs',
          instructions: 'Match the term to its definition.',
          pairs: [
            { term: 'Tax', definition: 'A required payment to a government.' },
            { term: 'Revenue', definition: 'The total income a government collects from taxes.' },
            { term: 'IRS', definition: 'The U.S. federal agency that collects taxes.' },
          ],
        },
        {
          type: 'interactive-sort',
          instructions: 'There are four main types of taxes you\'ll encounter. Match the tax type to its description.',
          box1Label: 'Tax Type',
          box2Label: 'What It Is',
          items: [
            { id: 'item-1', text: 'Income Tax', correctBox: 'box1' },
            { id: 'item-2', text: 'A tax on money you earn (paychecks, tips).', correctBox: 'box2' },
            { id: 'item-3', text: 'Sales Tax', correctBox: 'box1' },
            { id: 'item-4', text: 'A tax added to the price of things you buy.', correctBox: 'box2' },
            { id: 'item-5', text: 'Payroll Taxes', correctBox: 'box1' },
            { id: 'item-6', text: 'Tax withheld to fund Social Security & Medicare.', correctBox: 'box2' },
            { id: 'item-7', text: 'Property Tax', correctBox: 'box1' },
            { id: 'item-8', text: 'A tax paid by people who own land or buildings.', correctBox: 'box2' },
          ],
        },
        {
            type: 'goal-builder',
            instructions: 'Now that you know the four main types, which two do you think will affect you the most in the next five years? Explain why.',
            inputType: 'text',
            placeholder: 'e.g., Sales tax because I buy stuff, and income tax when I get a job.',
            storageKey: 'taxImpactReflection',
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You've learned the 'why' behind taxes. You're ready for the next step!",
          rewards: {
            xp: 8,
            coins: 10,
          },
        },
      ],
    },
  ],
};
