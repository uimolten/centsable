
import type { Lesson } from '@/types/lesson';

export const lessonTaxesPractice2: Lesson = {
  id: 'tp2',
  title: 'Practice: Mini Tax Return',
  modules: [
    {
      title: 'Practice Dojo: Tax Time!',
      xp: 15,
      steps: [
        {
          type: 'intro',
          text: "Let's put it all together. Here is a sample W-2 for a student named Alex who worked a summer job. Use it to complete this mini tax return.",
        },
        {
          type: 'scenario',
          text: "<b>Alex's W-2 Information:</b> <br> • Box 1 (Wages): <b>$3,500</b> <br> • Box 2 (Federal income tax withheld): <b>$150</b>",
        },
        {
          type: 'concept',
          text: "First, we calculate Alex's tax bill. Since Alex's income is less than the standard deduction ($14,600 for 2025), their taxable income is $0. Therefore, their final tax bill is <b>$0</b>.",
        },
        {
          type: 'multiple-choice',
          question: 'Alex owed $0 in taxes, but had $150 withheld from their paychecks. What is the result?',
          options: [
            { id: 'opt1', text: 'Alex owes more money.' },
            { id: 'opt2', text: 'Alex gets a refund of $150.' },
            { id: 'opt3', text: 'Alex breaks even.' },
            { id: 'opt4', text: 'The money is lost.' },
          ],
          correctAnswer: 'opt2',
          reinforcement: "Exactly! This is why it's so important for students to file taxes, even if they don't earn much. You can get your withheld money back!",
        },
        {
          type: 'concept',
          text: 'This is a simplified example. In reality, you can easily file for free using IRS Free File or VITA (Volunteer Income Tax Assistance) programs.',
        },
        {
          type: 'complete',
          title: 'PRACTICE COMPLETE!',
          text: 'You successfully filed a mini tax return! Great job.',
          rewards: {
            xp: 15,
            coins: 5,
          },
        },
      ],
    },
  ],
};
