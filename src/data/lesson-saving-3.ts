
import type { Lesson } from '@/types/lesson';

export const lessonSaving3: Lesson = {
  id: 's3',
  title: 'Practice: Savings Goals',
  modules: [
    {
      title: 'Practice Dojo',
      xp: 40,
      steps: [
        {
          type: 'intro',
          text: "Welcome to the training dojo! 🥋 Let's practice making your goals even <b><i>SMARTER</i></b>. No pressure, this is just for practice.",
        },
        {
          type: 'multiple-choice',
          question: "Is this a SMART goal? <br> 'I will save <b>$150</b> for the new 'Cyber-Punk 2' video game by selling old stuff online over the next two months.'",
          options: [
            { id: 'yes', text: 'Yes ✅' },
            { id: 'no', text: 'No ❌' },
          ],
          correctAnswer: 'yes',
          reinforcement: "Correct! It's Specific, Measurable, and Time-bound.",
        },
        {
          type: 'multiple-choice',
          question: "How about this one? Is this a SMART goal? <br> 'I want to save money for a trip.'",
          options: [
            { id: 'yes', text: 'Yes ✅' },
            { id: 'no', text: 'No ❌' },
          ],
          correctAnswer: 'no',
          reinforcement: "Right! It's not specific or measurable. Where is the trip? How much does it cost?",
        },
        {
          type: 'concept',
          text: "Nice work! Now, let's fix a broken goal. Your friend says: 'I want to buy a new skateboard.'",
        },
        {
          type: 'multiple-choice',
          question: "Let's make it <b>Specific</b> and <b>Measurable</b>. Tap the better option.",
          options: [
            { id: 'opt1', text: 'I want a cool skateboard.' },
            { id: 'opt2', text: 'I want the Powell-Peralta flight deck, which costs $90.' },
            { id: 'opt3', text: 'I want an expensive skateboard.' },
            { id: 'opt4', text: 'I want to go to a skate shop.' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'multiple-choice',
          question: "Great! Now let's make it <b>Time-bound</b>. How would you add a deadline?",
          options: [
            { id: 'opt1', text: "I'll get it someday." },
            { id: 'opt2', text: "I'll save up for it in the next 3 months." },
            { id: 'opt3', text: 'I will get it when I get it.' },
            { id: 'opt4', text: 'I will ask for it for my birthday.' },
          ],
          correctAnswer: 'opt2',
        },
        {
          type: 'concept',
          text: "<b>GOAL FIXED!</b> 🛠️ You turned 'I want a skateboard' into 'I will save <b>$90</b> for the Powell-Peralta flight deck in the next 3 months.' That's a plan!",
        },
        {
          type: 'complete',
          title: 'PRACTICE COMPLETE!',
          text: 'Your goal-setting skills have leveled up.',
          rewards: {
            xp: 40,
            coins: 0,
          },
        },
      ],
    },
  ],
};
