
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting4: Lesson = {
  id: 'b4',
  title: 'Sticking to Your Budget',
  modules: [
    {
      title: 'What Breaks Budgets?',
      xp: 20,
      steps: [
        {
          type: 'intro',
          text: 'You have a perfect budget plan... but then life happens. This lesson is about how to stick to your budget when things get messy.',
        },
        {
          type: 'concept',
          text: "A <b>Budget Buster</b> is any unexpected expense that smashes your plan if you're not ready. But don't worry, a strong budget doesn't break—it bends.",
        },
        {
          type: 'concept',
          text: "How do you fight a Budget Buster? With your 🛟 <b>Emergency Fund</b>! This is exactly what that special savings we set up in the last lesson is for.",
        },
      ],
    },
    {
      title: 'Flexible Budgets',
      xp: 25,
      steps: [
        {
          type: 'concept',
          text: 'The secret is a <b>Flexible Budget</b>. It’s a plan that can adjust when your income changes or unexpected expenses pop up.',
        },
        {
          type: 'concept',
          text: "Instead of giving up, you tweak your categories. Remember how we sorted <b>Needs</b> and <b>Wants</b>? When money gets tight, your 'Wants' category is the first place to look for cuts.",
        },
        {
          type: 'multiple-choice',
          question: 'If you suddenly needed to cut $50 from your budget, which category should you pull from first?',
          options: [
            { id: 'opt1', text: '🎉 Wants' },
            { id: 'opt2', text: '🍽️ Needs' },
            { id: 'opt3', text: '💾 Savings' },
            { id: 'opt4', text: 'It is impossible' },
          ],
          correctAnswer: 'opt1',
          reinforcement: 'Exactly! Your Wants are the most flexible part of your budget. You always want to protect your Needs.',
        },
      ],
    },
    {
      title: 'Overspending Traps',
      xp: 25,
      steps: [
        {
          type: 'concept',
          text: 'Surprises aren’t the only issue. Watch out for <b>Overspending Traps</b>: situations where you accidentally blow past your budget because you weren’t paying attention.',
        },
        {
          type: 'concept',
          text: "A great strategy to avoid this is setting a <b>Spending Cap</b>. This is a hard limit for a category (e.g., '$100 for eating out this month'). Another is the <b>24-Hour Rule</b>: for any big, non-essential purchase, wait a day before buying. You'll be surprised how often you decide you don't need it!",
        },
        {
          type: 'multiple-choice',
          question: 'Which of these is an example of an Overspending Trap?',
          options: [
            { id: 'opt1', text: 'Paying your phone bill.' },
            { id: 'opt2', text: 'Putting money in savings.' },
            { id: 'opt3', text: 'Late-night online shopping sprees.' },
            { id: 'opt4', text: 'An unexpected car repair.' },
          ],
          correctAnswer: 'opt3',
          reinforcement: "You got it. That's a classic trap where small purchases can add up fast!",
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: 'You now have the skills to build a budget that bends, but never breaks. Awesome work!',
          rewards: {
            xp: 70,
            coins: 10,
          },
        },
      ],
    },
  ],
};
