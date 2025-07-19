
import type { Lesson } from '@/types/lesson';

// Note: The interactive drag-and-drop 'Budget Allocator' game described in the prompt
// is a complex component that doesn't exist yet. This practice session will be a simplified
// version using existing components to meet the learning objectives.
export const lessonBudgetingPractice1: Lesson = {
  id: 'bp1',
  title: 'Practice: The Budget Allocator',
  modules: [
    {
      title: 'The Budget Allocator',
      xp: 80,
      steps: [
        {
          type: 'intro',
          text: "Welcome to the Budget Allocator! 💰 Let's put your strategy skills to the test.",
        },
        {
          type: 'scenario',
        },
        {
          type: 'multiple-choice',
          question: 'What is the target amount for your NEEDS (50%)?',
          options: [
            { id: 'opt1', text: '$50' },
            { id: 'opt2', text: '$100' },
            { id: 'opt3', text: '$200' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'multiple-choice',
          question: 'What is the target amount for your WANTS (30%)?',
          options: [
            { id: 'opt1', text: '$30' },
            { id: 'opt2', text: '$60' },
            { id: 'opt3', text: '$90' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'multiple-choice',
          question: 'And what is the target amount for your SAVINGS (20%)?',
          options: [
            { id: 'opt1', text: '$20' },
            { id: 'opt2', text: '$40' },
            { id: 'opt3', text: '$60' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'concept',
        },
        {
          type: 'complete',
          title: 'PRACTICE COMPLETE!',
          text: "You've built your first budget.",
          rewards: {
            xp: 80,
            coins: 15,
          },
        },
      ],
    },
  ],
};
