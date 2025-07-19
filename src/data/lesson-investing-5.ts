
import type { Lesson } from '@/types/lesson';

export const lessonInvesting5: Lesson = {
  id: 'i5',
  title: 'Starting Your Quest: How to Actually Invest',
  modules: [
    {
      title: 'Enter the Game World',
      xp: 5,
      steps: [
        {
          type: 'intro',
          text: "Final Quest: Starting Your Adventure! You have the knowledge and the gear. Now it's time to enter the game world.",
        },
        {
          type: 'concept',
          text: "To invest in real life, you need a special <b>Brokerage Account</b>. Think of it as your official player profile that lets you buy and sell stocks, bonds, and funds.",
          image: 'https://placehold.co/400x225',
          imageHint: 'player profile',
        },
        {
          type: 'concept',
          text: "If you're under 18, you'll need a parent or guardian to help you open a <b>Custodial Account</b>. It's your account, but they help manage it until you're an adult.",
          image: 'https://placehold.co/400x225',
          imageHint: 'adult child team',
        },
        {
          type: 'multiple-choice',
          question: "What might a teen need to start investing?",
          options: [
            { id: 'opt1', text: 'A savings account' },
            { id: 'opt2', text: 'A custodial account' },
            { id: 'opt3', text: 'A video game account' },
            { id: 'opt4', text: 'A checking account' },
          ],
          correctAnswer: 'opt2',
          reinforcement: "That's the one! You're ready to go.",
        },
        {
          type: 'concept',
          text: "One of the most popular starting investments is an <b>Index Fund</b>. It's a type of ETF that holds hundreds of stocks (like the S&P 500), making it instantly diversified. It's a great 'starter pack' for new investors!",
          image: 'https://placehold.co/400x225',
          imageHint: 'starter pack',
        },
        {
          type: 'complete',
          title: 'QUEST COMPLETE!',
          text: 'You now know the first steps to start your investing adventure!',
          rewards: {
            xp: 5,
            coins: 5,
          },
        },
      ],
    },
  ],
};
