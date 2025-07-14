
import type { Lesson } from '@/types/lesson';

export const lessonInvesting1: Lesson = {
  id: 'i1',
  title: 'What is Investing? The Power of Compounding',
  modules: [
    {
      title: 'The Power of Compounding',
      xp: 5,
      steps: [
        {
          type: 'intro',
          text: "New Quest Unlocked: Intro to Investing! You've learned how to save money. Now, let's learn how to make your money work for you. 💪",
        },
        {
          type: 'concept',
          text: "<b>Saving</b> is keeping your money safe in a piggy bank or account. It's super important, but it doesn't really grow.",
          image: 'https://placehold.co/400x225',
          imageHint: 'piggy bank',
        },
        {
          type: 'concept',
          text: '<b>Investing</b> is like planting a money seed. 🌱 You put your money into something that has the potential to grow into a much bigger money tree over time.',
          image: 'https://placehold.co/400x225',
          imageHint: 'money tree grow',
        },
        {
          type: 'tap-the-pairs',
          instructions: 'Match the action to the description!',
          pairs: [
            { term: 'Saving', definition: 'Keeping money safe' },
            { term: 'Investing', definition: 'Helping money grow' },
          ],
        },
        {
          type: 'concept',
          text: 'Now for the real magic: <b>Compounding</b>! ✨ This is the most powerful level-up in finance.',
          image: 'https://placehold.co/400x225',
          imageHint: 'magic sparkle',
        },
        {
          type: 'concept',
          text: "Watch what happens. Your money tree grows a few coins (your 'return'). But with compounding, those new coins grow their <b><i>OWN</i></b> little branches and coins! 🤯",
          image: 'https://placehold.co/400x225',
          imageHint: 'compounding chart',
        },
        {
          type: 'fill-in-the-blank',
          question: "When your earnings start earning their own money, it's called ___________.",
          correctAnswer: 'compounding',
          reinforcement: "You got it! It's a snowball effect for your money!",
        },
        {
          type: 'complete',
          title: 'QUEST COMPLETE!',
          text: "You've learned about the power of compounding!",
          rewards: {
            xp: 5,
            coins: 5,
          },
        },
      ],
    },
  ],
};
