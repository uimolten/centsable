
import type { Lesson } from '@/types/lesson';

export const lessonBudgetingPractice2: Lesson = {
  id: 'bp2',
  title: 'Practice: Adjusting Your Budget',
  modules: [
    {
      title: 'Practice Dojo',
      xp: 40,
      steps: [
        {
          type: 'intro',
          text: "Time to practice your flexibility! A budget that can't bend will break. Let's practice making adjustments.",
        },
        {
          type: 'scenario',
          text: "Your monthly income is usually <b>$400</b>. You have a 50/30/20 budget: <b>$200</b> for Needs, <b>$120</b> for Wants, and <b>$80</b> for Savings.",
        },
        {
          type: 'multiple-choice',
          question: "This month, you got fewer shifts and only made <b>$300</b>. Your Needs are still <b>$200</b>. What's the most responsible way to adjust?",
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
            text: "New scenario! Your income is back to <b>$400</b>. But suddenly, tickets for your favorite band go on sale for <b>$150</b>! This is <b>$30</b> more than your <b>$120</b> Wants budget.",
        },
        {
            type: 'multiple-choice',
            question: 'What is the smartest way to handle this?',
            options: [
                { id: 'opt1', text: "Skip paying your phone bill to get the tickets." },
                { id: 'opt2', text: "Decide you can't go because it's over budget." },
                { id: 'opt3', text: 'Panic and do nothing.' },
                { id: 'opt4', text: 'Cut back on other wants (like eating out) for the month to free up the extra $30.' },
            ],
            correctAnswer: 'opt4',
            reinforcement: "Perfect! A budget isn't about saying 'no,' it's about making trade-offs to say 'yes' to what's important.",
        },
        {
          type: 'complete',
          title: 'PRACTICE COMPLETE!',
          text: 'You’ve shown you can adapt to real-world money situations. Excellent!',
          rewards: {
            xp: 40,
            coins: 5,
          },
        },
      ],
    },
  ],
};
