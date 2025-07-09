
import type { Lesson } from '@/types/lesson';

export const lessonCredit4: Lesson = {
  id: 'c4',
  title: 'The Cost of Borrowing & Interest',
  modules: [
    {
      title: 'The Minimum Payment Trap',
      xp: 35,
      steps: [
        {
          type: 'intro',
          text: "Let's talk about the <b>true</b> cost of using credit. It's all about understanding interest and avoiding common traps.",
        },
        {
          type: 'scenario',
          text: "You buy a new laptop for $<b>1,000</b> on a credit card with 20% APR. The minimum payment is only $<b>25</b> a month. Seems manageable, right?",
        },
        {
          type: 'multiple-choice',
          question: 'If you only pay the $25 minimum each month, how long do you think it will take to pay off the $1,000 laptop?',
          options: [
            { id: 'opt1', text: 'About a year' },
            { id: 'opt2', text: 'About two years' },
            { id: 'opt3', text: 'Over FIVE years' },
            { id: 'opt4', text: 'Ten years' },
          ],
          correctAnswer: 'opt3',
          reinforcement: 'Shocking, right? And you would have paid almost $800 in interest alone!',
        },
        {
          type: 'concept',
          text: "This is called the <b>Minimum Payment Trap</b>. Paying only the minimum keeps you in debt for years and makes you pay way more in interest. Lenders love this, but it's a disaster for your wallet.",
        },
      ],
    },
    {
      title: 'How Interest Grows',
      xp: 35,
      steps: [
        {
          type: 'concept',
          text: "When you make a payment, it's split between paying down your actual debt (the <b>principal</b>) and paying the interest fee. When you only pay the minimum, most of your money goes to interest, not the principal.",
          image: 'https://placehold.co/400x225',
          imageHint: 'pie chart principal interest',
        },
        {
          type: 'concept',
          text: "The schedule that shows how your payments are split over time is called an <b>Amortization</b> schedule. It reveals the true cost of borrowing.",
        },
        {
          type: 'scenario',
          text: "On that $<b>1,000</b> laptop: If you paid it off in one year (about $93/month), you'd pay about $<b>110</b> in total interest. If you only paid the minimum ($25/month), you'd pay almost $<b>800</b> in interest. That's an extra $<b>690</b>!",
        },
        {
          type: 'multiple-choice',
          question: 'What is the fastest way to get out of debt and pay the least amount of interest?',
          options: [
            { id: 'opt1', text: 'Always pay only the minimum payment.' },
            { id: 'opt2', text: 'Pay more than the minimum payment whenever possible.' },
            { id: 'opt3', text: 'Ignore the payments for a few months.' },
            { id: 'opt4', text: 'Ask for a higher credit limit.' },
          ],
          correctAnswer: 'opt2',
          reinforcement: 'Exactly! Every dollar extra you pay above the minimum goes directly to reducing your principal debt.',
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You've learned how to see the true cost of borrowing. You're ready to make smart debt decisions!",
          rewards: {
            xp: 70,
            coins: 10,
          },
        },
      ],
    },
  ],
};
