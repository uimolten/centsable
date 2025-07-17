
import type { Lesson } from '@/types/lesson';

export const lessonRetirement1: Lesson = {
  id: 'r1',
  title: 'The Ultimate Endgame: What is Financial Freedom?',
  modules: [
    {
      title: 'What is Financial Freedom?',
      xp: 8,
      steps: [
        {
          type: 'intro',
          text: "New Quest Line Unlocked: Financial Freedom! Forget 'retirement'—that's for old people. This is about building a future where you call the shots. 👑",
        },
        {
          type: 'concept',
          text: 'Financial Freedom means having enough money from your investments to cover your living expenses... forever. Without having to work.',
        },
        {
          type: 'multiple-choice',
          question: 'Financial Freedom means...',
          options: [
            { id: 'opt1', text: 'Winning the lottery' },
            { id: 'opt2', text: 'Never working again because your money works for you' },
            { id: 'opt3', text: 'Getting a high-paying job' },
          ],
          correctAnswer: 'opt2',
          reinforcement: "Exactly! It's about freedom of choice.",
        },
        {
          type: 'multiple-choice',
          question: 'What could you do with Financial Freedom? Tap all that apply!',
          options: [
            { id: 'opt1', text: 'Travel the world ✈️' },
            { id: 'opt2', text: 'Start your own company 💡' },
            { id: 'opt3', text: 'Work on your passion projects 🎨' },
            { id: 'opt4', text: 'Play video games all day 🎮' },
          ],
          correctAnswer: ['opt1', 'opt2', 'opt3', 'opt4'],
        },
        {
          type: 'concept',
          text: "It sounds like a fantasy, but it's a real-life endgame. And the secret weapon to get there is something you have more of than anyone else...",
        },
        {
          type: 'complete',
          title: 'QUEST COMPLETE!',
          text: 'You now know the ultimate goal.',
          rewards: {
            xp: 8,
            coins: 0,
          },
        },
      ],
    },
  ],
};
