
import type { Lesson } from '@/types/lesson';

export const lessonCredit3: Lesson = {
  id: 'c3',
  title: 'Understanding Credit Reports & Scores',
  modules: [
    {
      title: 'What’s In Your Credit Report?',
      xp: 4,
      steps: [
        {
          type: 'intro',
          text: "Let's go deeper into your financial gradebook. What's actually *in* a credit report and how is the score calculated?",
        },
        {
            type: 'multiple-choice',
            question: "Before giving you a loan, what do you think lenders can see about your financial history?",
            options: [
                { id: 'opt1', text: 'Your income' },
                { id: 'opt2', text: 'Your past payment history' },
                { id: 'opt3', text: 'Your spending habits' },
                { id: 'opt4', text: 'All of the above' },
            ],
            correctAnswer: 'opt4',
            reinforcement: 'That\'s right, they get a pretty detailed picture!',
        },
        {
          type: 'concept',
          text: "Your credit report contains four main sections: your personal info, a list of all your credit accounts (cards, loans), public records (like bankruptcies), and inquiries.",
        },
        {
          type: 'concept',
          text: "An *inquiry* is a record of who has checked your credit. There are two types...",
        },
        {
          type: 'tap-the-pairs',
          instructions: 'Match the inquiry type to its description.',
          pairs: [
            { term: 'Hard Inquiry', definition: 'A lender checks your credit for a new loan or card. This can *temporarily* lower your score a few points.' },
            { term: 'Soft Inquiry', definition: 'You check your own credit, or a company pre-approves you for an offer. This does *NOT* affect your score.' },
          ],
        },
      ],
    },
    {
      title: 'How Your Score is Calculated',
      xp: 4,
      steps: [
        {
          type: 'concept',
          text: "Your credit score is calculated from the data in your report. It might seem mysterious, but it's mostly based on *five* factors.",
          image: 'https://placehold.co/400x225',
          imageHint: 'pie chart credit factors',
        },
        {
          type: 'interactive-sort',
          instructions: 'Drag the factors to order them from MOST important to LEAST important.',
          box1Label: 'Most Important',
          box2Label: 'Least Important',
          items: [
            { id: 'item-1', text: 'Payment History (35%)', correctBox: 'box1' },
            { id: 'item-2', text: 'Credit Utilization (30%)', correctBox: 'box1' },
            { id: 'item-3', text: 'Length of Credit History (15%)', correctBox: 'box1' },
            { id: 'item-4', text: 'New Credit & Inquiries (10%)', correctBox: 'box2' },
            { id: 'item-5', text: 'Credit Mix (10%)', correctBox: 'box2' },
          ],
        },
        {
          type: 'multiple-choice',
          question: 'Which two factors give you the most direct and immediate control over your credit score?',
          options: [
            { id: 'opt1', text: 'Length of your credit history' },
            { id: 'opt2', text: 'Your payment history' },
            { id: 'opt3', text: 'Your credit utilization' },
            { id: 'opt4', text: 'The mix of credit you have' },
          ],
          correctAnswer: ['opt2', 'opt3'],
          reinforcement: 'Exactly! Paying on time and keeping your balances low are the two most powerful actions you can take.',
        },
        {
          type: 'concept',
          text: "You can get a free copy of your credit report from all three major bureaus (Equifax, Experian, TransUnion) each year. It's important to check for errors!",
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You've demystified credit reports and scores. Knowledge is power!",
          rewards: {
            xp: 8,
            coins: 10,
          },
        },
      ],
    },
  ],
};
