
import type { Lesson } from '@/types/lesson';

export const lessonTaxesPractice2: Lesson = {
  id: 'tp2',
  title: 'Practice: Credits vs. Deductions',
  modules: [
    {
      title: 'Practice Dojo',
      xp: 15,
      steps: [
        {
          type: 'intro',
          text: "Time for more practice! Let's sharpen your knowledge of tax forms and savings.",
        },
        {
          type: 'multiple-choice',
          question: "Which form do you receive from your employer that summarizes your annual earnings and withholdings?",
          options: [
            { id: 'opt1', text: '1040' },
            { id: 'opt2', text: 'W-2' },
            { id: 'opt3', text: 'W-4' },
            { id: 'opt4', text: 'Form 1099' },
          ],
          correctAnswer: 'opt2',
          reinforcement: 'Correct! The W-2 is the summary of your year.',
        },
        {
          type: 'multiple-choice',
          question: "Which is more valuable to you as a taxpayer?",
          options: [
            { id: 'opt1', text: 'A $500 Tax Credit' },
            { id: 'opt2', text: 'A $500 Tax Deduction' },
          ],
          correctAnswer: 'opt1',
          reinforcement: "You got it! Credits reduce your tax bill dollar-for-dollar.",
        },
        {
          type: 'scenario',
          text: "You owe $800 in taxes. You qualify for a $300 tax credit and a $1,000 tax deduction. Your tax rate is 10%.",
        },
        {
          type: 'fill-in-the-blank',
          question: 'The $1,000 deduction saves you $100. The $300 credit saves you $300. In total, you save $______ on your taxes.',
          correctAnswer: '400',
          reinforcement: "Excellent work! Your new tax bill would be $400.",
        },
        {
          type: 'complete',
          title: 'PRACTICE COMPLETE!',
          text: 'You handled those scenarios like a pro. Awesome work!',
          rewards: {
            xp: 15,
            coins: 5,
          },
        },
      ],
    },
  ],
};
