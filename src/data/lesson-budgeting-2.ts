
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting2: Lesson = {
  id: 'b2',
  title: 'The 50/30/20 Rule: Your Ultimate Cheat Code',
  modules: [
    {
      title: 'The Ultimate Cheat Code',
      xp: 7,
      steps: [
        {
          type: 'intro',
          text: "New Quest: The Ultimate Cheat Code! Budgeting doesn't have to be complicated. Let's learn a famous strategy: the <b>50/30/20 rule</b>.",
        },
        {
          type: 'concept',
          text: "The rule splits your after-tax income into three buckets:<br><b>50% for Needs</b><br><b>30% for Wants</b><br><b>20% for Savings</b>",
          image: "https://placehold.co/400x225",
          imageHint: 'three buckets color coded'
        },
        {
          type: 'tap-the-pairs',
          instructions: "Match the category to its percentage!",
          pairs: [
            { term: 'Needs', definition: '50%' },
            { term: 'Wants', definition: '30%' },
            { term: 'Savings', definition: '20%' },
          ],
        },
        {
          type: 'interactive-sort',
          instructions: "Let's categorize! Drag these expenses to the right bucket.",
          box1Label: 'Needs',
          box2Label: 'Wants',
          items: [
            { id: 'item-1', text: 'Rent', correctBox: 'box1' },
            { id: 'item-2', text: 'Video Games', correctBox: 'box2' },
            { id: 'item-3', text: 'Emergency Fund', correctBox: 'box1' }, // Savings is a need for financial health
            { id: 'item-4', text: 'Groceries', correctBox: 'box1' },
            { id: 'item-5', text: 'Movie Tickets', correctBox: 'box2' },
          ],
        },
        {
          type: 'concept',
          text: "This rule is a guideline, not a law! It's a starting point to help you balance living your life now and planning for your future.",
        },
        {
          type: 'fill-in-the-blank',
          question: "The 50/30/20 rule recommends putting <b>____%</b> of your income towards savings.",
          correctAnswer: '20',
          reinforcement: "Perfect! Paying your future self is a top priority.",
        },
        {
          type: 'complete',
          title: 'QUEST COMPLETE!',
          text: "You've learned the 50/30/20 cheat code.",
          rewards: {
            xp: 7,
            coins: 10,
          },
        },
      ],
    },
  ],
};
