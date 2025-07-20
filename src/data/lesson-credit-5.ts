
import type { Lesson } from '@/types/lesson';

export const lessonCredit5: Lesson = {
  id: 'c5',
  title: 'Smart Credit Decisions & Avoiding Trouble',
  modules: [
    {
      title: 'Red Flag or Green Light?',
      xp: 4,
      steps: [
        {
          type: 'intro',
          text: "Final credit lesson! Let's talk about making smart choices and protecting yourself from trouble.",
        },
        {
          type: 'multiple-choice',
          question: 'You get an email offering a loan with "guaranteed approval" and a 99% APR. Is this a red flag or a green light?',
          options: [
            { id: 'opt1', text: 'Green Light ✅' },
            { id: 'opt2', text: 'Red Flag 🚩' },
          ],
          correctAnswer: 'opt2',
          reinforcement: 'Definitely a red flag! That\'s a classic sign of a predatory loan.',
        },
        {
          type: 'multiple-choice',
          question: 'A credit card offers 0% APR for the first 6 months. Red flag or green light?',
          options: [
            { id: 'opt1', text: 'Green Light ✅' },
            { id: 'opt2', text: 'Red Flag 🚩' },
          ],
          correctAnswer: 'opt1',
          reinforcement: "It's a green light, but be careful! You need to know what the APR will be <b>after</b> the 6 months are over.",
        },
      ],
    },
    {
      title: 'Protecting Yourself',
      xp: 3,
      steps: [
        {
          type: 'concept',
          text: 'There are a few simple rules for responsible credit use: always pay on time, never max out your cards, and check your credit report annually for errors or fraud.',
        },
        {
          type: 'concept',
          text: 'You also need to watch out for danger signs. <b>Predatory Lenders</b> offer loans with extremely high fees and interest rates, often targeting people with poor credit. Payday loans are a common example.',
        },
        {
          type: 'concept',
          text: 'Also be wary of <b>Phishing Scams</b>—fake emails or texts that try to trick you into giving away your personal or financial information. Never click suspicious links!',
        },
        {
            type: 'goal-builder',
            instructions: 'What’s one simple step you can take <b>this week</b> to protect your financial information?',
            inputType: 'text',
            placeholder: 'e.g., Enable two-factor authentication',
            storageKey: 'protectionStep',
        },
      ],
    },
    {
      title: 'Credit and Your Future',
      xp: 3,
      steps: [
        {
          type: 'concept',
          text: 'Why does all this matter? Because good credit is your key to major life milestones. It can help you get a car, rent an apartment, or even get a job, all with better terms and lower costs.',
        },
        {
          type: 'concept',
          text: 'Building good credit is a marathon, not a sprint. By starting to learn now, you are giving your future self a massive head start!',
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You've learned how to make smart credit choices and protect yourself. You're ready for the final quiz!",
          rewards: {
            xp: 10,
            coins: 0,
          },
        },
      ],
    },
  ],
};
