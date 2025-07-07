
import type { Lesson } from '@/types/lesson';

export const lessonSaving2: Lesson = {
  id: 's2',
  title: 'Creating a Savings Goal',
  modules: [
    {
      title: 'From "I Wish" to "I Will"',
      xp: 10,
      steps: [
        {
          type: 'intro',
          text: "Quest accepted: Creating a Savings Goal! Last time, you learned why to save. Now, let's learn how to make it happen. ✨",
          mascotImage: 'https://placehold.co/400x400',
          imageHint: 'friendly mascot',
        },
        {
          type: 'concept',
          text: "A 'wish' is saying 'I want a new computer someday.' A 'goal' is saying 'I will save $1,000 for a new computer in 6 months.' See the difference?",
        },
        {
          type: 'multiple-choice',
          question: 'Which one is a real goal?',
          options: ['I want to be rich.', 'I will save $50 for concert tickets by next month.'],
          correctAnswer: 'I will save $50 for concert tickets by next month.',
          reinforcement: 'Exactly! A real goal has details.',
        },
        {
          type: 'concept',
          text: "The best goals are like a cheat code for success. They're called SMART goals. Let's learn the code! 🤫",
        },
      ],
    },
    {
      title: 'Unlocking the SMART Code',
      xp: 20,
      steps: [
        {
          type: 'concept',
          icon: 'search',
          text: "The 'S' in SMART stands for Specific. You need to know exactly what you're saving for.",
        },
        {
          type: 'multiple-choice',
          question: 'Which goal is more Specific?',
          options: ['Saving for new shoes.', 'Saving for the new Air Jordan 1s.'],
          correctAnswer: 'Saving for the new Air Jordan 1s.',
          reinforcement: 'Perfect! Details matter.',
        },
        {
          type: 'concept',
          icon: 'tag',
          text: "The 'M' is for Measurable. You need a target number. How much does it cost?",
        },
        {
          type: 'fill-in-the-blank',
          question: 'To make a goal measurable, you need to know the ______.',
          correctAnswer: 'price/cost',
          reinforcement: 'You got it! 💰',
        },
        {
          type: 'concept',
          icon: 'thumbs-up',
          text: "The 'A' is for Achievable. Is the goal realistic for you right now?",
        },
        {
          type: 'multiple-choice',
          question: 'If you get $20 allowance a week, which goal is more Achievable in one month?',
          options: ['Saving for a $5,000 trip.', 'Saving for a $70 video game.'],
          correctAnswer: 'Saving for a $70 video game.',
          reinforcement: "Right! Start with what's possible.",
        },
        {
          type: 'concept',
          icon: 'heart',
          text: "The 'R' is for Relevant. Does this goal actually matter to YOU?",
        },
        {
          type: 'concept',
          icon: 'calendar',
          text: "And finally, 'T' is for Time-bound. You need a deadline! When do you want to achieve it?",
        },
        {
          type: 'tap-the-pairs',
          instructions: 'Match the SMART letter to its meaning!',
          pairs: [
            { term: 'S', definition: 'Specific' },
            { term: 'M', definition: 'Measurable' },
            { term: 'A', definition: 'Achievable' },
            { term: 'R', definition: 'Relevant' },
            { term: 'T', definition: 'Time-bound' },
          ],
        },
      ],
    },
    {
      title: 'Build Your Own Quest',
      xp: 20,
      steps: [
        {
          type: 'intro',
          text: "Your turn! Let's build your first SMART savings goal. Don't worry, I'll help.",
        },
        {
          type: 'goal-builder',
          instructions: 'Specific: What do you want to save for? Be exact!',
          inputType: 'text',
          placeholder: 'e.g. New Headphones',
          storageKey: 'item',
        },
        {
          type: 'goal-builder',
          instructions: 'Measurable: Awesome! How much do those cost?',
          inputType: 'number',
          placeholder: 'e.g. 150',
          storageKey: 'amount',
        },
        {
          type: 'goal-builder',
          instructions: 'Time-bound: Great! When do you want to have them by?',
          inputType: 'date',
          dateOptions: [
            { label: '1 Month', value: 'in 1 month' },
            { label: '3 Months', value: 'in 3 months' },
            { label: '6 Months', value: 'in 6 months' },
          ],
          storageKey: 'timeframe',
        },
        {
          type: 'goal-summary',
          textTemplate: 'To save {amount} for {item} {timeframe}.',
        },
      ],
    },
    {
      title: 'The Final Challenge',
      xp: 25,
      steps: [
        {
          type: 'scenario',
          text: "Final challenge! Your friend says their goal is: 'To save up for a new laptop by the end of the year.'",
        },
        {
          type: 'multiple-choice',
          question: "What's missing from their goal?",
          options: ["It's not Specific.", "It's not Measurable.", "It's not Relevant."],
          correctAnswer: "It's not Measurable.",
          reinforcement: "Exactly! We don't know how much the laptop costs.",
        },
        {
          type: 'concept',
          text: 'Without a target amount, it\'s hard to know how much to save each week. A good goal is a clear map to success!',
        },
        {
          type: 'complete',
          title: 'QUEST COMPLETE!',
          text: "You've mastered 'Creating a Savings Goal'.",
          rewards: {
            xp: 75,
            coins: 10,
          },
        },
      ],
    },
  ],
};
