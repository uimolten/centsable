
import type { Lesson } from '@/types/lesson';

export const lessonTaxesPractice1: Lesson = {
  id: 'tp1',
  title: 'Practice: Reading a Pay Stub',
  modules: [
    {
      title: 'Practice Dojo',
      xp: 15,
      steps: [
        {
          type: 'intro',
          text: "Welcome to the practice dojo! 🥋 Let's practice reading a pay stub.",
        },
        {
          type: 'multiple-choice',
          question: "The total amount of money you earn before taxes is called...",
          options: [
            { id: 'opt1', text: 'Net Income' },
            { id: 'opt2', text: 'Gross Income' },
            { id: 'opt3', text: 'Withholding' },
            { id: 'opt4', text: 'Sales Tax' },
          ],
          correctAnswer: 'opt2',
          reinforcement: 'Correct! Gross income is the total before deductions.',
        },
        {
            type: 'multiple-choice',
            question: "The money your employer takes out of your paycheck for taxes is called...",
            options: [
              { id: 'opt1', text: 'A refund' },
              { id: 'opt2', text: 'A deduction' },
              { id: 'opt3', text: 'Withholding' },
              { id: 'opt4', text: 'Revenue'}
            ],
            correctAnswer: 'opt3',
            reinforcement: "That's right! It's withheld to pay your taxes for you.",
        },
        {
          type: 'scenario',
          text: 'Your pay stub shows: <br>• Gross Pay: <b>$600</b> <br>• Federal Tax: <b>$50</b> <br>• State Tax: <b>$20</b> <br>• Payroll Tax: <b>$30</b>',
        },
        {
          type: 'fill-in-the-blank',
          question: 'Your total deductions are <b>$100</b>. Your Net Pay is $______.',
          correctAnswer: '500',
          reinforcement: "Excellent! You know how to calculate your take-home pay.",
        },
        {
          type: 'complete',
          title: 'PRACTICE COMPLETE!',
          text: 'Your pay stub skills are on point. Great job!',
          rewards: {
            xp: 15,
            coins: 5,
          },
        },
      ],
    },
  ],
};
