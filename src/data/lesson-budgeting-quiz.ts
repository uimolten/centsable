
import type { Lesson } from '@/types/lesson';

export const lessonBudgetingQuiz: Lesson = {
  id: 'bq1',
  title: 'Budgeting Unit Quiz',
  modules: [
    {
      title: 'Final Challenge',
      xp: 25,
      steps: [
        {
          type: 'intro',
          text: "<b>THE FINAL CHALLENGE!</b> 👑 You've learned how to track, plan, and adapt. Time to test your budgeting mastery!",
        },
        {
          type: 'multiple-choice',
          question: 'What is the main purpose of a budget?',
          options: [
            { id: 'opt1', text: 'To track the past.' },
            { id: 'opt2', text: 'To restrict all your spending.' },
            { id: 'opt3', text: 'To create a plan for your money and give you control.' },
            { id: 'opt4', text: 'To show off how much you make.' },
          ],
          correctAnswer: 'opt3',
        },
        {
            type: 'multiple-choice',
            question: 'Your weekly spending on eating out is an example of what?',
            options: [
              { id: 'opt1', text: 'A fixed expense' },
              { id: 'opt2', text: 'A variable expense' },
              { id: 'opt3', text: 'A need' },
              { id: 'opt4', text: 'Income' },
            ],
            correctAnswer: 'opt2',
        },
        {
            type: 'multiple-choice',
            question: 'According to the 50/30/20 rule, what percentage of your income should go to Savings?',
            options: [
              { id: 'opt1', text: '50%' },
              { id: 'opt2', text: '20%' },
              { id: 'opt3', text: '30%' },
              { id: 'opt4', text: '10%' },
            ],
            correctAnswer: 'opt2',
        },
        {
          type: 'fill-in-the-blank',
          question: "The habit of saving money as soon as you get paid is called 'Pay Yourself _____'.",
          correctAnswer: 'First',
        },
        {
          type: 'multiple-choice',
          question: 'An emergency fund is designed for...',
          options: [
            { id: 'opt1', text: 'A planned vacation.' },
            { id: 'opt2', text: 'Buying a new video game.' },
            { id: 'opt3', text: 'An unexpected car repair.' },
            { id: 'opt4', text: 'Regular monthly bills.' },
          ],
          correctAnswer: 'opt3',
        },
        {
            type: 'multiple-choice',
            question: "A surprise expense that breaks your budget is called a...",
            options: [
              { id: 'opt1', text: 'Budget Buster' },
              { id: 'opt2', text: 'Spending Leak' },
              { id: 'opt3', text: 'Fixed Expense' },
              { id: 'opt4', text: 'SMART Goal' },
            ],
            correctAnswer: 'opt1',
        },
        {
            type: 'tap-the-pairs',
            instructions: 'Match the budgeting term to its definition.',
            pairs: [
              { term: 'SMART Goal', definition: 'A goal that is Specific, Measurable, Achievable, Relevant, and Time-bound.' },
              { term: 'Spending Leak', definition: 'Small, frequent purchases that add up and drain your money.' },
              { term: 'Fixed Expense', definition: 'A cost that stays the same each month, like a subscription.' },
              { term: 'Pay Yourself First', definition: 'Moving money to savings before you spend on anything else.' },
            ],
        },
        {
          type: 'complete',
          title: 'UNIT COMPLETE!',
          text: "You're officially a Budgeting Master! 🏆",
          rewards: {
            xp: 25,
            coins: 25,
          },
        },
      ],
    },
  ],
};
