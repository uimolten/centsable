
import type { Lesson } from '@/types/lesson';

export const lessonCreditPractice1: Lesson = {
  id: 'cp1',
  title: 'Practice: Credit Habits',
  modules: [
    {
      title: 'Practice Dojo',
      xp: 40,
      steps: [
        {
          type: 'intro',
          text: "Welcome to the practice dojo! 🥋 Let's drill the basics of credit from your first two lessons.",
        },
        {
          type: 'multiple-choice',
          question: "When you use a credit card, you are...",
          options: [
            { id: 'opt1', text: 'Spending your own money from a checking account.' },
            { id: 'opt2', text: 'Borrowing money that you must pay back.' },
            { id: 'opt3', text: 'Getting free money from the bank.' },
            { id: 'opt4', text: 'Automatically investing in the stock market.' },
          ],
          correctAnswer: 'opt2',
          reinforcement: 'Correct! Credit is a form of borrowing.',
        },
        {
          type: 'tap-the-pairs',
          instructions: 'Match the credit term to its definition.',
          pairs: [
            { term: 'Credit Score', definition: 'A 3-digit number showing your trustworthiness.' },
            { term: 'APR', definition: 'The interest rate charged on what you owe.' },
            { term: 'Credit Limit', definition: 'The maximum amount you can borrow.' },
            { term: 'Lender', definition: 'The bank or company that gives you credit.' },
          ],
        },
        {
          type: 'scenario',
          text: "Your credit card has a limit of $500. You've spent $250 on it and haven't paid it off yet.",
        },
        {
          type: 'fill-in-the-blank',
          question: 'Your credit utilization is ___%.',
          correctAnswer: '50',
          reinforcement: "Exactly! ($250 is 50% of $500). To improve your score, you'd want to get this below 30%.",
        },
        {
          type: 'multiple-choice',
          question: "To avoid paying interest on your credit card purchases, you should...",
          options: [
            { id: 'opt1', text: 'Pay the minimum amount due.' },
            { id: 'opt2', text: 'Pay the full balance before the grace period ends.' },
            { id: 'opt3', text: 'Never use the card.' },
            { id: 'opt4', text: 'Only use it for small purchases.' },
          ],
          correctAnswer: 'opt2',
          reinforcement: 'You got it! Paying in full is the smartest way to use a credit card.',
        },
        {
          type: 'complete',
          title: 'PRACTICE COMPLETE!',
          text: 'Your credit knowledge is getting stronger. Well done!',
          rewards: {
            xp: 40,
            coins: 5,
          },
        },
      ],
    },
  ],
};
