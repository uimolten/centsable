
import type { Lesson } from '@/types/lesson';

export const lessonTaxes3: Lesson = {
  id: 't3',
  title: 'Filing Taxes',
  modules: [
    {
      title: 'Why File?',
      xp: 10,
      steps: [
        {
          type: 'intro',
          text: "Let's talk about actually *filing* your taxes. Have you or your parents ever seen a W-2 or 1040 form?",
        },
        {
          type: 'concept',
          text: "You file taxes to report your income to the government and figure out if you paid the right amount. If too much was withheld, you get a **REFUND**! If too little was withheld, you owe more.",
        },
        {
          type: 'multiple-choice',
          question: 'If you get a tax refund, it means...',
          options: [
            { id: 'opt1', text: 'You got free money from the government.' },
            { id: 'opt2', text: 'You paid too much in taxes during the year.' },
            { id: 'opt3', text: 'You didn\'t pay enough taxes.' },
            { id: 'opt4', text: 'You won the tax lottery.' },
          ],
          correctAnswer: 'opt2',
          reinforcement: "Correct! It's your own money being returned to you.",
        },
        {
          type: 'concept',
          text: "There are a few key forms you'll encounter when you start working.",
        },
        {
          type: 'interactive-sort',
          instructions: 'Match the tax form to its purpose.',
          box1Label: 'Form',
          box2Label: 'Purpose',
          items: [
            { id: 'item-1', text: 'W-4', correctBox: 'box1' },
            { id: 'item-2', text: 'Tells your employer how much to withhold', correctBox: 'box2' },
            { id: 'item-3', text: 'W-2', correctBox: 'box1' },
            { id: 'item-4', text: 'Summary of earnings & taxes withheld from one job', correctBox: 'box2' },
            { id: 'item-5', text: '1040', correctBox: 'box1' },
            { id: 'item-6', text: 'The main tax return form to file with the IRS', correctBox: 'box2' },
          ],
        },
        {
            type: 'goal-builder',
            instructions: 'Would you rather get a big refund or break even at tax time? Why?',
            inputType: 'text',
            placeholder: 'e.g., A big refund feels like a bonus!',
            storageKey: 'refundPreference',
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: 'You understand the basics of filing taxes. Amazing!',
          rewards: {
            xp: 10,
            coins: 10,
          },
        },
      ],
    },
  ],
};
