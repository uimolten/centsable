import type { Lesson } from '@/types/lesson';

export const lessonSaving1: Lesson = {
  id: 's1',
  title: 'The Importance of Saving',
  modules: [
    {
      title: 'What is Saving?',
      xp: 10,
      steps: [
        {
          type: 'intro',
          text: "Welcome to your first quest! ⚔️ Let's talk about a real-life superpower: saving money.",
          mascotImage: 'https://placehold.co/400x400',
        },
        {
          type: 'concept',
          text: 'Saving is simply putting money aside for later, instead of spending it right now.',
        },
        {
          type: 'fill-in-the-blank',
          question: 'Putting money aside for the future is called ________.',
          correctAnswer: 'saving',
          reinforcement: 'Exactly! ✨',
        },
        {
          type: 'tap-the-pairs',
          instructions: 'Tap the matching pairs!',
          pairs: [
            { term: 'Spending', definition: 'Using money now' },
            { term: 'Saving', definition: 'Keeping money for later' },
          ],
        },
        {
          type: 'concept',
          text: 'Think of it like saving a power-up in a game for the final boss. It’s a smart move!',
        },
      ],
    },
    {
      title: 'Why Save?',
      xp: 15,
      steps: [
        {
          type: 'concept',
          text: 'Cool, but why save? You save to get things you really want later! These are called financial goals. 🎯',
        },
        {
          type: 'multiple-choice',
          question: 'Which of these is a financial goal?',
          options: ['Saving for a new gaming console', 'Watching a movie', 'Doing homework'],
          correctAnswer: 'Saving for a new gaming console',
          reinforcement: "You got it! That's a goal.",
        },
        {
          type: 'concept',
          text: "A goal gives your money a mission. It turns 'saving' into 'saving for' something awesome.",
        },
        {
          type: 'interactive-sort',
          instructions: 'Is this a short-term or long-term goal? Drag to the correct box.',
          box1Label: 'Short-Term',
          box2Label: 'Long-Term',
          items: [
            { id: 'item-1', text: 'New Sneakers', correctBox: 'box1' },
            { id: 'item-2', text: 'A Car', correctBox: 'box2' },
            { id: 'item-3', text: 'Concert Tickets', correctBox: 'box1' },
            { id: 'item-4', text: 'College', correctBox: 'box2' },
          ],
        },
        {
          type: 'fill-in-the-blank',
          question: 'Saving is easier when you have a specific ______ in mind.',
          correctAnswer: 'goal',
          reinforcement: 'Nice one! 🚀',
        },
      ],
    },
    {
      title: 'Wants vs. Needs',
      xp: 15,
      steps: [
        {
          type: 'concept',
          text: 'So, where does saving money come from? The secret is knowing the difference between Needs and Wants.',
        },
        {
          type: 'concept',
          text: 'A Need is something you absolutely must have to live, like food and a place to live. A Want is something that’s fun to have, but you\'ll be okay without it.',
        },
        {
          type: 'multiple-choice',
          question: 'Tap all the Needs.',
          options: ['🍕 Pizza', '💧 Water', '📱 New Phone Case', '🏠 Shelter'],
          correctAnswer: '💧 Water', // Simplified for this example, a real component would support multi-select
        },
        {
          type: 'multiple-choice',
          question: 'Now, tap all the Wants.',
          options: ['🥤 Boba Tea', '👟 Rare Sneakers', '🍎 An Apple', '🎮 A Video Game'],
          correctAnswer: '🥤 Boba Tea', // Simplified for this example
        },
        {
          type: 'concept',
          text: "Knowing the difference helps you decide where your money should go first. It's not about never buying wants, it's about planning for them! 👍",
        },
      ],
    },
    {
      title: 'Your First Quest',
      xp: 20,
      steps: [
        {
          type: 'scenario',
          text: "Time for your first quest! Let's say you get $20 allowance. You're thirsty, so you buy a soda for $2. You also need to pay your family $10 for your phone bill.",
        },
        {
          type: 'multiple-choice',
          question: 'Which one is the Need?',
          options: ['The soda', 'The phone bill'],
          correctAnswer: 'The phone bill',
          reinforcement: "Correct! That's a responsibility.",
        },
        {
          type: 'scenario',
          text: 'You started with $20, spent $2 on a want, and $10 on a need. You have $8 left.',
        },
        {
          type: 'multiple-choice',
          question: "You really want a new video game that costs $60. What's the smartest thing to do with the $8?",
          options: ['Spend it on snacks', 'Save it for the game', 'Leave it in your pocket'],
          correctAnswer: 'Save it for the game',
        },
        {
          type: 'concept',
          text: "By choosing to save, you're now $8 closer to your goal! That's how it works. A little bit at a time.",
        },
        {
          type: 'complete',
          title: "QUEST COMPLETE!",
          text: "You've mastered 'The Importance of Saving'.",
          rewards: {
            xp: 60,
            coins: 5,
          },
        },
      ],
    },
  ],
};
