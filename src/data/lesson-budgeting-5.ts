
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting5: Lesson = {
  id: 'b5',
  title: 'Budgeting for Goals',
  modules: [
    {
      title: 'Dream Big, Plan Smart',
      xp: 20,
      steps: [
        {
          type: 'intro',
          text: "Let's talk about the real reason we've learned to budget: to turn dreams into reality. 🚀 Your *budget* is the rocket fuel for your goals.",
        },
        {
          type: 'multiple-choice',
          question: 'What’s ONE big thing you’d save for if you could?',
          options: [
            { id: 'opt1', text: 'A new phone 📱' },
            { id: 'opt2', text: 'Concert tickets 🎸' },
            { id: 'opt3', text: 'A first car 🚗' },
            { id: 'opt4', text: 'A gaming PC 💻' },
          ],
          correctAnswer: ['opt1', 'opt2', 'opt3', 'opt4'],
          reinforcement: "That's an awesome goal! Now, let’s figure out how a budget can get you there.",
        },
      ],
    },
    {
      title: 'SMART Goals & Time Horizons',
      xp: 30,
      steps: [
        {
          type: 'concept',
          text: "A vague goal like ‘I wanna save for a car’ won’t cut it. You need a *SMART* Goal! It's a goal that is *S*pecific, *M*easurable, *A*chievable, *R*elevant, and *T*ime-bound.",
        },
        {
          type: 'concept',
          text: "Goals also have different time frames. A *Short-Term Goal* is usually under a year (like saving for a new phone). A *Long-Term Goal* takes over a year (like saving for a car).",
        },
        {
          type: 'multiple-choice',
          question: "Which type of goal are you most excited to work towards right now?",
          options: [
            { id: 'opt1', text: 'Short-Term (Quick Wins!)' },
            { id: 'opt2', text: 'Long-Term (The Big Picture!)' },
          ],
          correctAnswer: ['opt1', 'opt2'],
          reinforcement: "Awesome! It's great to have a mix of both.",
        },
        {
          type: 'interactive-sort',
          instructions: 'Sort these goals based on their time frame.',
          box1Label: 'Short-Term (under 1 year)',
          box2Label: 'Long-Term (1+ years)',
          items: [
            { id: 'item-1', text: 'New phone', correctBox: 'box1' },
            { id: 'item-2', text: 'Summer trip with friends', correctBox: 'box1' },
            { id: 'item-3', text: 'Car down payment', correctBox: 'box2' },
            { id: 'item-4', text: 'Saving for college', correctBox: 'box2' },
          ],
        },
      ],
    },
    {
      title: 'The Magic of Saving Early',
      xp: 30,
      steps: [
        {
          type: 'concept',
          text: 'Here’s where saving for long-term goals gets awesome. The earlier you start, the less you have to save. Why? *Compound Interest!*',
        },
        {
          type: 'concept',
          text: 'It’s when your money earns interest, then *THAT* interest earns its own interest. It’s like a tiny snowball that grows into a huge one over time. We will explore this more in the Investing unit!',
          image: 'https://placehold.co/400x225',
          imageHint: 'compounding chart growth',
        },
        {
          type: 'scenario',
          text: "*Alex* starts saving *<b>$50</b>/month* at age 18. By 30, they’ll have over *<b>$10,000</b>*! *Jamie* waits until 25. By 30, they’ll only have around *<b>$3,500</b>*. Starting early is a superpower!",
          image: 'https://placehold.co/400x225',
          imageHint: 'bar chart comparison',
        },
        {
          type: 'fill-in-the-blank',
          question: "When your savings earn their own interest, it's called __________ interest.",
          correctAnswer: 'compound',
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
