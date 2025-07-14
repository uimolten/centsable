
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting2: Lesson = {
  id: 'b2',
  title: 'Tracking Income & Expenses',
  modules: [
    {
      title: "Become a Money Detective",
      xp: 2,
      steps: [
        {
          type: 'intro',
          text: "In our last quest, we learned what a <b>budget</b> is. Now, let's become money detectives and learn how to track our <b>income</b> and <b>expenses</b>. 🕵️‍♀️",
        },
        {
          type: 'concept',
          text: "Tracking your spending is like checking your phone's screen time report. It doesn't judge you; it just gives you the data so YOU can decide if you want to make a change.",
        },
        {
          type: 'concept',
          text: "A key part of this is understanding your <b>Cash Flow</b>. That's the difference between the money flowing IN (your income) and the money flowing OUT (your expenses). Positive cash flow means you have money left over to save!",
        },
      ],
    },
    {
      title: 'Fixed vs. Variable Expenses',
      xp: 2,
      steps: [
        {
          type: 'concept',
          text: "Your <b>expenses</b> come in two main flavors. First up are <b>Fixed Expenses</b>: predictable costs that stay the same each month, like a phone bill or a subscription service. 🗓️",
        },
        {
          type: 'concept',
          text: "The other flavor is <b>Variable Expenses</b>. These change based on your choices, like how much you spend eating out, shopping, or on gas. 🛍️",
        },
        {
          type: 'interactive-sort',
          instructions: 'Sort these costs. Are they Fixed (predictable) or Variable (they change)?',
          box1Label: 'Fixed Expenses',
          box2Label: 'Variable Expenses',
          items: [
            { id: 'item-1', text: 'Phone Bill', correctBox: 'box1' },
            { id: 'item-2', text: 'Shopping for clothes', correctBox: 'box2' },
            { id: 'item-3', text: 'Spotify Subscription', correctBox: 'box1' },
            { id: 'item-4', text: 'Going out for pizza', correctBox: 'box2' },
          ],
        },
      ]
    },
    {
      title: "Your Detective's Toolkit",
      xp: 3,
      steps: [
        {
          type: 'concept',
          text: 'Watch out for "Spending Leaks"! 🧛 These are small, frequent purchases that secretly drain your cash without you even noticing.',
        },
        {
          type: 'scenario',
          text: "That <b>$5</b> energy drink doesn't seem like much, right? But buy one 4 times a week, and that's <b>$80</b> a month that just vanishes! Tracking helps you spot these leaks.",
        },
        {
          type: 'concept',
          text: "Luckily, you have tools to help! You can use an **Automator** app (like Mint or Empower) to track for you, a **Planner** app (like YNAB) to give every dollar a job, or the **DIY Method** with a simple spreadsheet.",
        },
        {
            type: 'multiple-choice',
            question: 'The most effective budgeting tool is...',
            options: [
                { id: 'opt1', text: 'The most popular one.' },
                { id: 'opt2', text: 'The one with the most features.' },
                { id: 'opt3', text: 'The one you will actually use consistently.' },
                { id: 'opt4', text: 'The most expensive one.' },
            ],
            correctAnswer: 'opt3',
            reinforcement: 'Exactly! Consistency is what matters most.',
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You've uncovered the secrets of your spending. You're ready to take control!",
          rewards: {
            xp: 7,
            coins: 10,
          },
        },
      ],
    },
  ],
};
