
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting1: Lesson = {
  id: 'b1',
  title: 'Where Does Your Money Go? The Power of Tracking',
  modules: [
    {
      title: 'The Power of Tracking',
      xp: 5,
      steps: [
        {
          type: 'intro',
          text: "New Quest Line: The Money Game Plan! A budget isn't a restriction; it's a strategy to win with your money. First step: become a detective. 🕵️",
        },
        {
          type: 'concept',
          text: "Before you can tell your money where to go, you need to know where it's already going. This is called tracking your expenses.",
        },
        {
          type: 'multiple-choice',
          question: "What's the first step to creating a budget?",
          options: [
            { id: 'opt1', text: 'Guessing your spending' },
            { id: 'opt2', text: 'Tracking your expenses' },
            { id: 'opt3', text: 'Asking friends for money' },
            { id: 'opt4', text: 'Picking stocks to invest in' },
          ],
          correctAnswer: 'opt2',
          reinforcement: "Exactly! You can't make a plan without knowing the facts.",
        },
        {
          type: 'multiple-choice',
          question: "Imagine you bought these things today. Tap all the 'expenses' you should track.",
          options: [
            { id: 'opt1', text: '🍔 Lunch ($10)', image: 'https://picsum.photos/seed/lunch/200/200', imageHint: 'hamburger' },
            { id: 'opt2', text: '🎮 Game Skin ($5)', image: 'https://picsum.photos/seed/gameskin/200/200', imageHint: 'game controller skin' },
            { id: 'opt3', text: '🚌 Bus Fare ($2)', image: 'https://picsum.photos/seed/busfare/200/200', imageHint: 'bus fare ticket' },
            { id: 'opt4', text: 'Compliment from a friend', image: 'https://picsum.photos/seed/friendlychat/200/200', imageHint: 'friendly chat' },
          ],
          correctAnswer: ['opt1', 'opt2', 'opt3'],
        },
        {
          type: 'concept',
          text: "Tracking everything—even tiny purchases—reveals your spending habits. Sometimes the results are surprising! 🤯",
        },
        {
          type: 'complete',
          title: 'QUEST COMPLETE!',
          text: "You've learned the power of being a money detective.",
          rewards: {
            xp: 5,
            coins: 0,
          },
        },
      ],
    },
  ],
};
