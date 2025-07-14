
import type { Lesson } from '@/types/lesson';

export const lessonTaxes1: Lesson = {
  id: 't1',
  title: 'Why Taxes Matter',
  modules: [
    {
      title: 'Why Taxes Matter',
      xp: 8,
      steps: [
        {
          type: 'intro',
          text: "Let's talk taxes! Imagine you earn $100. When you get paid, it’s $92. What happened to the other $8?",
        },
        {
            type: 'multiple-choice',
            question: "What happened to the other $8?",
            options: [
                { id: 'opt1', text: 'Went to savings' },
                { id: 'opt2', text: 'Taxes' },
                { id: 'opt3', text: 'Disappeared' },
                { id: 'opt4', text: 'Tip to parents' },
            ],
            correctAnswer: 'opt2',
            reinforcement: 'That $8? Taxes. But where does it actually go? Let’s find out.',
        },
        {
          type: 'concept',
          text: "Taxes are money you pay to the government to fund things we all use: roads, schools, firefighters, police, hospitals, and public health. It’s like pitching in for the world’s biggest group project.",
          image: "https://placehold.co/400x225",
          imageHint: 'community services'
        },
        {
          type: 'concept',
          text: "Jargon Highlight! <b>Tax</b> is money paid to the government for public services. <b>Revenue</b> is the money the government collects from taxes.",
        },
        {
          type: 'concept',
          text: "There are different kinds of taxes. <b>Income Tax</b> is taken from your paycheck. <b>Sales Tax</b> is added when you buy things. <b>Property Tax</b> is paid by homeowners. <b>Payroll Taxes</b> are for Social Security & Medicare."
        },
        {
            type: 'goal-builder',
            instructions: 'Which tax do you think you’ll pay first in your life?',
            inputType: 'text',
            placeholder: 'e.g., Sales tax',
            storageKey: 'firstTax',
        },
        {
            type: 'goal-builder',
            instructions: 'If taxes disappeared tomorrow, what’s one thing in your community that would change?',
            inputType: 'text',
            placeholder: 'e.g., The roads might get bumpy',
            storageKey: 'taxImpact',
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You've learned the 'why' behind taxes. You're ready for the next step!",
          rewards: {
            xp: 8,
            coins: 5,
          },
        },
      ],
    },
  ],
};
