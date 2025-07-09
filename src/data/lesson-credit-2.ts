
import type { Lesson } from '@/types/lesson';

export const lessonCredit2: Lesson = {
  id: 'c2',
  title: 'Building & Managing Good Credit',
  modules: [
    {
      title: 'Your First Card',
      xp: 20,
      steps: [
        {
          type: 'intro',
          text: "Let's build on what we've learned! It's time to talk about how to start building credit and manage it wisely. It's easier than you think!",
        },
        {
          type: 'scenario',
          text: "Imagine you’re 18 and get your first credit card. The bank gives you a <b>credit limit</b>—the maximum amount of money you can borrow.",
        },
        {
          type: 'multiple-choice',
          question: 'The bank gives you a credit limit of $1,000. To build good credit, what’s a smart monthly spending amount to aim for?',
          options: [
            { id: 'opt1', text: 'Spend the full $1,000 to show you use it.' },
            { id: 'opt2', text: 'Spend less than $300.' },
            { id: 'opt3', text: 'Spend more than $1,000 by asking for an increase.' },
            { id: 'opt4', text: "Don't use the card at all." },
          ],
          correctAnswer: 'opt2',
          reinforcement: "Smart choice! Keeping your spending low compared to your limit is a key part of building good credit. We'll learn why next!",
        },
      ],
    },
    {
      title: 'Key Terms Explained',
      xp: 30,
      steps: [
        {
          type: 'concept',
          text: "Let's define some key terms you'll see on credit card offers. First up: <b>APR</b>, or *Annual Percentage Rate*. This is the interest you'll pay on any money you haven't paid back after the due date.",
        },
        {
          type: 'concept',
          text: "The <b>Grace Period</b> is the time between the end of a billing cycle and your payment due date. If you pay your full balance during this period, you won't be charged any interest!",
        },
        {
          type: 'concept',
          text: "Your <b>Credit Limit</b> is the total amount you can borrow. And <b>Credit Utilization</b> is the percentage of your limit you're currently using. Lenders like to see this below 30%!",
        },
        {
          type: 'fill-in-the-blank',
          question: "If your credit limit is $1,000, you should try to keep your balance below $<b>_____</b> to have good credit utilization.",
          correctAnswer: '300',
        },
        {
          type: 'multiple-choice',
          question: 'Which of these are common habits that can hurt your credit score? (Select all that apply)',
          options: [
            { id: 'opt1', text: 'Paying bills late or missing them completely.' },
            { id: 'opt2', text: 'Keeping a high credit utilization (using more than 30% of your limit).' },
            { id: 'opt3', text: 'Only paying the minimum amount due each month.' },
            { id: 'opt4', text: 'Applying for several new credit cards in a short period.' },
          ],
          correctAnswer: ['opt1', 'opt2', 'opt3', 'opt4'],
          reinforcement: "You're exactly right! All of these can damage a credit score. Avoiding them is key to building good credit.",
        },
      ],
    },
    {
      title: 'Credit Habits Simulator',
      xp: 25,
      steps: [
        {
          type: 'scenario',
          text: "Let's see how your habits affect your credit score in a simulator. You're starting with a score of 680.",
        },
        {
          type: 'multiple-choice',
          question: 'You pay all your bills on time for six months. What happens to your score?',
          options: [
            { id: 'opt1', text: 'It goes up ✅' },
            { id: 'opt2', text: 'It goes down ❌' },
            { id: 'opt3', text: 'It stays the same' },
            { id: 'opt4', text: 'It gets deleted' },
          ],
          correctAnswer: 'opt1',
          reinforcement: 'Correct! Payment history is the biggest factor in your score.',
        },
        {
          type: 'scenario',
          text: "Now, your credit utilization is at 80% because you almost maxed out your card for concert tickets.",
        },
        {
          type: 'multiple-choice',
          question: 'What happens to your score?',
          options: [
            { id: 'opt1', text: 'It goes up ✅' },
            { id: 'opt2', text: 'It goes down ❌' },
            { id: 'opt3', text: 'It stays the same' },
            { id: 'opt4', text: 'You win the concert' },
          ],
          correctAnswer: 'opt2',
          reinforcement: 'Right. High utilization is a red flag to lenders.',
        },
        {
          type: 'scenario',
          text: "You just opened three new store credit cards to get discounts.",
        },
        {
          type: 'multiple-choice',
          question: 'What happens to your score?',
          options: [
            { id: 'opt1', text: 'It goes up ✅' },
            { id: 'opt2', text: 'It goes down ❌' },
            { id: 'opt3', text: 'It stays the same' },
            { id: 'opt4', 'text': 'The stores give you free stuff'}
          ],
          correctAnswer: 'opt2',
          reinforcement: 'Correct. Opening many new accounts in a short time can temporarily lower your score.',
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: 'You now know the core habits for building and maintaining excellent credit. Great job!',
          rewards: {
            xp: 75,
            coins: 10,
          },
        },
      ],
    },
  ],
};
