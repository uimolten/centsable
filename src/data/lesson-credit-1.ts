
import type { Lesson } from '@/types/lesson';

export const lessonCredit1: Lesson = {
  id: 'c1',
  title: 'What Is Credit & Why It Matters',
  modules: [
    {
      title: 'Welcome to Credit Essentials',
      xp: 20,
      steps: [
        {
          type: 'intro',
          text: "Let's talk about a financial superpower: <b>credit</b>. It can unlock huge opportunities, but you have to know how to use it! 🧙‍♂️",
        },
        {
          type: 'scenario',
          text: "You see your dream phone online for $<b>800</b>. You don’t have the cash. What's your move?",
        },
        {
          type: 'multiple-choice',
          question: 'What do you pick?',
          options: [
            { id: 'opt1', text: 'Wait and save up the cash 📅' },
            { id: 'opt2', text: 'Use a credit card to buy it now 💳' },
            { id: 'opt3', text: 'Use a "Pay in 4" service like AfterPay 💸' },
            { id: 'opt4', text: 'Ask a friend to borrow money' },
          ],
          correctAnswer: ['opt1', 'opt2', 'opt3', 'opt4'],
          reinforcement: "Each choice involves credit (or avoiding it). Let’s unpack what credit really means.",
        },
      ],
    },
    {
      title: 'What is Credit?',
      xp: 20,
      steps: [
        {
          type: 'concept',
          text: "<b>Credit</b> is borrowing money from someone else with the promise to pay it back later, usually with an extra fee called <b>interest</b>. It's how you buy things now and pay for them over time.",
        },
        {
          type: 'tap-the-pairs',
          instructions: 'Match the role to the definition!',
          pairs: [
            { term: 'Lender', definition: 'The person or company GIVING money (e.g., a bank).' },
            { term: 'Borrower', definition: 'The person RECEIVING money and promising to repay it (that\'s you!).' },
            { term: 'Interest', definition: 'The fee you pay for the convenience of borrowing money.' },
          ],
        },
        {
          type: 'concept',
          text: 'You use credit for big purchases you can\'t pay for all at once, like buying a phone on a plan, getting a car, or even paying for college.',
        },
        {
            type: 'goal-builder',
            instructions: 'Where do you think you’ll first use credit in your life?',
            inputType: 'text',
            placeholder: 'e.g., for a new laptop',
            storageKey: 'firstCreditUse',
        },
      ],
    },
    {
      title: 'Your Financial Gradebook',
      xp: 20,
      steps: [
        {
          type: 'concept',
          text: "So how do lenders decide if they can trust you? They check your financial gradebook: your <b>credit report</b> and <b>credit score</b>.",
          image: 'https://placehold.co/400x225',
          imageHint: 'credit score meter',
        },
        {
          type: 'concept',
          text: "Your <b>Credit Report</b> is a detailed history of how you’ve handled borrowing money. It lists all your loans and credit cards and shows if you paid on time.",
        },
        {
          type: 'concept',
          text: 'Your <b>Credit Score</b> is a 3-digit number (from 300-850) that summarizes your report. Think of it as your financial GPA. A higher score means you\'re a more trustworthy borrower.',
        },
        {
          type: 'fill-in-the-blank',
          question: "The 3-digit number that shows how trustworthy you are with money is your credit <b>______</b>.",
          correctAnswer: 'score',
        },
        {
            type: 'goal-builder',
            instructions: 'If your credit score was a GPA, what grade would you want it to be and why?',
            inputType: 'text',
            placeholder: 'e.g., an A+ to get the best deals',
            storageKey: 'creditScoreGoal',
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You've learned the basics of credit. Now you're ready to build a great financial reputation!",
          rewards: {
            xp: 60,
            coins: 5,
          },
        },
      ],
    },
  ],
};
