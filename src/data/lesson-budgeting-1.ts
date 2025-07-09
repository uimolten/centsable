
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting1: Lesson = {
  id: 'b1',
  title: 'Why Budgeting Matters',
  modules: [
    {
      title: 'What Even Is a Budget?',
      xp: 10,
      steps: [
        {
          type: 'intro',
          text: "Let's talk about a word that sounds boring but is actually a superpower: budgeting. 🦸‍♂️ Ready to unlock it?",
        },
        {
          type: 'concept',
          text: "A budget is just a plan for your money. Think of it like your phone's battery saver mode—it helps you make sure your money lasts for the things that matter most.",
        },
        {
          type: 'multiple-choice',
          question: 'A budget is mainly a tool to...',
          options: [
            { id: 'opt1', text: 'Stop you from having fun.' },
            { id: 'opt2', text: 'Control your money, so you can spend it on what you really want.' },
            { id: 'opt3', text: 'Only for adults with tons of money.' },
          ],
          correctAnswer: 'opt2',
          reinforcement: 'Exactly! It’s not about restriction, it’s about control.',
        },
      ],
    },
    {
      title: 'Why Bother?',
      xp: 15,
      steps: [
        {
          type: 'concept',
          text: "So, why bother? A budget helps you avoid that 'where did my money go?!' feeling.",
        },
        {
          type: 'concept',
          text: 'It reduces money stress and helps you save for awesome stuff you actually care about, like concert tickets, new tech, or even a car. 🚗',
        },
        {
          type: 'fill-in-the-blank',
          question: 'A budget helps you reach your financial _____.',
          correctAnswer: 'goals',
          reinforcement: 'You got it! A budget is your roadmap to your goals.',
        },
      ],
    },
    {
      title: 'Needs vs. Wants',
      xp: 20,
      steps: [
        {
          type: 'concept',
          text: "To build a budget, you have to know the difference between 'Needs' and 'Wants'.",
        },
        {
          type: 'concept',
          text: 'A NEED is something you must have to live and function. A WANT is something that’s fun to have, but not essential.',
        },
        {
          type: 'interactive-sort',
          instructions: 'Is it a Need or a Want? Drag each item to the correct category.',
          box1Label: 'Needs',
          box2Label: 'Wants',
          items: [
            { id: 'item-1', text: 'Fixing your broken phone screen ($80)', correctBox: 'box1' },
            { id: 'item-2', text: 'Spotify Premium ($10/month)', correctBox: 'box2' },
            { id: 'item-3', text: 'Bus pass to get to school ($25/month)', correctBox: 'box1' },
            { id: 'item-4', text: 'New Nikes for the basketball team ($120)', correctBox: 'box2' },
            { id: 'item-5', text: 'Going out for pizza with friends ($15)', correctBox: 'box2' },
          ],
        },
        {
            type: 'concept',
            text: "Nice sorting! Knowing the difference helps you prioritize. Needs first, then plan for wants!"
        }
      ],
    },
    {
      title: 'Money In, Money Out',
      xp: 15,
      steps: [
        {
          type: 'concept',
          text: "Let's learn two key terms. INCOME is any money coming IN. 💸",
        },
        {
          type: 'concept',
          text: 'EXPENSES are any money going OUT. 🛍️',
        },
        {
            type: 'fill-in-the-blank',
            question: 'Money you get from your job or allowance is called _____.',
            correctAnswer: 'income',
            reinforcement: 'Exactly!'
        },
        {
            type: 'fill-in-the-blank',
            question: 'The money you spend on movie tickets is an _____.',
            correctAnswer: 'expense',
            reinforcement: 'You got it!'
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You've learned the 'why' behind budgeting. You're ready to start taking control of your money!",
          rewards: {
            xp: 60,
            coins: 5,
          },
        },
      ],
    },
  ],
};
