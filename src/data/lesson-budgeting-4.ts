
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting4: Lesson = {
  id: 'b4',
  title: 'Staying in the Game: Adjusting Your Budget',
  modules: [
    {
      title: 'Staying in the Game',
      xp: 50,
      steps: [
        {
          type: 'intro',
          text: "Final Quest: Staying in the Game! A budget isn't a rigid cage. It's a living document that changes as your life changes.",
        },
        {
          type: 'concept',
        },
        {
          type: 'multiple-choice',
          question: "If you overspend on 'Wants' one month, what's a smart thing to do next month?",
          options: [
            { id: 'opt1', text: 'Give up on budgeting' },
            { id: 'opt2', text: 'Try to spend a little less on "Wants"' },
            { id: 'opt3', text: 'Ignore it' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'concept',
        },
        {
          type: 'complete',
          title: 'UNIT COMPLETE!',
          text: "You're now a budgeting master.",
          rewards: {
            xp: 50,
            coins: 10,
          },
        },
      ],
    },
  ],
};
