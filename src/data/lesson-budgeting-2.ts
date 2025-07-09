
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting2: Lesson = {
  id: 'b2',
  title: "Where's Your Money Really Going?",
  modules: [
    {
      title: "The Detective's Toolkit",
      xp: 15,
      steps: [
        {
          type: 'intro',
          text: "Imagine a crisp <strong>$20</strong> bill lands in your pocket every Friday. After a month, you'd have <strong>$80</strong>! Small amounts add up fast—for saving AND spending. Today, we're financial detectives finding where your money <em>really</em> goes.",
        },
        {
          type: 'concept',
          text: "Tracking your money is like checking your phone's screen time report. It doesn't judge you; it just shows you the data so <strong>you</strong> can decide if you want to make a change. It's about awareness, not shame.",
        },
        {
          type: 'multiple-choice',
          question: 'The main goal of tracking your money is to...',
          options: [
            { id: 'opt1', text: 'Stop you from ever buying fun things.' },
            { id: 'opt2', text: 'Understand your habits so you can take control.' },
            { id: 'opt3', text: 'Show your friends how much you spend.' },
            { id: 'opt4', text: 'Make you feel guilty about your choices.' },
          ],
          correctAnswer: 'opt2',
          reinforcement: "Exactly! It's your data, for your decisions.",
        },
      ],
    },
    {
      title: 'Fixed vs. Variable: The Clues',
      xp: 15,
      steps: [
        {
          type: 'concept',
          text: "Think of <strong>Fixed Expenses</strong> like your school schedule—the same, predictable costs each month (like a phone bill or subscription).",
        },
        {
          type: 'concept',
          text: "<strong>Variable Expenses</strong> are like your weekend plans—they change based on your choices (like eating out or shopping).",
        },
        {
          type: 'interactive-sort',
          instructions: 'Sort these costs. Are they Fixed (predictable) or Variable (they change)?',
          box1Label: 'Fixed Expenses',
          box2Label: 'Variable Expenses',
          items: [
            { id: 'item-1', text: 'Phone Bill', correctBox: 'box1' },
            { id: 'item-2', text: 'Shopping for clothes', correctBox: 'box2' },
            { id: 'item-3', text: 'Netflix Subscription', correctBox: 'box1' },
            { id: 'item-4', text: 'Going out for pizza', correctBox: 'box2' },
          ],
        },
      ],
    },
    {
      title: 'Spending Leaks',
      xp: 10,
      steps: [
        {
          type: 'concept',
          text: 'Watch out for "Spending Leaks" or "Budget Vampires"! 🧛 These are small, frequent purchases that secretly drain your cash.',
        },
        {
          type: 'scenario',
          text: "That <strong>$5</strong> coffee or energy drink doesn't seem like much, right? But buy one 4 times a week, and that's <strong>$80</strong> a month that just vanishes!",
        },
        {
            type: 'multiple-choice',
            question: 'What is the best description of a "spending leak"?',
            options: [
                { id: 'opt1', text: 'A single, very large purchase.' },
                { id: 'opt2', text: 'Forgetting to pay a bill on time.' },
                { id: 'opt3', text: 'Small, frequent purchases that add up.' },
                { id: 'opt4', text: 'Saving too much money.' },
            ],
            correctAnswer: 'opt3',
            reinforcement: "You got it. They're sneaky!",
        }
      ]
    },
    {
      title: "Your Detective's Toolkit",
      xp: 10,
      steps: [
        {
            type: 'concept',
            text: "Luckily, you have tools! Finding the right one makes tracking way easier and helps you crush those savings goals.",
            image: 'https://placehold.co/400x225',
            imageHint: 'tools kit',
        },
        {
            type: 'concept',
            text: "<strong>The Automator:</strong> Apps like Mint or Empower connect to your bank and sort your spending for you. It's great for getting a quick, hands-off overview.",
            image: 'https://placehold.co/400x225',
            imageHint: 'app dashboard',
        },
        {
            type: 'concept',
            text: "<strong>The Planner:</strong> Apps like YNAB (You Need A Budget) make you give every dollar a job *before* you spend it. This is super powerful for hitting specific goals.",
            image: 'https://placehold.co/400x225',
            imageHint: 'budget planner',
        },
        {
            type: 'concept',
            text: "<strong>The DIY Method:</strong> A simple Google Sheet or notebook gives you total control. It takes more work, but you can customize it exactly how you like.",
            image: 'https://placehold.co/400x225',
            imageHint: 'spreadsheet chart',
        },
        {
            type: 'multiple-choice',
            question: 'The most effective budgeting tool is...',
            options: [
                { id: 'opt1', text: 'The most popular one.' },
                { id: 'opt2', text: 'The one with the most features.' },
                { id: 'opt3', text: 'The one you will actually use.' },
            ],
            correctAnswer: 'opt3',
            reinforcement: 'Exactly! Consistency is what matters most.',
        }
      ]
    },
    {
        title: 'The Money Tracker Challenge',
        xp: 15,
        steps: [
            {
                type: 'scenario',
                text: "Time for a challenge! Your income this month is <strong>$340</strong> (<strong>$250</strong> paycheck, <strong>$50</strong> gift, <strong>$40</strong> from selling clothes)."
            },
            {
                type: 'fill-in-the-blank',
                question: "First, what is the TOTAL of all your expenses this month? <strong>$______</strong>",
                correctAnswer: '270',
                reinforcement: 'Correct! Total expenses are $270.',
                image: 'https://placehold.co/600x400',
                imageHint: 'expense list',
            },
            {
                type: 'fill-in-the-blank',
                question: "You started with <strong>$340</strong> and spent <strong>$270</strong>. How much do you have left over? <strong>$______</strong>",
                correctAnswer: '70',
                reinforcement: "That's right! You have $70 left to save or spend wisely.",
            }
        ]
    },
    {
      title: 'Your First Mission',
      xp: 5,
      steps: [
        {
          type: 'concept',
          text: 'And that is the power of tracking! Now you know exactly where your money went, and you can decide if you want to change anything next month.',
        },
        {
          type: 'concept',
          text: "Your first mission: Think about the <strong>one</strong> expense category you're most curious about, and which tool you might try to track it. That's how real change starts!"
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You've uncovered the secrets of your spending. You're ready to take control!",
          rewards: {
            xp: 70,
            coins: 10,
          },
        },
      ],
    },
  ],
};
