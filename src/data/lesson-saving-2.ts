
import type { Lesson } from '@/types/lesson';

export const lessonSaving2: Lesson = {
  id: 's2',
  title: 'Creating a Savings Goal',
  modules: [
    {
      title: 'From "I Wish" to "I Will"',
      xp: 2,
      steps: [
        {
          type: 'intro',
          text: "Quest accepted: Creating a Savings Goal! Last time, you learned why to save. Now, let's learn how to make it happen. ✨",
        },
        {
          type: 'concept',
          text: "A 'wish' is saying 'I want a new computer someday.' A 'goal' is saying 'I will save <b>$1,000</b> for a new computer in <b>6 months</b>.' See the difference?",
        },
        {
          type: 'multiple-choice',
          question: 'Which one is a real goal?',
          options: [
            { id: 'opt1', text: 'I want to be rich.' },
            { id: 'opt2', text: 'I will save $50 for concert tickets by next month.' },
            { id: 'opt3', text: 'Saving is important.' },
            { id: 'opt4', text: 'I will buy a new phone.' },
          ],
          correctAnswer: 'opt2',
          reinforcement: "Exactly! A great goal is <b>S</b>pecific (what are you saving for?), <b>M</b>easurable (how much does it cost?), and <b>T</b>ime-bound (when do you need it by?). You can track your progress toward it.",
        },
        {
          type: 'concept',
          text: "The best goals are like a cheat code for success. They're called <b>SMART</b> goals. Let's learn the code! 🤫",
        },
      ],
    },
    {
      title: 'Unlocking the SMART Code',
      xp: 4,
      steps: [
        {
          type: 'concept',
          icon: 'search',
          text: "The 'S' in SMART stands for <b>Specific</b>. You need to know exactly what you're saving for.",
        },
        {
          type: 'multiple-choice',
          question: 'Which goal is more <b>Specific</b>?',
          options: [
            { id: 'opt1', text: 'Saving for new shoes.' },
            { id: 'opt2', text: 'Saving for the new Air Jordan 1s.' },
            { id: 'opt3', text: 'Getting some new stuff.' },
            { id: 'opt4', text: 'Saving $180.' },
          ],
          correctAnswer: 'opt2',
          reinforcement: 'Perfect! Details matter.',
        },
        {
          type: 'concept',
          icon: 'tag',
          text: "The 'M' is for <b>Measurable</b>. You need a target number. How much does it cost?",
        },
        {
          type: 'fill-in-the-blank',
          question: 'To make a goal measurable, you need to know the ______.',
          correctAnswer: 'price/cost',
          reinforcement: 'You got it! 💰',
        },
        {
          type: 'concept',
          icon: 'thumbs-up',
          text: "The 'A' is for <b>Achievable</b>. Is the goal realistic for you right now?",
        },
        {
          type: 'multiple-choice',
          question: 'If you get <b>$20</b> allowance a week, which goal is more <b>Achievable</b> in one month?',
          options: [
            { id: 'opt1', text: 'Saving for a $5,000 trip.' },
            { id: 'opt2', text: 'Saving for a $70 video game.' },
            { id: 'opt3', text: 'Saving for a new car.' },
            { id: 'opt4', text: 'Becoming a millionaire in a month.' },
          ],
          correctAnswer: 'opt2',
          reinforcement: "Right! Start with what's possible.",
        },
        {
          type: 'concept',
          icon: 'heart',
          text: "The 'R' is for <b>Relevant</b>. Does this goal actually matter to YOU?",
        },
        {
          type: 'concept',
          icon: 'calendar',
          text: "And finally, 'T' is for <b>Time-bound</b>. You need a deadline! When do you want to achieve it?",
        },
        {
          type: 'tap-the-pairs',
          instructions: 'Match the SMART letter to its meaning!',
          pairs: [
            { term: 'S', definition: 'Specific' },
            { term: 'M', definition: 'Measurable' },
            { term: 'A', definition: 'Achievable' },
            { term: 'R', definition: 'Relevant' },
            { term: 'T', definition: 'Time-bound' },
          ],
        },
      ],
    },
    {
      title: 'Build Your Own Quest',
      xp: 2,
      steps: [
        {
          type: 'intro',
          text: "Your turn! Let's build your first SMART savings goal. Don't worry, I'll help.",
        },
        {
          type: 'goal-builder',
          instructions: '<b>Specific:</b> What do you want to save for? Be exact!',
          inputType: 'text',
          placeholder: 'e.g. New Headphones',
          storageKey: 'item',
        },
        {
          type: 'goal-builder',
          instructions: '<b>Measurable:</b> Awesome! How much do those cost?',
          inputType: 'number',
          placeholder: 'e.g. 150',
          storageKey: 'amount',
        },
        {
          type: 'goal-builder',
          instructions: '<b>Time-bound:</b> Great! When do you want to have them by?',
          inputType: 'date',
          dateOptions: [
            { label: '1 Month', value: 'in 1 month' },
            { label: '3 Months', value: 'in 3 months' },
            { label: '6 Months', value: 'in 6 months' },
          ],
          storageKey: 'timeframe',
        },
        {
          type: 'goal-summary',
          textTemplate: 'To save {amount} for {item} {timeframe}.',
        },
      ],
    },
    {
      title: 'The Final Challenge',
      xp: 2,
      steps: [
        {
          type: 'scenario',
          text: "Final challenge! Your friend says their goal is: 'To save up for a new laptop by the end of the year.'",
        },
        {
          type: 'multiple-choice',
          question: "What's missing from their goal?",
          options: [
            { id: 'opt1', text: "It's not Specific." },
            { id: 'opt2', text: "It's not Measurable." },
            { id: 'opt3', text: "It's not Relevant." },
            { id: 'opt4', text: "It's not Time-bound." },
          ],
          correctAnswer: 'opt2',
          reinforcement: "Exactly! Because the goal isn't <b>Measurable</b> (we don't know the cost of the laptop), it's hard to make a real plan.",
        },
        {
          type: 'concept',
          text: "Without a target amount, it's hard to know how much to save each week. A good goal is a clear map to success!",
        },
        {
          type: 'complete',
          title: 'QUEST COMPLETE!',
          text: "You've mastered 'Creating a Savings Goal'.",
          rewards: {
            xp: 10,
            coins: 0,
          },
        },
      ],
    },
  ],
};
