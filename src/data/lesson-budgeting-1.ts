
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
          text: "Let's talk about a word that sounds boring but is actually a superpower: <b>budgeting</b>. 🦸‍♂️ Ready to unlock it?",
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
            { id: 'opt4', text: 'Make you feel guilty about spending.' },
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
          text: "So, why bother? A budget helps you avoid that <b><i>where did my money go?!</i></b> feeling.",
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
      title: 'Money In, Money Out',
      xp: 15,
      steps: [
        {
          type: 'concept',
          text: "Let's learn two key terms. <b>INCOME</b> is any money coming IN. 💸",
        },
        {
          type: 'concept',
          text: '<b>EXPENSES</b> are any money going OUT. 🛍️',
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
            xp: 40,
            coins: 5,
          },
        },
      ],
    },
  ],
};
