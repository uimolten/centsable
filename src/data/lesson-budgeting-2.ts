import type { Lesson } from '@/types/lesson';

export const lessonBudgeting2: Lesson = {
  id: 'b2',
  title: "Where's Your Money Really Going?",
  modules: [
    {
      title: "The Detective's Toolkit",
      xp: 20,
      steps: [
        {
          type: 'intro',
          text: "Imagine a crisp $20 bill lands in your pocket every Friday. After a month, you'd have $80! Small amounts add up fast—for saving AND spending. Today, we're financial detectives finding where your money *really* goes.",
        },
        {
          type: 'concept',
          text: "Tracking your money is like checking your phone's screen time report. It doesn't judge you; it just shows you the data so YOU can decide if you want to make a change. It's about awareness, not shame.",
          image: 'https://placehold.co/400x225',
          imageHint: 'dashboard chart',
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
      xp: 25,
      steps: [
        {
          type: 'concept',
          text: "Think of **Fixed Expenses** like your school schedule—the same, predictable costs each month (like a phone bill or subscription).",
        },
        {
          type: 'concept',
          text: "**Variable Expenses** are like your weekend plans—they change based on your choices (like eating out or shopping).",
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
      title: 'Spending Leaks & Your Toolkit',
      xp: 15,
      steps: [
        {
          type: 'concept',
          text: 'Watch out for "Spending Leaks" or "Budget Vampires"! 🧛 These are small, frequent purchases that secretly drain your cash.',
        },
        {
          type: 'scenario',
          text: "That $5 coffee or energy drink doesn't seem like much, right? But buy one 4 times a week, and that's **$80 a month** that just vanishes!",
        },
        {
          type: 'concept',
          text: "Luckily, you have tools! Apps like **Mint** can automate tracking, **YNAB** helps you plan every dollar, and **Google Sheets** lets you build your own system.",
          image: 'https://placehold.co/400x225',
          imageHint: 'apps phone',
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
        title: 'The Money Tracker Challenge',
        xp: 30,
        steps: [
            {
                type: 'scenario',
                text: "Time for a challenge! Your income this month is **$340** ($250 paycheck, $50 gift, $40 from selling clothes)."
            },
            {
                type: 'scenario',
                text: "Your expenses are: $50 phone bill, $90 fast food, $30 bus fare, $60 video game, and $40 on snacks."
            },
            {
                type: 'fill-in-the-blank',
                question: 'First, what is the TOTAL of all your expenses this month? $______',
                correctAnswer: '270',
                reinforcement: 'Correct! Total expenses are $270.',
            },
            {
                type: 'fill-in-the-blank',
                question: 'You started with $340 and spent $270. How much do you have left over? $______',
                correctAnswer: '70',
                reinforcement: "That's right! You have $70 left to save or spend wisely.",
            }
        ]
    },
    {
      title: 'Mission Complete',
      xp: 10,
      steps: [
        {
          type: 'concept',
          text: 'And that is the power of tracking! Now you know exactly where your money went, and you can decide if you want to change anything next month.',
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
