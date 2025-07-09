
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting3: Lesson = {
  id: 'b3',
  title: 'Building a Budget',
  modules: [
    {
      title: 'The 50/30/20 Rule',
      xp: 25,
      steps: [
        {
          type: 'intro',
          text: 'Okay, you know *why* you need a budget and you*ve tracked your spending. Now, let*s actually **build** one with a simple, powerful framework: the <b>50/30/20 Rule</b>.',
        },
        {
          type: 'concept',
          text: 'Imagine your income is a pizza. 🍕 The 50/30/20 rule is a recipe for how to slice it up perfectly every time.',
          image: 'https://placehold.co/400x225',
          imageHint: 'pizza slices',
        },
        {
          type: 'concept',
          text: "<b>50%</b> of your income goes to 🍽️ <b>Needs</b> (essentials like a bus pass, your share of bills, or lunch money).",
        },
        {
          type: 'concept',
          text: "<b>30%</b> goes to 🎉 <b>Wants</b> (fun stuff like concerts, shopping, subscriptions, or eating out).",
        },
        {
          type: 'concept',
          text: "<b>20%</b> goes to 💾 <b>Savings & Debt Repayment</b> (money for your future goals or an emergency fund).",
        },
        {
          type: 'multiple-choice',
          question: "Using the 50/30/20 rule, if you earn <b>$500</b> a month, how much should go into savings?",
          options: [
            { id: 'opt1', text: '$50' },
            { id: 'opt2', text: '$250' },
            { id: 'opt3', text: '$150' },
            { id: 'opt4', text: '$100' },
          ],
          correctAnswer: 'opt4',
          reinforcement: "Perfect! 20% of $500 is $100. That's a great amount to put towards your goals each month!",
        },
      ],
    },
    {
      title: 'Pay Yourself First',
      xp: 25,
      steps: [
        {
          type: 'concept',
          text: "Here's a pro-tip that will change your financial life: <b>Pay Yourself First</b>.",
        },
        {
          type: 'concept',
          text: "It means that as SOON as you get paid, the first 'bill' you pay is your savings. You move that 20% to your savings account *before* you do anything else. This way, you're not trying to save whatever is 'left over' at the end of the month.",
        },
        {
          type: 'multiple-choice',
          question: "What's the main advantage of 'Pay Yourself First'?",
          options: [
            { id: 'opt1', text: 'It feels good to spend money.' },
            { id: 'opt2', text: 'It guarantees that you actually save money.' },
            { id: 'opt3', text: 'It helps you pay your other bills late.' },
            { id: 'opt4', text: 'It makes your income look bigger.' },
          ],
          correctAnswer: 'opt2',
          reinforcement: 'Exactly! You prioritize your future self.',
        },
      ]
    },
    {
      title: 'The Emergency Fund',
      xp: 20,
      steps: [
        {
          type: 'concept',
          text: "Part of your savings should go to an <b>Emergency Fund</b>. Think of this as your financial airbag. 🛟",
        },
        {
          type: 'concept',
          text: "It's money set aside ONLY for true surprises—like your phone screen cracking, a surprise vet bill, or needing a new tire. It's not for concert tickets that just went on sale!",
        },
        {
          type: 'multiple-choice',
          question: 'Which of these is a good use for an emergency fund?',
          options: [
            { id: 'opt1', text: 'A new video game is on sale.' },
            { id: 'opt2', text: 'Your friends are going out for pizza.' },
            { id: 'opt3', text: 'Your laptop for school suddenly breaks.' },
            { id: 'opt4', text: 'You want to buy a new shirt.' },
          ],
          correctAnswer: 'opt3',
          reinforcement: "That's a perfect example! An emergency fund turns a crisis into a minor inconvenience.",
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You've learned a powerful and simple way to build your first budget!",
          rewards: {
            xp: 70,
            coins: 10,
          },
        },
      ],
    },
  ],
};
