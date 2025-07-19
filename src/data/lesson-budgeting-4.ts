
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting4: Lesson = {
  id: 'b4',
  title: 'Staying in the Game: Adjusting Your Budget',
  modules: [
    {
      title: 'Staying in the Game',
      xp: 5,
      steps: [
        {
          type: 'intro',
          text: "Final Quest: Staying in the Game! A budget isn't a rigid cage. It's a living document that changes as your life changes.",
        },
        {
          type: 'concept',
          text: "Sometimes you'll overspend in one category. That's okay! The goal is to adjust and get back on track next month.",
        },
        {
          type: 'multiple-choice',
          question: "If you overspend on 'Wants' one month, what's a smart thing to do next month?",
          options: [
            { id: 'opt1', text: 'Give up on budgeting' },
            { id: 'opt2', text: "Try to spend a little less on 'Wants'" },
            { id: 'opt3', text: 'Ignore it' },
            { id: 'opt4', text: 'Take the difference from your savings' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'concept',
          text: "You should also review your budget when your income changes, like when you get a raise or a new job. Your game plan should level up with you!",
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You're now a budgeting master.",
          rewards: {
            xp: 5,
            coins: 10,
          },
        },
      ],
    },
  ],
};
