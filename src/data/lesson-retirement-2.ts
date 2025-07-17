
import type { Lesson } from '@/types/lesson';

export const lessonRetirement2: Lesson = {
  id: 'r2',
  title: 'The Magic of Time: Your Greatest Superpower',
  modules: [
    {
      title: 'Your Greatest Superpower',
      xp: 8,
      steps: [
        {
          type: 'intro',
          text: "New Quest: Your Greatest Superpower! Your secret weapon isn't money—it's TIME. ⏳ Let's see why.",
        },
        {
          type: 'concept',
          text: "Remember compounding? It's like a magic spell that gets stronger every single year. The more years you have, the more powerful the spell.",
        },
        {
          type: 'scenario',
          text: 'Meet two players: Ava, who starts investing $100 a month at age 15, and Ben, who starts investing the same $100 a month at age 25.',
        },
        {
          type: 'scenario',
          text: "As time goes on, Ava's money grows exponentially and ends up dramatically higher than Ben's, even though he invested for only 10 fewer years.",
          image: "https://placehold.co/400x225",
          imageHint: 'compounding chart comparison',
        },
        {
          type: 'multiple-choice',
          question: 'Who ends up with way more money?',
          options: [
            { id: 'opt1', text: 'Ben' },
            { id: 'opt2', text: 'Ava' },
          ],
          correctAnswer: 'opt2',
          reinforcement: "Right! That 10-year head start made a massive difference. That's the power of time!",
        },
        {
          type: 'fill-in-the-blank',
          question: 'The most important ingredient for compounding is _____.',
          correctAnswer: 'time',
          reinforcement: "You've got it! And you have more of it than anyone.",
        },
        {
          type: 'complete',
          title: 'QUEST COMPLETE!',
          text: 'You understand your superpower.',
          rewards: {
            xp: 8,
            coins: 0,
          },
        },
      ],
    },
  ],
};
