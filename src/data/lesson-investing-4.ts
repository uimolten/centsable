
import type { Lesson } from '@/types/lesson';

export const lessonInvesting4: Lesson = {
  id: 'i4',
  title: "Don't Put All Your Items in One Slot: Diversification",
  modules: [
    {
      title: 'Balanced Inventory',
      xp: 60,
      steps: [
        {
          type: 'intro',
          text: "New Quest: Don't Put All Your Items in One Slot! You've got your gear, but how you carry it is just as important. Let's learn the art of diversification.",
        },
        {
          type: 'concept',
          text: "<b>Diversification</b> is a fancy word for not putting all your eggs (or money) in one basket. It's about spreading your investments out to lower your overall risk.",
          image: 'https://placehold.co/400x225',
          imageHint: 'eggs basket',
        },
        {
          type: 'multiple-choice',
          question: "Imagine you only invested in one company: 'IceCreamz Inc.' What happens if a huge snowstorm hits?",
          options: [
            { id: 'opt1', text: 'My investment probably goes UP 📈' },
            { id: 'opt2', text: 'My investment probably goes DOWN 📉' },
            { id: 'opt3', text: 'Nothing happens' },
            { id: 'opt4', text: 'The company gives me free ice cream' },
          ],
          correctAnswer: 'opt2',
          reinforcement: "Exactly! Your whole investment is at risk.",
        },
        {
          type: 'concept',
          text: "Now, what if you also invested in 'Sunscreen Corp' and 'Hot Chocolate Co.'? If the Ice Cream stock goes down, your other investments might go up, balancing things out!",
          image: 'https://placehold.co/400x225',
          imageHint: 'balance scale',
        },
        {
          type: 'fill-in-the-blank',
          question: 'Spreading your investments around to reduce risk is called __________________.',
          correctAnswer: 'diversification',
          reinforcement: "You're a pro! 🧠",
        },
        {
          type: 'complete',
          title: 'QUEST COMPLETE!',
          text: "You've learned how to build a balanced inventory!",
          rewards: {
            xp: 60,
            coins: 10,
          },
        },
      ],
    },
  ],
};
