
import type { Lesson } from '@/types/lesson';

export const lessonTaxes4: Lesson = {
  id: 't4',
  title: 'Lowering Your Tax Bill & Future Taxes',
  modules: [
    {
      title: 'Credits vs. Deductions',
      xp: 5,
      steps: [
        {
          type: 'intro',
          text: "Let's talk about the fun part of taxes: lowering your tax bill!",
        },
        {
          type: 'multiple-choice',
          question: 'Which is better for saving money on taxes?',
          options: [
            { id: 'opt1', text: 'A $1,000 tax credit.' },
            { id: 'opt2', text: 'A $1,000 tax deduction.' },
            { id: 'opt3', text: 'They are the same.' },
            { id: 'opt4', text: 'Neither saves you money.' },
          ],
          correctAnswer: 'opt1',
          reinforcement: 'Correct! A tax credit is always more powerful.',
        },
        {
          type: 'concept',
          text: "A <b>Tax Deduction</b> reduces your taxable income. If you earned <b>$15,000</b>, a <b>$1,000</b> deduction means you now only pay tax on <b>$14,000</b>. In the <b>12%</b> tax bracket, this saves you <b>$120</b>.",
        },
        {
          type: 'concept',
          text: "A <b>Tax Credit</b> is a dollar-for-dollar reduction of your final tax bill. If your tax bill is <b>$1,500</b> and you get a <b>$1,000</b> tax credit, your final bill is now only <b>$500</b>!",
        },
        {
          type: 'concept',
          text: "Most people take the <b>Standard Deduction</b>—a fixed amount anyone can deduct without needing to track expenses. For 2025, it's <b>$14,600</b> for single filers.",
        },
      ],
    },
    {
      title: 'Taxes in Your Future',
      xp: 5,
      steps: [
        {
          type: 'intro',
          text: "Let's look at how taxes will play a role in your future goals.",
        },
        {
          type: 'multiple-choice',
          question: 'Which of these future situations would involve taxes?',
          options: [
            { id: 'opt1', text: 'Starting a freelance business' },
            { id: 'opt2', text: 'Buying a house' },
            { id: 'opt3', text: 'Investing in the stock market' },
            { id: 'opt4', text: 'All of the above' },
          ],
          correctAnswer: 'opt4',
          reinforcement: "Correct! Taxes are a part of almost every big financial step.",
        },
        {
          type: 'concept',
          text: "If you have a side hustle (Etsy, DoorDash), you'll pay <b>Self-Employment Tax</b>. If you sell an investment for a profit, you'll pay <b>Capital Gains Tax</b>.",
        },
        {
          type: 'concept',
          text: "And critically, when you apply for college financial aid using the <b>FAFSA</b>, you'll need info from your tax return. Filing correctly is crucial for getting grants and scholarships!",
          image: "https://placehold.co/400x225",
          imageHint: 'FAFSA form logo',
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You're prepared for the future. You're ready for the final quiz!",
          rewards: {
            xp: 10,
            coins: 0,
          },
        },
      ],
    },
  ],
};
