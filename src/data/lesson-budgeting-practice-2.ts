
import type { Lesson } from '@/types/lesson';

export const lessonBudgetingPractice2: Lesson = {
  id: 'bp2',
  title: 'Practice: Budget Scenarios',
  modules: [
    {
      title: 'Practice Dojo',
      xp: 15,
      steps: [
        {
          type: 'intro',
          text: "Time to practice your flexibility! A budget that can't bend will break. Let's practice making adjustments in real-world scenarios.",
        },
        {
          type: 'scenario',
          text: 'You earn <b>$400</b> a month. Using the 50/30/20 rule, your budget is: <br>• Needs: <b>$200</b> <br>• Wants: <b>$120</b> <br>• Savings: <b>$80</b>',
        },
        {
          type: 'multiple-choice',
          question: 'This month, you got fewer shifts and only made <b>$300</b>. Your Needs are still <b>$200</b>. What is the most responsible way to adjust?',
          options: [
            { id: 'opt1', text: 'Spend less on Needs.' },
            { id: 'opt2', text: 'Take all the money from Savings.' },
            { id: 'opt3', text: "Reduce your 'Wants' spending and try to save a little." },
            { id: 'opt4', text: 'Go into debt by $100.' },
          ],
          correctAnswer: 'opt3',
          reinforcement: 'Exactly right. You protect your Needs, cut back on Wants, and still try to save something, even if it’s small.',
        },
        {
          type: 'scenario',
          text: "New scenario! Your income is back to <b>$400</b>. But suddenly, your laptop for school breaks! A repair costs <b>$150</b>. This is a Budget Buster!",
        },
        {
          type: 'multiple-choice',
          question: "You have <b>$50</b> in your Emergency Fund. What's the smartest way to handle this?",
          options: [
            { id: 'opt1', text: "Skip paying your phone bill to get it fixed." },
            { id: 'opt2', text: "Use your $50 Emergency Fund and take the remaining $100 from your 'Wants' category." },
            { id: 'opt3', text: 'Take the full $150 from your long-term car savings.' },
            { id: 'opt4', text: 'Ignore it and hope the laptop fixes itself.' },
          ],
          correctAnswer: 'opt2',
          reinforcement: "Perfect! You used your emergency fund for its exact purpose and made a trade-off with your wants. That's excellent budget management.",
        },
        {
          type: 'complete',
          title: 'PRACTICE COMPLETE!',
          text: 'You’ve shown you can adapt to real-world money situations. Excellent!',
          rewards: {
            xp: 15,
            coins: 5,
          },
        },
      ],
    },
  ],
};
