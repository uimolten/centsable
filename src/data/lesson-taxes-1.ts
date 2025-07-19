
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
          text: "You land your first job, promised a wage of <b>$15</b>/hour. You work <b>10</b> hours, expecting to earn <b>$150</b>...",
        },
        {
          type: 'multiple-choice',
          question: "But when you get your first paycheck, it's only for <b>$128</b>. What happened to the other <b>$22</b>?",
          options: [
            { id: 'opt1', text: 'Your boss made a mistake.' },
            { id: 'opt2', text: 'Some of it went to a required savings plan.' },
            { id: 'opt3', text: 'The government took a portion for taxes.' },
            { id: 'opt4', text: 'It was a fee for setting up payroll.' },
          ],
          correctAnswer: 'opt3',
          reinforcement: "That's right. That missing money wasn't a mistake—it was taxes! But where does it actually go? Let’s find out.",
        },
        {
          type: 'concept',
          text: "<b>Taxes</b> are required payments you make to federal, state, and local governments. Think of it as crowdfunding for our country. This collective money, called <b>revenue</b>, is used to pay for shared services that benefit everyone.",
        },
        {
          type: 'interactive-town',
          items: [
            { id: 'school', icon: 'school', tooltip: 'Taxes help fund public schools, teachers, and resources.', position: { top: '30%', left: '25%' } },
            { id: 'road', icon: 'road', tooltip: 'Taxes pay for building and maintaining roads and bridges.', position: { top: '75%', left: '50%' } },
            { id: 'police', icon: 'police', tooltip: 'Taxes support local police and fire departments to keep us safe.', position: { top: '55%', left: '70%' } },
            { id: 'hospital', icon: 'hospital', tooltip: 'Taxes fund public hospitals and healthcare programs like Medicare.', position: { top: '20%', left: '65%' } },
            { id: 'jet', icon: 'jet', tooltip: 'A large portion of federal taxes goes to national defense and the military.', position: { top: '10%', left: '10%' } },
          ]
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
            { term: 'Progressive Tax', definition: 'A system where higher incomes are taxed at higher rates.' },
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
            { id: 'item-5', text: 'Payroll Taxes (FICA)', correctBox: 'box1' },
            { id: 'item-6', text: 'Tax for Social Security & Medicare.', correctBox: 'box2' },
            { id: 'item-7', text: 'Property Tax', correctBox: 'box1' },
            { id: 'item-8', text: 'A tax paid by people who own land or buildings.', correctBox: 'box2' },
          ],
        },
        {
            type: 'goal-builder',
            instructions: 'Now that you know the <b>four</b> main types, which <b>two</b> do you think will affect you the most in the next <b>five</b> years? Explain your reasoning.',
            inputType: 'text',
            placeholder: 'e.g., Sales tax because I buy stuff...',
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
