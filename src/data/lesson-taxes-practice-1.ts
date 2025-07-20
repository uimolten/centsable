
import type { Lesson } from '@/types/lesson';

export const lessonTaxesPractice1: Lesson = {
  id: 'tp1',
  title: 'Practice: Paycheck Detective',
  modules: [
    {
      title: 'Practice Dojo',
      xp: 15,
      steps: [
        {
          type: 'intro',
          text: "Welcome to the practice dojo! 🥋 Let's see if you can solve the case of the paycheck.",
        },
        {
          type: 'scenario',
          text: 'You work <b>20</b> hours at a rate of <b>$16</b>/hour. Your employer withholds <b>$25</b> for federal taxes, <b>$10</b> for state taxes, and <b>$24.48</b> for <b>FICA payroll taxes</b>.',
        },
        {
          type: 'fill-in-the-blank',
          question: 'First, what is your <b>Gross Income</b> for this pay period? $______',
          correctAnswer: '320',
          reinforcement: 'Correct! 20 hours * $16/hour = $320.',
        },
        {
          type: 'fill-in-the-blank',
          question: 'Next, what are your <b>Total Deductions</b>? $______',
          correctAnswer: '59.48',
          reinforcement: 'Excellent! $25 + $10 + $24.48 = $59.48.',
        },
        {
          type: 'fill-in-the-blank',
          question: 'Finally, what is your <b>Net Income</b> (take-home pay)? $______',
          correctAnswer: '260.52',
          reinforcement: "Perfect! $320 - $59.48 = $260.52. Case closed!",
        },
        {
          type: 'complete',
          title: 'PRACTICE COMPLETE!',
          text: 'Your paycheck detective skills are sharp. Well done!',
          rewards: {
            xp: 15,
            coins: 0,
          },
        },
      ],
    },
  ],
};
