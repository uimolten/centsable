
import type { Lesson } from '@/types/lesson';

export const lessonRetirementQuiz1: Lesson = {
  id: 'rq1',
  title: 'Financial Freedom Unit Quiz',
  modules: [
    {
      title: 'Final Challenge',
      xp: 25,
      steps: [
        {
          type: 'intro',
          text: "THE FINAL CHALLENGE! 👑 You've learned the secrets to Financial Freedom. Prove your knowledge and claim your reward!",
        },
        {
          type: 'multiple-choice',
          question: 'What is the biggest advantage a teenager has when it comes to investing?',
          options: [
            { id: 'opt1', text: 'Lots of money' },
            { id: 'opt2', text: 'Lots of time' },
            { id: 'opt3', text: 'Lots of experience' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'multiple-choice',
          question: 'True or False: A Roth IRA is a type of investment account where your earnings can grow completely tax-free.',
          options: [
            { id: 'true', text: 'True' },
            { id: 'false', text: 'False' },
          ],
          correctAnswer: 'true',
        },
        {
          type: 'fill-in-the-blank',
          question: 'Spreading your money across many different types of investments is called __________________.',
          correctAnswer: 'diversification',
        },
        {
          type: 'multiple-choice',
          question: "What is the 'magic spell' that makes your investments grow exponentially over time?",
          options: [
            { id: 'opt1', text: 'Diversification' },
            { id: 'opt2', text: 'Compounding' },
            { id: 'opt3', text: 'Risk Tolerance' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'interactive-sort',
          instructions: 'Drag these to the correct risk category.',
          box1Label: 'Higher Risk',
          box2Label: 'Lower Risk',
          items: [
            { id: 'item-1', text: 'Stock', correctBox: 'box1' },
            { id: 'item-2', text: 'Bond', correctBox: 'box2' },
            { id: 'item-3', text: 'Mutual Fund', correctBox: 'box1' }, // Mutual funds are generally higher risk than bonds
          ],
        },
        {
          type: 'multiple-choice',
          question: "Your job offers a '401(k) match'. This is essentially...",
          options: [
            { id: 'opt1', text: 'A tax' },
            { id: 'opt2', text: 'Free money' },
            { id: 'opt3', text: 'A type of stock' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'multiple-choice',
          question: 'True or False: The best time to start investing for financial freedom is when you\'re older and have more money.',
          options: [
            { id: 'true', text: 'True' },
            { id: 'false', text: 'False' },
          ],
          correctAnswer: 'false',
        },
        {
          type: 'fill-in-the-blank',
          question: "A special investment account a teen can open with a parent's help is called a __________ Roth IRA.",
          correctAnswer: 'Custodial',
        },
        {
          type: 'complete',
          title: 'UNIT COMPLETE!',
          text: "You're on the path to Financial Freedom! 🚀",
          rewards: {
            xp: 25,
            coins: 10,
          },
        },
      ],
    },
  ],
};
