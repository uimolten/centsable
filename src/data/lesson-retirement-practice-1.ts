
import type { Lesson } from '@/types/lesson';

export const lessonRetirementPractice1: Lesson = {
  id: 'rp1',
  title: 'Practice: Your First Freedom Plan',
  modules: [
    {
      title: 'Future Simulator',
      xp: 15,
      steps: [
        {
          type: 'intro',
          text: "Welcome to the Future Simulator! 🔮 Let's see how powerful starting early really is. No wrong answers here, just exploration.",
        },
        {
          type: 'scenario',
          text: "Let's create two investors. Player 1 (You!) starts investing today. Player 2 (Your Friend) decides to wait 10 years to start.",
        },
        {
          type: 'goal-builder',
          instructions: 'How much can you invest per month? (Even a small amount works!)',
          inputType: 'number',
          placeholder: 'e.g. 50',
          storageKey: 'monthlyInvestment',
        },
        {
          type: 'concept',
          text: "Now, let's fast forward! This graph shows your money growing in a Roth IRA. Watch the compounding magic!",
          image: 'https://picsum.photos/seed/chart/800/450',
          imageHint: 'compounding chart comparison',
        },
        {
          type: 'concept',
          text: "Wow! By starting just 10 years earlier with the same amount of money, you could end up with almost 3x more! That's the superpower of time.",
        },
        {
          type: 'complete',
          title: 'PRACTICE COMPLETE!',
          text: "You've seen the future, and it's bright!",
          rewards: {
            xp: 15,
            coins: 0,
          },
        },
      ],
    },
  ],
};
