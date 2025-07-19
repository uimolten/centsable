
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting4: Lesson = {
  id: 'b4',
  title: 'Sticking to Your Budget',
  modules: [
    {
      title: 'What Breaks Budgets?',
      xp: 2,
      steps: [
        {
          type: 'intro',
          text: 'You have a perfect budget plan... but then life happens. This lesson is about how to stick to your budget when things get messy.',
        },
        {
            type: 'multiple-choice',
            question: "Which of these is a common <b>Budget Buster</b> that can wreck a financial plan?",
            options: [
                { id: 'opt1', text: '🍔 Random snack runs' },
                { id: 'opt2', text: '🎉 FOMO when friends invite you out' },
                { id: 'opt3', text: '📱 Surprise expenses like a broken phone' },
                { id: 'opt4', text: 'All of the above' },
            ],
            correctAnswer: 'opt4',
            reinforcement: "Correct—life doesn’t warn you before dropping a surprise expense or tempting you with wants. Today we’ll learn how to make your budget flexible enough to handle it all."
        },
        {
          type: 'concept',
          text: "Budgets break when you don’t prepare for surprises—like your headphones breaking or friends convincing you to go out <b>AGAIN</b> this weekend. These are called <b>Budget Busters</b>: unexpected expenses that smash your plan if you’re not ready.",
        },
        {
            type: 'concept',
            text: "<b>Jargon Highlight: Budget Buster</b> = Surprise cost that wasn’t in your plan (e.g., car repair, vet bill, lost phone). But don’t worry. A strong budget doesn’t break—it bends."
        },
      ],
    },
    {
      title: 'Flexible Budgets',
      xp: 3,
      steps: [
        {
          type: 'concept',
          text: "Here’s the secret: a budget is a living thing—it grows and shifts with you. A <b>Flexible Budget</b> adjusts when your income drops or expenses rise."
        },
        {
          type: 'concept',
          text: "Instead of giving up, you tweak your categories. When money gets tight, you should: <br>✅ Cut back on <b>Wants</b> first. <br>✅ Protect your <b>Needs</b>. <br>✅ Keep <b>Savings</b> a priority, even if smaller.",
        },
        {
          type: 'multiple-choice',
          question: "According to the principles of flexible budgeting, which category should you typically reduce first when money gets tight?",
          options: [
            { id: 'opt1', text: '🎉 Wants' },
            { id: 'opt2', text: '🍽️ Needs' },
            { id: 'opt3', text: '💾 Savings' },
            { id: 'opt4', text: 'None, you should give up' },
          ],
          correctAnswer: 'opt1',
          reinforcement: 'Exactly! Your Wants are the most flexible part of your budget. You always want to protect your Needs.',
        },
      ],
    },
    {
      title: 'Overspending Traps',
      xp: 3,
      steps: [
        {
          type: 'concept',
          text: 'Surprises aren’t the only issue. Watch out for <b>Overspending Traps</b>: situations where you accidentally blow past your budget because you weren’t paying attention.',
        },
        {
          type: 'concept',
          text: "Common traps include too many food deliveries, late-night online shopping, or peer pressure. A great strategy to avoid this is setting a <b>Spending Cap</b> for a category (e.g., '$100 for eating out this month'). Another is the <b>24-Hour Rule</b>: for any big, non-essential purchase, wait a day before buying.",
        },
        {
          type: 'multiple-choice',
          question: 'Which of these are recommended strategies for avoiding overspending traps?',
          options: [
            { id: 'opt1', text: 'Setting a spending cap on "Wants"' },
            { id: 'opt2', text: 'Tracking your spending weekly' },
            { id: 'opt3', text: 'Using the 24-hour rule for big purchases' },
            { id: 'opt4', text: 'All of the above' },
          ],
          correctAnswer: 'opt4',
          reinforcement: "You got it. All of these are great tactics to keep your spending in check!",
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: 'You now have the skills to build a budget that bends, but never breaks. Awesome work!',
          rewards: {
            xp: 8,
            coins: 10,
          },
        },
      ],
    },
  ],
};
