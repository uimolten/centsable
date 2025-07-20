
import type { Lesson } from '@/types/lesson';

export const lessonCreditQuiz: Lesson = {
  id: 'cq1',
  title: 'Credit Unit Quiz',
  modules: [
    {
      title: 'Final Challenge',
      xp: 25,
      steps: [
        {
          type: 'intro',
          text: "<b>THE FINAL CHALLENGE!</b> 👑 You've learned about building, managing, and protecting your credit. Time to test your mastery!",
        },
        {
          type: 'multiple-choice',
          question: 'What is the main purpose of credit?',
          options: [
            { id: 'opt1', text: 'To get free money from banks.' },
            { id: 'opt2', text: 'To allow you to buy things now and pay for them over time.' },
            { id: 'opt3', text: 'To check your bank account balance.' },
            { id: 'opt4', text: 'To replace the need for saving money.' },
          ],
          correctAnswer: 'opt2',
        },
        {
            type: 'multiple-choice',
            question: 'To maintain a healthy credit score, you should keep your credit utilization...',
            options: [
              { id: 'opt1', text: 'Above 90%' },
              { id: 'opt2', text: 'At exactly 50%' },
              { id: 'opt3', text: 'Below 30%' },
              { id: 'opt4', text: 'At 100% to show you use it' },
            ],
            correctAnswer: 'opt3',
        },
        {
            type: 'multiple-choice',
            question: "What is the most important factor in determining your credit score?",
            options: [
              { id: 'opt1', text: 'Your age' },
              { id: 'opt2', text: 'Your income' },
              { id: 'opt3', text: 'How many cards you have' },
              { id: 'opt4', text: 'Your payment history' },
            ],
            correctAnswer: 'opt4',
        },
        {
          type: 'fill-in-the-blank',
          question: "The fee a lender charges you for borrowing money is called <b>_________</b>.",
          correctAnswer: 'Interest',
        },
        {
          type: 'multiple-choice',
          question: "Checking your own credit score is an example of a...",
          options: [
            { id: 'opt1', text: 'Hard Inquiry' },
            { id: 'opt2', text: 'Soft Inquiry' },
            { id: 'opt3', text: 'Credit Penalty' },
            { id: 'opt4', text: 'Loan Application' },
          ],
          correctAnswer: 'opt2',
        },
        {
            type: 'multiple-choice',
            question: "What is the 'Minimum Payment Trap'?",
            options: [
              { id: 'opt1', text: 'A trap that gives you extra money.' },
              { id: 'opt2', text: 'When paying only the minimum keeps you in debt for a long time due to interest.' },
              { id: 'opt3', text: 'A discount for paying the minimum.' },
              { id: 'opt4', text: 'A way to pay off debt very quickly.' },
            ],
            correctAnswer: 'opt2',
        },
        {
            type: 'tap-the-pairs',
            instructions: 'Match the credit term to its definition.',
            pairs: [
              { term: 'Credit Report', definition: 'A detailed history of your borrowing and payments.' },
              { term: 'Grace Period', definition: 'The time you have to pay your bill before interest is charged.' },
              { term: 'Principal', definition: 'The original amount of money you borrowed.' },
              { term: 'Phishing', definition: 'A scam to trick you into giving away personal information.' },
            ],
        },
        {
          type: 'complete',
          title: 'CREDIT UNIT COMPLETE!',
          text: "You're officially a Credit Master! 🏆 You have the knowledge to build a strong financial future.",
          rewards: {
            xp: 25,
            coins: 10,
          },
        },
      ],
    },
  ],
};
