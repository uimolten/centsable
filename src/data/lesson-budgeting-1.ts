
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting1: Lesson = {
  id: 'b1',
  title: 'Why Budgeting Matters',
  modules: [
    {
      title: 'What Even Is a Budget?',
      xp: 25,
      steps: [
        {
          type: 'intro',
          text: "Let's talk about a word that sounds boring but is actually a superpower: <b>budgeting</b>. 🦸‍♂️ Ready to unlock it?",
        },
        {
          type: 'concept',
          text: "A <b>Budget</b> is just a plan for your money. Think of it like your phone's battery saver mode—it helps you make sure your money lasts for what truly matters.",
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
          reinforcement: 'Exactly! It’s not about restriction, it’s about giving you control.',
        },
      ],
    },
    {
      title: 'The Core Components',
      xp: 25,
      steps: [
        {
          type: 'concept',
          text: "Every budget has two core parts. First up is <b>Income</b>: any money coming IN (from a job, allowance, gifts, etc.). 💸",
        },
        {
          type: 'concept',
          text: "The second part is <b>Expenses</b>: any money going OUT (on food, games, clothes, bills, etc.). 🛍️",
        },
        {
            type: 'tap-the-pairs',
            instructions: 'Match the term to its meaning.',
            pairs: [
              { term: 'Income', definition: 'Money you get' },
              { term: 'Expense', definition: 'Money you spend' },
            ]
        },
        {
          type: 'concept',
          text: "Now for the secret to making it all work: understanding the difference between <b>Needs</b> and <b>Wants</b>.",
        },
        {
          type: 'concept',
          text: "A <b>Need</b> is something you absolutely must have to live, like food or a bus pass to get to school. A <b>Want</b> is something that’s fun to have, but you'll be okay without it, like a new video game or fancy coffee.",
        },
        {
          type: 'interactive-sort',
          instructions: 'Sort these items into the correct category.',
          box1Label: 'Needs',
          box2Label: 'Wants',
          items: [
            { id: 'item-1', text: 'Lunch money for school', correctBox: 'box1' },
            { id: 'item-2', text: 'New hoodie', correctBox: 'box2' },
            { id: 'item-3', text: 'Your share of the phone bill', correctBox: 'box1' },
            { id: 'item-4', text: 'Tickets to a concert', correctBox: 'box2' },
          ],
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You've learned the 'why' behind budgeting. You're ready to take control!",
          rewards: {
            xp: 50,
            coins: 5,
          },
        },
      ],
    },
  ],
};
