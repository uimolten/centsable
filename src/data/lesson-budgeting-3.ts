
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting3: Lesson = {
  id: 'b3',
  title: 'Building Your First Budget: The 50/30/20 Rule',
  modules: [
    {
      title: 'The Snap Split Challenge',
      xp: 10,
      steps: [
        {
          type: 'intro',
          text: "You’ve just been paid <b>$500</b> from your part-time job. Without overthinking, how would you split it up? Let's see your gut instinct.",
        },
        {
          type: 'multiple-choice',
          question: 'Which of these splits feels most like your current instinct?',
          options: [
            { id: 'opt1', text: 'Spend most of it on fun, save a little.' },
            { id: 'opt2', text: 'Cover bills first, then spend the rest.' },
            { id: 'opt3', text: 'Save half of it, then figure out the rest.' },
            { id: 'opt4', text: 'Spend it all as I go and hope it lasts.' },
          ],
          correctAnswer: 'opt2', // No "correct" answer, but this is the most responsible instinct.
          reinforcement: 'Interesting! There’s no wrong answer, but thinking about it is the first step. Now, let’s learn a framework to make it easier.',
        },
      ],
    },
    {
      title: 'What is a Budget?',
      xp: 15,
      steps: [
        {
          type: 'concept',
          text: 'A budget is just a money plan. It’s how you tell your cash where to go instead of wondering where it went.',
        },
        {
            type: 'concept',
            text: 'A good budget shows you: <br>💵 How much you make (<b>Income</b>) <br>🛒 How much you spend (<b>Expenses</b>) <br>💡 How much you save for future goals (<b>Savings</b>)',
        },
        {
            type: 'concept',
            text: "Think of it like setting up your Spotify playlists—you choose where each song goes so you’re not stuck listening to random noise. Same with money: organize it so it plays how YOU want.",
        }
      ],
    },
    {
      title: 'The 50/30/20 Rule',
      xp: 35,
      steps: [
        {
          type: 'concept',
          text: 'Now let’s talk about one of the simplest ways to set up your first budget: the <b>50/30/20 Rule</b>.',
        },
        {
          type: 'concept',
          text: "🍕 Imagine your income is a pizza. The 50/30/20 rule is a recipe for how to slice it up.",
          image: 'https://placehold.co/400x225',
          imageHint: 'pizza slices',
        },
        {
          type: 'concept',
          text: "<b>50%</b> of slices = 🍽️ <b>Needs</b> (essentials like a bus pass, phone bill, or lunch money)",
        },
        {
          type: 'concept',
          text: "<b>30%</b> of slices = 🎉 <b>Wants</b> (fun stuff like concerts, shopping, or subscriptions)",
        },
        {
          type: 'concept',
          text: "<b>20%</b> of slices = 💾 <b>Savings</b> (money for your future goals or an emergency fund)",
        },
        {
          type: 'interactive-sort',
          instructions: 'Categorize these teen expenses using the 50/30/20 framework.',
          box1Label: 'Needs',
          box2Label: 'Wants',
          items: [
            { id: 'item-1', text: 'Bus Pass', correctBox: 'box1' },
            { id: 'item-2', text: 'Netflix Subscription', correctBox: 'box2' },
            { id: 'item-3', text: 'Lunch at School', correctBox: 'box1' },
            { id: 'item-4', text: 'New Video Game', correctBox: 'box2' },
          ],
        },
        {
          type: 'multiple-choice',
          question: "Using the 50/30/20 rule, if you earn <b>$500</b> a month, how much should go into savings?",
          options: [
            { id: 'opt1', text: '$50' },
            { id: 'opt2', text: '$250' },
            { id: 'opt3', text: '$150' },
            { id: 'opt4', text: '$100' },
          ],
          correctAnswer: 'opt4',
          reinforcement: "Perfect! 20% of $500 is $100. That's a great amount to put towards your goals each month!",
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You've learned a powerful and simple way to start budgeting!",
          rewards: {
            xp: 60,
            coins: 10,
          },
        },
      ],
    },
  ],
};
