
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting5: Lesson = {
  id: 'b5',
  title: 'Flexible Budgeting & Real-World Practice',
  modules: [
    {
      title: 'Budgets Aren’t Set in Stone',
      xp: 20,
      steps: [
        {
          type: 'intro',
          text: "Your budget is a living document, not a stone tablet. Life happens! Let's talk about how to make your budget flexible.",
        },
        {
          type: 'concept',
          text: 'Maybe your income drops one month (fewer work shifts) or an expense spikes (those concert tickets finally went on sale!). The key is knowing how to adjust.',
          image: 'https://placehold.co/400x225',
          imageHint: 'adjusting knobs',
        },
        {
          type: 'multiple-choice',
          question: "If you suddenly had to cut <b>$50</b> from your budget, which category is the best place to look first?",
          options: [
            { id: 'opt1', text: '🎉 Wants' },
            { id: 'opt2', text: '🍽️ Needs' },
            { id: 'opt3', text: '💾 Savings' },
            { id: 'opt4', text: "It's impossible to cut anything." },
          ],
          correctAnswer: 'opt1',
          reinforcement: 'Exactly! Wants are the most flexible category. You should always try to protect your Needs and Savings.',
        },
      ],
    },
    {
        title: 'A Real Budget Example',
        xp: 20,
        steps: [
            {
                type: 'scenario',
                text: "Let's see the 50/30/20 rule in action. Alex earns <b>$800/month</b> from a part-time job.",
            },
            {
                type: 'concept',
                text: "Here’s how Alex could split it:<br>Needs (50%): <b>$400</b><br>Wants (30%): <b>$240</b><br>Savings (20%): <b>$160</b>",
            },
            {
                type: 'multiple-choice',
                question: "If your income was <b>$600/month</b>, what would your 'Wants' category be under the 50/30/20 rule?",
                options: [
                    { id: 'opt1', text: '$300' },
                    { id: 'opt2', text: '$120' },
                    { id: 'opt3', text: '$180' },
                    { id: 'opt4', text: '$60' },
                ],
                correctAnswer: 'opt3',
                reinforcement: "You got it! 30% of $600 is $180. See how it scales?",
            }
        ]
    },
    {
      title: 'Build Your Plan & Vocab Recap',
      xp: 20,
      steps: [
        {
          type: 'fill-in-the-blank',
          question: "What's <b>ONE</b> thing you'd want to save for if you started a budget today? ________",
          correctAnswer: 'Anything!',
          reinforcement: "Awesome! Naming your goal is the first step to achieving it.",
        },
        {
            type: 'tap-the-pairs',
            instructions: 'Time for a vocab recap! Match the term to its definition.',
            pairs: [
              { term: 'Budget', definition: 'A money plan for income and expenses.' },
              { term: '50/30/20 Rule', definition: 'Split income: 50% Needs, 30% Wants, 20% Savings.' },
              { term: 'Pay Yourself First', definition: 'Save money first, before spending.' },
              { term: 'Emergency Fund', definition: 'Money set aside for unexpected costs.' },
            ],
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You've got the tools and knowledge to build a real budget that works for YOU.",
          rewards: {
            xp: 60,
            coins: 10,
          },
        },
      ],
    },
  ],
};
