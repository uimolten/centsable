
import type { Lesson } from '@/types/lesson';

export const lessonInsurancePractice1: Lesson = {
  id: 'uip1',
  title: 'Practice: Scenario Simulator',
  modules: [
    {
      title: 'Scenario Simulator',
      xp: 15,
      steps: [
        {
          type: 'intro',
          text: "Welcome to the Scenario Simulator! Let's see how your choices play out in real life.",
        },
        {
          type: 'multiple-choice',
          question: "You just moved into your first apartment! You have $100 extra this month. What do you do?",
          options: [
            { id: 'opt1', text: "Buy Renters Insurance ($15/month). It protects my stuff." },
            { id: 'opt2', text: "Skip insurance and buy that new video game ($70)." },
            { id: 'opt3', text: "Save the full $100 for a bigger goal." },
            { id: 'opt4', text: "Invest the $100 in an index fund." },
          ],
          correctAnswer: ['opt1','opt2'], // Both are valid choices to see consequences
          reinforcement: "Let's see what happens..."
        },
        {
          type: 'scenario',
          text: "Oh no, a pipe burst and ruined your laptop!",
          image: "https://placehold.co/400x225",
          imageHint: "burst pipe water damage"
        },
        {
            type: 'concept',
            text: "<b>If you bought insurance:</b> You file a claim. You pay your $250 deductible, and insurance covers the rest for a new $1,200 laptop. You only lost $250 instead of $1,200! <b>YOU WIN!</b>",
        },
        {
            type: 'concept',
            text: "<b>If you skipped insurance:</b> Because you didn't have insurance, you have to pay the full $1,200 for a new one out of your own pocket. <b>GAME OVER!</b>",
        },
        {
          type: 'complete',
          title: 'PRACTICE COMPLETE!',
          text: 'You see how a small choice can make a huge difference.',
          rewards: {
            xp: 15,
            coins: 0,
          },
        },
      ],
    },
  ],
};
