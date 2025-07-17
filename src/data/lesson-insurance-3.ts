
import type { Lesson } from '@/types/lesson';

export const lessonInsurance3: Lesson = {
  id: 'ui3',
  title: "Leveling Up: Types of Insurance You'll Actually Need",
  modules: [
    {
      title: 'Essential Gear',
      xp: 7,
      steps: [
        {
          type: 'intro',
          text: "New Quest: Leveling Up! There are many types of insurance, but let's focus on the ones you might need soon.",
        },
        {
          type: 'concept',
          text: "<b>Auto Insurance</b> is required by law if you drive a car. It covers accidents, damage to your car, and injuries. It's non-negotiable!",
          image: "https://placehold.co/400x225",
          imageHint: "car shield",
        },
        {
          type: 'concept',
          text: "<b>Health Insurance</b> helps pay for doctor visits and medicine when you're sick or hurt. You're probably on your parents' plan now, but it's super important to have.",
          image: "https://placehold.co/400x225",
          imageHint: "first aid kit",
        },
        {
          type: 'concept',
          text: "<b>Renters Insurance</b> is a life-saver if you ever rent an apartment. It protects your stuff (like your computer and clothes) from things like theft or fire for just a few dollars a month.",
          image: "https://placehold.co/400x225",
          imageHint: "house shield contents",
        },
        {
          type: 'multiple-choice',
          question: 'Which insurance protects your stuff in an apartment?',
          options: [
            { id: 'opt1', text: 'Auto Insurance' },
            { id: 'opt2', text: 'Health Insurance' },
            { id: 'opt3', text: 'Renters Insurance' },
          ],
          correctAnswer: 'opt3',
        },
        {
          type: 'complete',
          title: 'QUEST COMPLETE!',
          text: 'You know your essential gear.',
          rewards: {
            xp: 7,
            coins: 0,
          },
        },
      ],
    },
  ],
};
