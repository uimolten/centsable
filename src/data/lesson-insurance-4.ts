
import type { Lesson } from '@/types/lesson';

export const lessonInsurance4: Lesson = {
  id: 'ui4',
  title: 'Choosing Your Shield: How to Pick a Policy',
  modules: [
    {
      title: 'Choosing Your Shield',
      xp: 5,
      steps: [
        {
          type: 'intro',
          text: "Final Quest: Choosing Your Shield! How do you pick the right insurance? It's all about balancing cost and protection.",
        },
        {
          type: 'concept',
          text: "Here's the main trade-off:<br>A <b>LOWER</b> deductible (the part you pay) usually means a <b>HIGHER</b> premium (your monthly bill).",
          image: "https://picsum.photos/seed/seesaw1/400/225",
          imageHint: "seesaw balance low deductible high premium",
        },
        {
          type: 'concept',
          text: "And a <b>HIGHER</b> deductible (you pay more upfront) usually means a <b>LOWER</b> premium (your monthly bill is cheaper).",
          image: "https://picsum.photos/seed/seesaw2/400/225",
          imageHint: "seesaw balance high deductible low premium",
        },
        {
          type: 'multiple-choice',
          question: 'If you want the cheapest monthly bill, you should choose a policy with a...?',
          options: [
            { id: 'opt1', text: 'Higher Deductible' },
            { id: 'opt2', text: 'Lower Deductible' },
          ],
          correctAnswer: 'opt1',
          reinforcement: 'Right! But you have to be prepared to pay more if something happens.',
        },
        {
          type: 'complete',
          title: 'UNIT COMPLETE!',
          text: "You're ready to make smart choices about protection!",
          rewards: {
            xp: 5,
            coins: 0,
          },
        },
      ],
    },
  ],
};
