
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting5: Lesson = {
  id: 'b5',
  title: 'Connecting Budgets to Goals',
  modules: [
    {
      title: 'Dream Big, Plan Smart',
      xp: 15,
      steps: [
        {
          type: 'intro',
          text: "Let's talk about the real reason we budget: to turn dreams into reality. What's one big thing you'd save for if you could?",
        },
        {
          type: 'multiple-choice',
          question: 'What’s ONE thing you’d save for if money wasn’t a problem? Pick your goal:',
          options: [
            { id: 'opt1', text: 'New phone 📱' },
            { id: 'opt2', text: 'Concert tickets 🎸' },
            { id: 'opt3', text: 'First car 🚗' },
            { id: 'opt4', text: 'College laptop 💻' },
          ],
          correctAnswer: ['opt1', 'opt2', 'opt3', 'opt4'],
          reinforcement: "That's an awesome goal! Now, let's figure out how a budget can get you there.",
        },
        {
          type: 'concept',
          text: 'Your budget isn’t just for tracking—it’s your rocket fuel for goals. 🚀 Without a budget, goals stay dreams. With a budget, dreams become deadlines.',
        },
      ],
    },
    {
      title: 'Making Goals SMART',
      xp: 20,
      steps: [
        {
          type: 'concept',
          text: "A vague goal like ‘I wanna save for a car’ won’t cut it. You need a <b>SMART</b> Goal!",
        },
        {
          type: 'tap-the-pairs',
          instructions: 'Match the letter to its meaning in SMART goals.',
          pairs: [
            { term: 'S', definition: 'Specific: What exactly?' },
            { term: 'M', definition: 'Measurable: How much?' },
            { term: 'A', definition: 'Achievable: Can you do it?' },
            { term: 'R', definition: 'Relevant: Why do you want it?' },
            { term: 'T', definition: 'Time-bound: By when?' },
          ],
        },
        {
          type: 'scenario',
          text: '<b>Example:</b><br>❌ <b>Bad goal:</b> “Save for college.”<br>✅ <b>SMART Goal:</b> “Save $1,000 for a college laptop in 10 months by setting aside $100/month.”',
        },
      ],
    },
    {
      title: 'Your Time Horizon',
      xp: 15,
      steps: [
        {
          type: 'concept',
          text: "Not all goals take the same time. Let's look at the difference.",
        },
        {
          type: 'interactive-sort',
          instructions: 'Sort these goals based on their time frame.',
          box1Label: 'Short-Term (under 1 year)',
          box2Label: 'Long-Term (1+ years)',
          items: [
            { id: 'item-1', text: 'New phone', correctBox: 'box1' },
            { id: 'item-2', text: 'Trip with friends', correctBox: 'box1' },
            { id: 'item-3', text: 'Car down payment', correctBox: 'box2' },
            { id: 'item-4', text: 'College fund', correctBox: 'box2' },
          ],
        },
      ],
    },
    {
      title: 'The Magic of Saving Early',
      xp: 10,
      steps: [
        {
          type: 'concept',
          text: 'Here’s where saving gets awesome. The earlier you start, the less you have to save. Why? <b>Compound interest!</b>',
        },
        {
          type: 'concept',
          text: 'It’s when your money earns interest, then THAT interest earns its own interest. It’s like a tiny snowball that grows into a huge one over time.',
          image: 'https://placehold.co/400x225',
          imageHint: 'compounding chart growth',
        },
        {
          type: 'scenario',
          text: "<b>Alex</b> starts saving $50/month at age 18. By 30, they’ll have over $10,000! <b>Jamie</b> waits until 25. By 30, they’ll only have around $3,500. Starting early is a superpower!",
          image: 'https://placehold.co/400x225',
          imageHint: 'bar chart comparison',
        },
      ],
    },
    {
      title: 'Your Savings Plan',
      xp: 15,
      steps: [
        {
          type: 'scenario',
          text: 'Time to plan! You want a new laptop that costs <b>$1,200</b>. You want to buy it in 8 months.',
        },
        {
          type: 'fill-in-the-blank',
          question: 'To get your $1,200 laptop in 8 months, you need to save $______ each month.',
          correctAnswer: '150',
          reinforcement: "Exactly! $1200 divided by 8 months is $150 per month. That's your target!",
        },
        {
          type: 'goal-builder',
          instructions: 'What could you cut from your "Wants" category to save that much faster?',
          inputType: 'text',
          placeholder: 'e.g., Fewer coffees, pack lunch...',
          storageKey: 'cut_wants',
        },
      ],
    },
    {
      title: 'Wrap-Up',
      xp: 5,
      steps: [
        {
          type: 'tap-the-pairs',
          instructions: 'Final vocab check! Match the term to its definition.',
          pairs: [
            { term: 'SMART Goal', definition: 'A goal that’s Specific, Measurable, Achievable, Relevant, Timed.' },
            { term: 'Short-Term Goal', definition: 'Goal achievable in less than 1 year.' },
            { term: 'Long-Term Goal', definition: 'Goal that takes more than 1 year to reach.' },
            { term: 'Compound Interest', definition: 'When your savings earn interest, and that interest earns more.' },
          ],
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You know how to connect your budget to your biggest dreams. You're ready to build your future!",
          rewards: {
            xp: 80,
            coins: 15,
          },
        },
      ],
    },
  ],
};
