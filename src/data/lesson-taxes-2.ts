
import type { Lesson } from '@/types/lesson';

export const lessonTaxes2: Lesson = {
  id: 't2',
  title: 'Decoding Your Paycheck',
  modules: [
    {
      title: 'Gross vs. Net Income',
      xp: 4,
      steps: [
        {
          type: 'intro',
          text: "Let's revisit your $150 paycheck that shrank to $128 after taxes. This brings up two very important terms: Gross Income and Net Income.",
        },
        {
          type: 'fill-in-the-blank',
          question: "Your <b>Gross Income</b> was the total you earned, which was $____.",
          correctAnswer: '150',
        },
        {
          type: 'fill-in-the-blank',
          question: "Your <b>Net Income</b>, or take-home pay, was the amount after taxes, which was $____.",
          correctAnswer: '128',
        },
        {
          type: 'concept',
          text: "The process of your employer taking out taxes before you get paid is called <b>tax withholding</b>.",
        },
        {
          type: 'concept',
          text: "Here's what a typical pay stub looks like. Let's break down the key parts.",
          image: "https://placehold.co/400x225",
          imageHint: 'paycheck stub example',
        },
      ],
    },
    {
      title: 'The W-4 Form',
      xp: 4,
      steps: [
        {
          type: 'concept',
          text: "How does your employer know how much to withhold? You tell them! When you start a job, you fill out a <b>Form W-4</b>.",
        },
        {
          type: 'concept',
          text: "On the W-4, you can claim dependents (people you financially support) or indicate other income to make your withholding more accurate.",
        },
        {
          type: 'scenario',
          text: "Let's do a simulation. You start a job and fill out your W-4 as 'Single' with no dependents. Your net pay is $128.",
        },
        {
          type: 'multiple-choice',
          question: "Now, imagine you have a child. You update your W-4 to claim one dependent. What do you think will happen to your net pay?",
          options: [
            { id: 'opt1', text: 'It will go up.' },
            { id: 'opt2', text: 'It will go down.' },
            { id: 'opt3', text: 'It will stay the same.' },
          ],
          correctAnswer: 'opt1',
          reinforcement: "Correct! Claiming dependents reduces your withholding because the government knows you have higher expenses, so you get more money in each paycheck.",
        },
        {
            type: 'goal-builder',
            instructions: 'Would you prefer to have more money withheld (and likely get a refund), or less withheld (and have more cash now)? Why?',
            inputType: 'text',
            placeholder: 'e.g., I want more cash now to help with my budget.',
            storageKey: 'w4Preference',
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You've cracked the code of your paycheck!",
          rewards: {
            xp: 8,
            coins: 10,
          },
        },
      ],
    },
  ],
};
