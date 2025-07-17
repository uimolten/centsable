
import type { Lesson } from '@/types/lesson';

export const lessonInsuranceQuiz1: Lesson = {
  id: 'uiq1',
  title: 'Insurance Unit Quiz',
  modules: [
    {
      title: 'Final Challenge',
      xp: 25,
      steps: [
        {
          type: 'intro',
          text: "FINAL CHALLENGE! 🛡️ You've learned how to protect your finances. Prove your mastery and claim your reward!",
        },
        {
          type: 'fill-in-the-blank',
          question: 'The regular monthly payment you make for insurance is called a _________.',
          correctAnswer: 'premium',
        },
        {
          type: 'multiple-choice',
          question: "What is a 'deductible'?",
          options: [
            { id: 'opt1', text: 'The total cost of an accident' },
            { id: 'opt2', text: 'The part you pay before insurance pays' },
            { id: 'opt3', text: 'The reward you get for not crashing' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'multiple-choice',
          question: 'True or False: You are legally required to have auto insurance to drive a car.',
          options: [
            { id: 'true', text: 'True' },
            { id: 'false', text: 'False' },
          ],
          correctAnswer: 'true',
        },
        {
          type: 'tap-the-pairs',
          instructions: 'Match the insurance to what it protects.',
          pairs: [
            { term: 'Auto Insurance', definition: 'Your Car' },
            { term: 'Renters Insurance', definition: 'Your Stuff in an Apartment' },
            { term: 'Health Insurance', definition: 'Your Body' },
          ],
        },
        {
          type: 'multiple-choice',
          question: 'If you want a cheaper monthly premium, you should generally choose a...?',
          options: [
            { id: 'opt1', text: 'Higher deductible' },
            { id: 'opt2', text: 'Lower deductible' },
            { id: 'opt3', text: 'No deductible' },
          ],
          correctAnswer: 'opt1',
        },
        {
          type: 'multiple-choice',
          question: "Leo's new phone was stolen from his apartment. Which insurance policy would help him replace it?",
          options: [
            { id: 'opt1', text: 'Auto Insurance' },
            { id: 'opt2', text: 'Renters Insurance' },
            { id: 'opt3', text: 'Health Insurance' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'multiple-choice',
          question: 'True or False: If you have a high deductible, you pay less out of your own pocket when an accident happens.',
          options: [
            { id: 'true', text: 'True' },
            { id: 'false', text: 'False' },
          ],
          correctAnswer: 'false',
        },
        {
          type: 'multiple-choice',
          question: 'The main purpose of insurance is to...',
          options: [
            { id: 'opt1', text: 'Make you rich' },
            { id: 'opt2', text: 'Be a fun hobby' },
            { id: 'opt3', text: 'Protect you from a large, unexpected financial loss' },
          ],
          correctAnswer: 'opt3',
        },
        {
          type: 'complete',
          title: 'UNIT COMPLETE!',
          text: 'Your financial life is now shielded! 🏆',
          rewards: {
            xp: 25,
            coins: 10,
          },
        },
      ],
    },
  ],
};
