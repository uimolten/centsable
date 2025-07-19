
import type { Lesson } from '@/types/lesson';

export const lessonInvesting3: Lesson = {
  id: 'i3',
  title: 'Choosing Your Gear: Types of Investments',
  modules: [
    {
      title: 'Gear Up!',
      xp: 8,
      steps: [
        {
          type: 'intro',
          text: "Quest Accepted: Choosing Your Gear! To be a successful investor, you need the right equipment. Let's gear up!",
        },
        {
          type: 'concept',
          text: "The first piece of gear is a <b>Stock</b>. Buying a stock means you own a tiny piece of a company, like Apple or Nike. It's like having a powerful but risky magic sword! ⚔️",
          image: 'https://placehold.co/400x225',
          imageHint: 'magic sword',
        },
        {
          type: 'multiple-choice',
          question: 'If you own a stock, you own a piece of a...?',
          options: [
            { id: 'opt1', text: 'Country' },
            { id: 'opt2', text: 'Company' },
            { id: 'opt3', text: 'Planet' },
            { id: 'opt4', text: 'Bank' },
          ],
          correctAnswer: 'opt2',
          reinforcement: "Exactly! You're a part-owner.",
        },
        {
          type: 'concept',
          text: "Next up is a <b>Bond</b>. A bond is basically a loan you give to a company or government. They promise to pay you back with extra 'interest'. It's like a sturdy, reliable shield. 🛡️",
          image: 'https://placehold.co/400x225',
          imageHint: 'magic shield',
        },
        {
          type: 'multiple-choice',
          question: "Which one is like OWNING a piece of a company?",
          options: [
            { id: 'stock', text: 'Stock', image: 'https://placehold.co/200x200.png', imageHint: 'sword icon' },
            { id: 'bond', text: 'Bond', image: 'https://placehold.co/200x200.png', imageHint: 'shield icon' },
            { id: 'mutual_fund', text: 'Mutual Fund', image: 'https://placehold.co/200x200.png', imageHint: 'inventory bag' },
            { id: 'savings_account', text: 'Savings Account', image: 'https://placehold.co/200x200.png', imageHint: 'bank building' },
          ],
          correctAnswer: 'stock',
          reinforcement: "That's it! Stocks = Ownership.",
        },
        {
          type: 'concept',
          text: "Finally, there are <b>Mutual Funds</b> and <b>ETFs</b>. Think of these as a pre-made inventory bag 🎒 full of many different stocks and bonds. It's an easy way to get a mix of everything!",
          image: 'https://placehold.co/400x225',
          imageHint: 'inventory bag',
        },
        {
          type: 'fill-in-the-blank',
          question: "A fund that holds a collection of many investments is called a _______ _____.",
          correctAnswer: 'Mutual Fund/ETF',
          reinforcement: "Perfect! It's like an instant collection.",
        },
        {
          type: 'complete',
          title: 'QUEST COMPLETE!',
          text: "You've geared up with investment knowledge!",
          rewards: {
            xp: 8,
            coins: 10,
          },
        },
      ],
    },
  ],
};
