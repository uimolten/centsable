
import type { Lesson } from '@/types/lesson';

export const lessonBudgeting4: Lesson = {
  id: 'b4',
  title: 'Pro Budgeting Habits',
  modules: [
    {
      title: 'Pay Yourself First',
      xp: 25,
      steps: [
        {
          type: 'intro',
          text: "Ready for a pro-level budgeting tip? Let's learn about the most powerful habit you can build: <b>Paying Yourself First</b>.",
        },
        {
          type: 'concept',
          text: "Ever wonder why your money disappears so fast? Most people spend first, and then save whatever is left over (which is usually... nothing).",
          image: 'https://placehold.co/400x225',
          imageHint: 'empty wallet',
        },
        {
          type: 'concept',
          text: '🏦 <b>Pay Yourself First</b> flips that around. It means putting money into your savings account <b><i>as soon as you get paid</i></b>—before you pay bills, before you buy snacks, before anything else.',
        },
        {
          type: 'multiple-choice',
          question: 'Paying Yourself First means...',
          options: [
            { id: 'opt1', text: 'Buying yourself a treat with every paycheck.' },
            { id: 'opt2', text: 'Saving is the first and most important 'bill' you pay.' },
            { id: 'opt3', text: 'Paying all your bills before you save.' },
            { id: 'opt4', text: 'Only saving money at the end of the month.' },
          ],
          correctAnswer: 'opt2',
          reinforcement: 'Exactly! You treat your future self as the most important priority.',
        },
      ],
    },
    {
      title: 'Your Financial Airbag',
      xp: 25,
      steps: [
        {
          type: 'concept',
          text: "Okay, so you're paying yourself first. Where does that money go? One of the first goals is building an <b>Emergency Fund</b>.",
        },
        {
          type: 'concept',
          text: '🛟 An Emergency Fund is your financial airbag. It’s money set aside <b>only</b> for true, unexpected emergencies.',
          image: 'https://placehold.co/400x225',
          imageHint: 'life preserver',
        },
        {
          type: 'scenario',
          text: "Your phone screen shatters, and the repair costs <b>$200</b>.",
        },
        {
          type: 'multiple-choice',
          question: 'What happens if you have an emergency fund?',
          options: [
            { id: 'opt1', text: 'Total panic! You have to ask your parents for money.' },
            { id: 'opt2', text: 'You have to sell your stuff to get cash.' },
            { id: 'opt3', text: 'No stress. You use your emergency fund and get it fixed.' },
            { id: 'opt4', text: 'You ignore it and use a broken phone.' },
          ],
          correctAnswer: 'opt3',
          reinforcement: "That's the power of an emergency fund. It turns a crisis into an inconvenience.",
        },
        {
          type: 'complete',
          title: 'LESSON COMPLETE!',
          text: "You've learned two habits that will change your financial life. Great work!",
          rewards: {
            xp: 50,
            coins: 10,
          },
        },
      ],
    },
  ],
};
