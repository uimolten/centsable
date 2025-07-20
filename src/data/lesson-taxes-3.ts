
import type { Lesson } from '@/types/lesson';

export const lessonTaxes3: Lesson = {
  id: 't3',
  title: 'How to File Your Taxes',
  modules: [
    {
      title: 'Tax Season Explained',
      xp: 5,
      steps: [
        {
          type: 'intro',
          text: "So your employer withholds taxes all year. But how does the government know if it was the right amount? That's where filing your taxes comes in.",
        },
        {
          type: 'multiple-choice',
          question: 'Your friend brags about getting a <b>$500</b> tax refund. What does this actually mean?',
          options: [
            { id: 'opt1', text: 'They earned an extra $500 from the government.' },
            { id: 'opt2', text: 'It was a lottery prize for filing taxes.' },
            { id: 'opt3', text: 'They overpaid their taxes during the year, and the IRS is returning their own money.' },
            { id: 'opt4', text: 'Their boss gave them a bonus.' },
          ],
          correctAnswer: 'opt3',
        },
        {
          type: 'concept',
          text: "Filing taxes is like settling up your tab with the government. You compare what you <b>SHOULD</b> have paid with what you <b>DID</b> pay through withholding.",
        },
        {
          type: 'concept',
          text: "If <b>Taxes Withheld > Final Tax Bill</b>, you get a <b>Tax Refund</b>. 💵 <br> If <b>Taxes Withheld < Final Tax Bill</b>, you have <b>Taxes Owed</b>. 💸",
        },
        {
          type: 'concept',
          text: "Let's look at the key forms in the tax timeline.",
          image: "https://placehold.co/400x225",
          imageHint: 'tax timeline calendar',
        },
      ],
    },
    {
      title: 'Key Tax Forms',
      xp: 5,
      steps: [
        {
          type: 'interactive-sort',
          instructions: 'Match the tax form to its purpose.',
          box1Label: 'Form Name',
          box2Label: 'Its Purpose',
          items: [
            { id: 'item-1', text: 'Form W-4', correctBox: 'box1' },
            { id: 'item-2', text: 'You fill this out when you start a job to determine withholding.', correctBox: 'box2' },
            { id: 'item-3',text: 'Form W-2', correctBox: 'box1' },
            { id: 'item-4', text: 'Your employer sends this to you. It summarizes your earnings.', correctBox: 'box2' },
            { id: 'item-5', text: 'Form 1040', correctBox: 'box1' },
            { id: 'item-6', text: 'This is the main form you use to file your actual tax return.', correctBox: 'box2' },
            { id: 'item-7', text: 'Form 1099-NEC', correctBox: 'box1' },
            { id: 'item-8', text: 'You receive this for freelance or contract work.', correctBox: 'box2' },
          ],
        },
        {
          type: 'multiple-choice',
          question: 'In most years, what is the deadline to file your taxes?',
          options: [
            { id: 'opt1', text: 'January 1st' },
            { id: 'opt2', text: 'April 15th' },
            { id: 'opt3', text: 'December 31st' },
            { id: 'opt4', text: 'July 4th' },
          ],
          correctAnswer: 'opt2',
          reinforcement: "That's right! Tax Day is famously on or around April 15th.",
        },
        {
            type: 'goal-builder',
            instructions: 'Why is it important to keep your <b>W-2</b> form in a safe place, even after you’ve filed your taxes?',
            inputType: 'text',
            placeholder: 'e.g., As proof of income or in case of an audit.',
            storageKey: 'w2Importance',
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: 'You understand the basics of filing taxes. Amazing!',
          rewards: {
            xp: 10,
            coins: 0,
          },
        },
      ],
    },
  ],
};
