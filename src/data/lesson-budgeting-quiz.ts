
import type { Lesson } from '@/types/lesson';

export const lessonBudgetingQuiz: Lesson = {
  id: 'bq1',
  title: 'Budgeting Unit Quiz',
  modules: [
    {
      title: 'Final Challenge',
      xp: 100,
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
            { id: 'opt3', text: 'To create a plan for your money.' },
            { id: 'opt4', text: 'To show off how much you make.' },
          ],
          correctAnswer: 'opt3',
        },
        {
            type: 'multiple-choice',
            question: 'Your monthly car insurance payment is an example of what?',
            options: [
              { id: 'opt1', text: 'A fixed expense' },
              { id: 'opt2', text: 'A variable expense' },
              { id: 'opt3', text: 'A spending leak' },
              { id: 'opt4', text: 'Income' },
            ],
            correctAnswer: 'opt1',
        },
        {
            type: 'multiple-choice',
            question: 'According to the 50/30/20 rule, what percentage of your income should go to Wants?',
            options: [
              { id: 'opt1', text: '50%' },
              { id: 'opt2', text: '20%' },
              { id: 'opt3', text: '30%' },
              { id: 'opt4', text: '10%' },
            ],
            correctAnswer: 'opt3',
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
            question: "If you get a raise at work, what's the first thing you should do with your budget?",
            options: [
              { id: 'opt1', text: 'Increase your Wants spending by the full amount.' },
              { id: 'opt2', text: 'Ignore it and keep the budget the same.' },
              { id: 'opt3', text: 'Update your budget to plan for the new income.' },
              { id: 'opt4', text: 'Quit your job.' },
            ],
            correctAnswer: 'opt3',
        },
        {
            type: 'tap-the-pairs',
            instructions: 'Match the tool to its description.',
            pairs: [
              { term: 'Automator App (Mint)', definition: 'Automatically tracks and categorizes spending.' },
              { term: 'Planner App (YNAB)', definition: 'Gives every dollar a job before you spend.' },
              { term: 'DIY Spreadsheet', definition: 'Offers the most manual control and customization.' },
            ],
        },
        {
          type: 'complete',
          title: 'UNIT COMPLETE!',
          text: "You're officially a Budgeting Master! 🏆",
          rewards: {
            xp: 100,
            coins: 25,
          },
        },
      ],
    },
  ],
};
