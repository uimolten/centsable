
import type { Lesson } from '@/types/lesson';

export const lessonInsurance2: Lesson = {
  id: 'ui2',
  title: 'The Language of Insurance: Unlocking the Code',
  modules: [
    {
      title: 'Unlock the Code',
      xp: 7,
      steps: [
        {
          type: 'intro',
          text: "New Quest: Unlock the Code! Insurance has its own language. Let's learn the three most important secret words.",
        },
        {
          type: 'concept',
          text: "Your <b>Premium</b> is the regular, fixed amount you pay to keep your insurance active (usually monthly or yearly). It's like a subscription fee for your shield.",
        },
        {
          type: 'concept',
          text: "Your <b>Deductible</b> is the amount you have to pay first out of your own pocket when something bad happens, before the insurance company starts paying.",
        },
        {
          type: 'scenario',
          text: "Your car repair costs $1,000, and your deductible is $250.",
        },
        {
          type: 'fill-in-the-blank',
          question: 'How much does the insurance company pay? $_____',
          correctAnswer: '750',
          reinforcement: "Perfect! You pay your part first, they cover the rest.",
        },
        {
          type: 'concept',
          text: "A <b>Claim</b> is the official report you file when you need your insurance to cover something. It's like activating your shield's power.",
        },
        {
          type: 'tap-the-pairs',
          instructions: 'Match the word to its meaning!',
          pairs: [
            { term: 'Premium', definition: 'Your regular payment' },
            { term: 'Deductible', definition: 'The part you pay first' },
            { term: 'Claim', definition: 'Your request for help' },
          ],
        },
        {
          type: 'complete',
          title: 'QUEST COMPLETE!',
          text: "You've unlocked the secret language of insurance.",
          rewards: {
            xp: 7,
            coins: 0,
          },
        },
      ],
    },
  ],
};
