
import type { Lesson } from '@/types/lesson';

export const lessonCreditPractice2: Lesson = {
  id: 'cp2',
  title: 'Practice: Credit Scenarios',
  modules: [
    {
      title: 'Practice Dojo',
      xp: 15,
      steps: [
        {
          type: 'intro',
          text: "Time for more practice! Let's test your knowledge on credit reports and the cost of borrowing.",
        },
        {
          type: 'multiple-choice',
          question: "What is the single biggest factor that makes up your credit score?",
          options: [
            { id: 'opt1', text: 'How many credit cards you have.' },
            { id: 'opt2', text: 'Your age.' },
            { id: 'opt3', text: 'Your payment history (paying bills on time).' },
            { id: 'opt4', text: 'How much money you make.' },
          ],
          correctAnswer: 'opt3',
          reinforcement: 'Correct! At 35% of your score, nothing is more important than paying on time.',
        },
        {
          type: 'interactive-sort',
          instructions: 'You check your credit report. Which of these things would you find on it?',
          box1Label: 'On the Report',
          box2Label: 'NOT on the Report',
          items: [
            { id: 'item-1', text: 'Your history of on-time payments', correctBox: 'box1' },
            { id: 'item-2', text: 'Your bank account balance', correctBox: 'box2' },
            { id: 'item-3', text: 'A list of your current loans', correctBox: 'box1' },
            { id: 'item-4', text: 'Who you are friends with on social media', correctBox: 'box2' },
            { id: 'item-5', text: 'Any hard inquiries from lenders', correctBox: 'box1' },
          ],
        },
        {
          type: 'scenario',
          text: "You see an ad for a new credit card with a low introductory APR. You apply for it.",
        },
        {
          type: 'multiple-choice',
          question: 'What kind of inquiry will be recorded on your credit report?',
          options: [
            { id: 'opt1', text: 'A hard inquiry, which might lower your score slightly.' },
            { id: 'opt2', text: 'A soft inquiry, which has no effect on your score.' },
            { id: 'opt3', text: 'A medium inquiry, which raises your score.' },
            { id: 'opt4', text: 'No inquiry will be recorded.' },
          ],
          correctAnswer: 'opt1',
        },
        {
          type: 'fill-in-the-blank',
          question: "Paying only the smallest amount required by the lender each month is known as the <b>_________ Payment Trap</b>.",
          correctAnswer: 'Minimum',
        },
        {
          type: 'complete',
          title: 'PRACTICE COMPLETE!',
          text: 'You handled those scenarios like a pro. Awesome work!',
          rewards: {
            xp: 15,
            coins: 0,
          },
        },
      ],
    },
  ],
};
