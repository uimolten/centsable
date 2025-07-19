
import type { Lesson } from '@/types/lesson';

export const lessonBudgetingQuiz: Lesson = {
  id: 'bq1',
  title: 'Budgeting Unit Quiz',
  modules: [
    {
      title: 'Final Challenge',
      xp: 25,
      steps: [
        {
          type: 'intro',
          text: "<b>FINAL CHALLENGE!</b> 🧠 You've learned how to create a money game plan. Prove your skills to become a Budgeting Master!",
        },
        {
          type: 'multiple-choice',
          question: "What is the very first step in making a budget?",
          options: [
            { id: 'opt1', text: 'Tracking your expenses' },
            { id: 'opt2', text: 'Choosing a savings account' },
            { id: 'opt3', text: 'Asking for a raise' },
            { id: 'opt4', text: 'Picking stocks to invest in'},
          ],
          correctAnswer: 'opt1',
        },
        {
          type: 'tap-the-pairs',
          instructions: "Match the 50/30/20 rule to the correct category.",
          pairs: [
            { term: '50%', definition: 'Needs' },
            { term: '30%', definition: 'Wants' },
            { term: '20%', definition: 'Savings' },
          ],
        },
        {
          type: 'fill-in-the-blank',
          question: "An expense that you could live without, like a new video game, is considered a <b>_____</b>.",
          correctAnswer: 'Want',
        },
        {
          type: 'multiple-choice',
          question: "If your monthly income is <b>$300</b>, how much should you aim to put into savings according to the 50/30/20 rule?",
          options: [
            { id: 'opt1', text: '$30' },
            { id: 'opt2', text: '$60' },
            { id: 'opt3', text: '$90' },
            { id: 'opt4', text: '$150'},
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'multiple-choice',
          question: 'True or False: Once you make a budget, you should never change it.',
          options: [
            { id: 'true', text: 'True' },
            { id: 'false', text: 'False' },
          ],
          correctAnswer: 'false',
        },
        {
          type: 'multiple-choice',
          question: "You get a raise at your job. What should you do with your budget?",
          options: [
            { id: 'opt1', text: 'Ignore it' },
            { id: 'opt2', text: 'Spend all the new money' },
            { id: 'opt3', text: 'Review and adjust your budget' },
            { id: 'opt4', text: 'Quit your job'},
          ],
          correctAnswer: 'opt3',
        },
        {
          type: 'multiple-choice',
          question: "Which of these belongs in the 'Needs' category?",
          options: [
            { id: 'opt1', text: 'Concert Tickets', image: 'https://placehold.co/200x200', imageHint: 'concert tickets' },
            { id: 'opt2', text: 'Bus Pass', image: 'https://placehold.co/200x200', imageHint: 'bus pass' },
            { id: 'opt3', text: 'New Phone Case', image: 'https://placehold.co/200x200', imageHint: 'phone case' },
            { id: 'opt4', text: 'Fancy Dinner', image: 'https://placehold.co/200x200', imageHint: 'fancy dinner' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'multiple-choice',
          question: "What is the main goal of tracking your expenses?",
          options: [
            { id: 'opt1', text: 'To feel bad about spending' },
            { id: 'opt2', text: 'To see where your money is actually going' },
            { id: 'opt3', text: 'To show off to your friends' },
            { id: 'opt4', text: 'It has no real purpose'},
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'complete',
          title: 'UNIT COMPLETE!',
          text: "You've officially mastered the Money Game Plan! 🏆",
          rewards: {
            xp: 25,
            coins: 25,
          },
        },
      ],
    },
  ],
};
