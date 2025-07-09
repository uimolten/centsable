
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting4: Lesson = {
  id: 'b4',
  title: 'Sticking to Your Budget',
  modules: [
    {
      title: 'The Budget Buster Quiz',
      xp: 10,
      steps: [
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
          reinforcement: 'Correct—life doesn’t warn you before dropping a surprise expense or tempting you with wants. Today we’ll learn how to make your budget flexible enough to handle it all.',
        },
      ],
    },
    {
      title: 'What Breaks Budgets?',
      xp: 10,
      steps: [
        {
          type: 'concept',
          text: 'Budgets break when you don’t prepare for surprises—like your headphones breaking or friends convincing you to go out AGAIN this weekend.',
        },
        {
          type: 'concept',
          text: 'These are called <b>Budget Busters</b>: unexpected expenses that smash your plan if you’re not ready. A Budget Buster is a surprise cost that wasn’t in your plan (e.g., car repair, vet bill, lost phone).',
        },
        {
          type: 'concept',
          text: 'But don’t worry. A strong budget doesn’t break—it <b>bends</b>.',
        },
      ],
    },
    {
      title: 'Flexible Budgets',
      xp: 15,
      steps: [
        {
          type: 'concept',
          text: 'Here’s the secret: a budget is a living thing—it grows and shifts with you.',
        },
        {
          type: 'concept',
          text: '💡 A <b>Flexible Budget</b> adjusts when: <br> • Your income drops (fewer shifts at work) <br> • Expenses rise (bus fare increases, new class fees)',
        },
        {
          type: 'concept',
          text: 'Instead of giving up, you tweak your categories: <br>✅ Cut back on <b>Wants</b> first <br>✅ Delay non-urgent spending <br>✅ Protect your <b>Needs</b> and <b>Savings</b> as much as possible',
        },
        {
          type: 'multiple-choice',
          question: 'If you suddenly needed to cut $50 from your budget, which category would you pull from first?',
          options: [
            { id: 'opt1', text: '🎉 Wants' },
            { id: 'opt2', text: '🍽️ Needs' },
            { id: 'opt3', text: '💾 Savings' },
            { id: 'opt4', text: 'None, I give up.' },
          ],
          correctAnswer: 'opt1',
          reinforcement: 'Wants are the easiest and safest category to adjust when money gets tight.',
        },
      ],
    },
    {
      title: 'Overspending Traps',
      xp: 15,
      steps: [
        {
          type: 'concept',
          text: 'Overspending doesn’t always happen because of emergencies. Sometimes it’s sneaky: <br>🍔 Too many food deliveries <br>🛍️ Late-night online shopping <br>🎉 Peer pressure to go out every weekend',
        },
        {
          type: 'concept',
          text: 'These are called <b>Overspending Traps</b>: situations where you accidentally blow past your budget because you weren’t paying attention.',
        },
        {
          type: 'concept',
          text: 'Strategies to Avoid Traps: <br>✅ 💳 Set a <b>Spending Cap</b>: a hard limit for Wants (like $150/month). <br>✅ 📱 Track spending weekly using an app or notebook. <br>✅ ⏳ Wait 24 hours before big purchases.',
        },
        {
          type: 'multiple-choice',
          question: 'Which strategy would you try first to stay within your budget?',
          options: [
            { id: 'opt1', text: 'Set a Spending Cap' },
            { id: 'opt2', text: 'Track Weekly' },
            { id: 'opt3', text: '24-Hour Rule' },
            { id: 'opt4', text: "I'll try all of them!" },
          ],
          correctAnswer: 'opt4',
          reinforcement: "That's the spirit! Trying different strategies helps you find what works best for you.",
        },
      ],
    },
    {
      title: 'Curveball Budget Shuffle',
      xp: 20,
      steps: [
        {
          type: 'scenario',
          text: "You’re Alex. Here’s your monthly budget: <br>Needs: <b>$500</b> <br>Wants: <b>$300</b> <br>Savings: <b>$200</b>",
        },
        {
          type: 'scenario',
          text: 'Suddenly… 📱 Your phone screen cracks. Repair cost: <b>$150</b>. This is a <b>Budget Buster</b> that needs to be paid.',
        },
        {
          type: 'multiple-choice',
          question: 'How should you adjust your budget to pay for the repair?',
          options: [
            { id: 'opt1', text: 'Take all $150 from Savings. (New Savings: $50)' },
            { id: 'opt2', text: 'Take all $150 from Wants. (New Wants: $150)' },
            { id: 'opt3', text: 'Take $100 from Wants and $50 from Savings. (Wants: $200, Savings: $150)' },
            { id: 'opt4', text: 'Take it from Needs, you can skip some meals. (Bad idea!)' },
          ],
          correctAnswer: 'opt3',
          reinforcement: 'Great choice! This is a balanced approach. You cut back on fun stuff but also dip into savings a little, protecting both your needs and your long-term goals.',
        },
      ],
    },
    {
      title: 'Motivation & Wrap-Up',
      xp: 10,
      steps: [
        {
          type: 'concept',
          text: 'Budgeting isn’t about perfection—it’s about consistency. Like working out, missing one session doesn’t mean you quit. You reset and keep going.',
        },
        {
          type: 'concept',
          text: 'Staying motivated means reminding yourself WHY you’re budgeting: big goals, less stress, more freedom.',
        },
        {
          type: 'goal-builder',
          instructions: 'What’s one budgeting strategy you’ll use to stick with your plan next month? Why?',
          inputType: 'text',
          placeholder: "e.g., I'll try the 24-hour rule...",
          storageKey: 'strategy',
        },
        {
          type: 'tap-the-pairs',
          instructions: 'Final vocab check! Match the term to its definition.',
          pairs: [
            { term: 'Budget Buster', definition: 'A surprise expense that wasn’t in your plan.' },
            { term: 'Flexible Budget', definition: 'A plan that adjusts when income or expenses change.' },
            { term: 'Overspending Trap', definition: 'Situations that cause you to spend more than you planned.' },
            { term: 'Spending Cap', definition: 'A set limit on how much you’ll spend in a certain category.' },
            { term: 'Emergency Fund', definition: 'Money set aside for unexpected costs (from last lesson!).' },
          ],
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: 'You now have the skills to build a budget that bends, but never breaks. Awesome work!',
          rewards: {
            xp: 80,
            coins: 15,
          },
        },
      ],
    },
  ],
};
