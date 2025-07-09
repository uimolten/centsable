
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting4: Lesson = {
  id: 'b4',
  title: 'Sticking to Your Budget',
  modules: [
    {
      title: 'The Budget Buster Quiz',
      xp: 15,
      steps: [
        {
          type: 'intro',
          text: 'You have a perfect budget plan... but then life happens. This lesson is about how to stick to your budget when things get messy.',
        },
        {
          type: 'multiple-choice',
          question: 'Which of these is most likely to blow up your budget?',
          options: [
            { id: 'opt1', text: '🍔 Random snack runs' },
            { id: 'opt2', text: '🎉 FOMO when friends invite you out' },
            { id: 'opt3', text: '📱 Surprise expenses like a broken phone' },
            { id: 'opt4', text: '✅ All of the above' },
          ],
          correctAnswer: 'opt4',
          reinforcement: 'Correct! Life doesn’t warn you before dropping a surprise expense or tempting you with wants. A strong budget needs to be flexible.',
        },
      ],
    },
    {
      title: 'Flexible Budgets',
      xp: 25,
      steps: [
        {
          type: 'concept',
          text: 'First, let*s talk about surprises. A <b>Budget Buster</b> is any unexpected expense that smashes your plan if you’re not ready.',
        },
        {
          type: 'concept',
          text: 'A strong budget doesn’t break—it bends. A <b>Flexible Budget</b> is one that can adjust when your income changes or expenses pop up. Instead of giving up, you tweak your categories.',
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
          reinforcement: 'Exactly! Wants are the easiest and safest category to adjust when money gets tight.',
        },
      ],
    },
    {
      title: 'Overspending Traps',
      xp: 30,
      steps: [
        {
          type: 'concept',
          text: 'Surprises aren*t the only issue. <b>Overspending Traps</b> are situations where you accidentally blow past your budget because you weren’t paying attention, like too many food deliveries or late-night online shopping.',
        },
        {
          type: 'concept',
          text: "Here's how to avoid them. You can set a <b>Spending Cap</b>, which is a hard limit for a category (like '$100 for eating out'). You can also use the <b>24-Hour Rule</b>: for any non-essential purchase over a certain amount (say, $50), wait 24 hours before buying it. You'll be surprised how often you decide you don't need it!",
        },
        {
          type: 'scenario',
          text: "Your monthly budget for 'Wants' is <b>$150</b>. You've already spent <b>$120</b>. You see a new hoodie for <b>$40</b>. What's the best move?",
        },
        {
          type: 'multiple-choice',
          question: 'What do you do?',
          options: [
            { id: 'opt1', text: 'Buy it anyway, you can just overspend this month.' },
            { id: 'opt2', text: 'Use your Emergency Fund to buy it.' },
            { id: 'opt3', text: 'Wait until next month when your budget resets.' },
            { id: 'opt4', text: 'Use money from your Needs category.' },
          ],
          correctAnswer: 'opt3',
          reinforcement: 'Great choice! That shows real discipline. Delaying gratification is a financial superpower.',
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
