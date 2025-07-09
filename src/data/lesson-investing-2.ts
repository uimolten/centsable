import type { Lesson } from '@/types/lesson';

export const lessonInvesting2: Lesson = {
  id: 'i2',
  title: 'The Rules of the Game: Risk & Reward',
  modules: [
    {
      title: 'Risk & Reward',
      xp: 60,
      steps: [
        {
          type: 'intro',
          text: "New Quest: Risk & Reward! Every great adventure has challenges. In investing, this is called 'risk'. Let's learn how to manage it.",
        },
        {
          type: 'concept',
          text: 'The rule is simple: to get a higher potential Reward (make more money), you usually have to take a higher Risk.',
          image: 'https://placehold.co/400x225',
          imageHint: 'risk reward seesaw',
        },
        {
          type: 'multiple-choice',
          question: 'Which video game difficulty setting is like a high-risk investment?',
          options: [
            { id: 'easy', text: 'Easy Mode' },
            { id: 'story', text: 'Story Mode' },
            { id: 'nightmare', text: 'Nightmare Mode' },
          ],
          correctAnswer: 'nightmare',
          reinforcement: 'Exactly! High risk, but high reward if you win.',
        },
        {
          type: 'concept',
          text: "Your Risk Tolerance is how comfortable you are with that risk. Are you a cautious player or a bold hero? There's no wrong answer!",
        },
        {
          type: 'multiple-choice',
          question: 'Which investment is probably higher risk?',
          options: [
            { id: 'tech', text: 'A new, unproven tech company stock ⚔️', image: 'https://placehold.co/200x200', imageHint: 'chart up' },
            { id: 'bond', text: 'A bond from the U.S. government 🛡️', image: 'https://placehold.co/200x200', imageHint: 'shield security' },
          ],
          correctAnswer: 'tech',
          reinforcement: 'You got it! New companies are riskier but could have huge rewards.',
        },
        {
          type: 'concept',
          text: "Another key factor is your Time Horizon - how long you plan to invest. If you need the money soon, you'd probably take less risk.",
        },
        {
          type: 'complete',
          title: 'QUEST COMPLETE!',
          text: "You've learned the rules of Risk & Reward.",
          rewards: {
            xp: 60,
            coins: 10,
          },
        },
      ],
    },
  ],
};
