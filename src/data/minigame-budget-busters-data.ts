
type NegativeFlag = 'missed_work';

export type EventType = 'expense' | 'choice' | 'windfall';

export interface BaseEvent {
  type: EventType;
  description: string;
}

export interface ExpenseEvent extends BaseEvent {
  type: 'expense';
  category: 'Need' | 'Want';
  cost: number;
  consequence?: string;
}

export interface ChoiceEvent extends BaseEvent {
    type: 'choice';
    category: 'Need' | 'Want';
    optionA: { description: string; cost: number };
    optionB: { description:string; cost: number };
    consequence?: {
        text: string;
        flag?: NegativeFlag;
    }
}

export interface WindfallEvent extends BaseEvent {
    type: 'windfall';
    income: number;
    prerequisites?: {
        forbiddenFlags: NegativeFlag[];
    }
}

export type GameEvent = ExpenseEvent | ChoiceEvent | WindfallEvent;


export interface GameConfig {
  initialBudget: number;
  events: GameEvent[];
  rounds: number;
  guaranteedNeeds: string[];
}

export const REWARD_LIMIT = 2;
export const REWARD_TIMEFRAME_HOURS = 3;

export const gameConfig: GameConfig = {
  initialBudget: 2300,
  rounds: 20,
  guaranteedNeeds: ["Rent is due! You must pay it.", "Your car insurance premium is due."],
  events: [
    // === GUARANTEED EXPENSE EVENTS ===
    {
      type: 'expense',
      category: 'Need',
      description: "Rent is due! You must pay it.",
      cost: 950,
      consequence: "You failed to pay rent and have been evicted!",
    },
    {
      type: 'expense',
      category: 'Need',
      description: "Your car insurance premium is due.",
      cost: 150,
      consequence: "You missed your insurance payment, and your policy was canceled. You can't legally drive!",
    },
    
    // === OTHER EXPENSE EVENTS ===
    // --- Needs ---
    {
      type: 'expense',
      category: 'Need',
      description: "It's time to buy groceries for the month.",
      cost: 350,
      consequence: "You don't have enough money for food and had to borrow from a friend.",
    },
    {
        type: 'expense',
        category: 'Need',
        description: "Your phone bill is due.",
        cost: 80,
        consequence: "Your phone service has been disconnected."
    },
    {
        type: 'expense',
        category: 'Need',
        description: "Your student loan payment is due.",
        cost: 200,
        consequence: "You've missed a student loan payment, which will hurt your credit score."
    },
    {
        type: 'expense',
        category: 'Need',
        description: "Your electricity bill has arrived.",
        cost: 90,
        consequence: "The power has been shut off in your apartment."
    },
    {
      type: 'expense',
      category: 'Need',
      description: "You have a cavity and need a dental filling.",
      cost: 180,
      consequence: "You ignored a health issue which could get worse and more expensive later."
    },
     {
      type: 'expense',
      category: 'Need',
      description: "Your car needs new tires.",
      cost: 400,
      consequence: "Your car is unsafe to drive, and you got a fine.",
    },
    {
        type: 'expense',
        category: 'Need',
        description: "Your pet is sick and needs to see the vet.",
        cost: 250,
        consequence: "Your pet's health worsened because you delayed care."
    },
     {
        type: 'expense',
        category: 'Need',
        description: "Your laptop for school broke and needs an urgent repair.",
        cost: 220,
        consequence: "You couldn't complete your schoolwork, and your grades suffered."
    },
    {
        type: 'expense',
        category: 'Need',
        description: "You need to buy a professional outfit for a job interview.",
        cost: 120,
        consequence: "You made a poor impression at your interview due to unprofessional attire."
    },
     {
        type: 'expense',
        category: 'Need',
        description: "Your internet bill is due.",
        cost: 60,
        consequence: "Your internet has been cut off."
    },
    {
        type: 'expense',
        category: 'Need',
        description: "You need to refill a prescription medication.",
        cost: 50,
        consequence: "You missed a dose of important medication."
    },
    {
      type: 'expense',
      category: 'Need',
      description: "Your car's registration is expiring soon.",
      cost: 75,
      consequence: "You were pulled over and fined for having an expired registration."
    },
    {
      type: 'expense',
      category: 'Need',
      description: "A textbook required for a class is not available at the library.",
      cost: 85,
      consequence: "You fell behind in your class because you didn't have the required textbook."
    },
    {
      type: 'expense',
      category: 'Need',
      description: "Your public transportation pass needs to be renewed for the month.",
      cost: 100,
      consequence: "You had to pay expensive single-ride fares, wasting money.",
    },
    {
      type: 'expense',
      category: 'Need',
      description: "You chipped a tooth and need to see a dentist.",
      cost: 150,
      consequence: "The chipped tooth got infected, leading to a more painful and expensive procedure.",
    },
    {
      type: 'expense',
      category: 'Need',
      description: "You need to get a new set of professional work clothes.",
      cost: 200,
      consequence: "You weren't able to adhere to the company's dress code."
    },
    {
      type: 'expense',
      category: 'Need',
      description: "Your annual gym membership is up for renewal.",
      cost: 400,
      consequence: "You skipped your renewal and lost your motivation to exercise."
    },

    // --- Wants ---
    {
      type: 'expense',
      category: 'Want',
      description: 'Last-minute concert tickets with a friend!',
      cost: 150,
    },
    {
      type: 'expense',
      category: 'Want',
      description: 'Your favorite artist dropped new merch!',
      cost: 80,
    },
    {
      type: 'expense',
      category: 'Want',
      description: "A new must-have video game just released!",
      cost: 70,
    },
    {
      type: 'expense',
      category: 'Want',
      description: "Your friends are all going out for expensive pizza.",
      cost: 40,
    },
    {
      type: 'expense',
      category: 'Want',
      description: "You found a limited-edition pair of sneakers online.",
      cost: 200,
    },
    {
      type: 'expense',
      category: 'Want',
      description: "A spontaneous weekend trip.",
      cost: 250,
    },
     {
      type: 'expense',
      category: 'Want',
      description: "A subscription box for snacks and goodies.",
      cost: 30,
    },
    {
        type: 'expense',
        category: 'Want',
        description: "You feel like redecorating your room.",
        cost: 120,
    },
    {
        type: 'expense',
        category: 'Want',
        description: "Take a new online course for a hobby.",
        cost: 100
    },
    {
        type: 'expense',
        category: 'Want',
        description: 'Go to an amusement park.',
        cost: 90,
    },
    {
        type: 'expense',
        category: 'Want',
        description: 'Buy a new plant for your apartment.',
        cost: 25,
    },
    {
      type: 'expense',
      category: 'Want',
      description: 'Tickets to a 3D movie.',
      cost: 22,
    },
    {
      type: 'expense',
      category: 'Want',
      description: 'A fancy coffee maker.',
      cost: 130,
    },
    {
      type: 'expense',
      category: 'Want',
      description: 'Go out for brunch with friends.',
      cost: 45,
    },
    {
      type: 'expense',
      category: 'Want',
      description: 'A high-end skincare product you saw online.',
      cost: 65,
    },
    {
      type: 'expense',
      category: 'Want',
      description: 'Tickets to a local sports game.',
      cost: 55,
    },
     {
      type: 'expense',
      category: 'Want',
      description: 'A new set of noise-cancelling headphones.',
      cost: 280,
    },
    {
      type: 'expense',
      category: 'Want',
      description: 'A high-quality backpack for school.',
      cost: 90,
    },
    {
      type: 'expense',
      category: 'Want',
      description: 'A weekend streaming service marathon with all the snacks.',
      cost: 50,
    },
    
    // === CHOICE EVENTS ===
    {
        type: 'choice',
        category: 'Want',
        description: 'Time for a fun night! What do you choose?',
        optionA: { description: 'Go bowling with friends', cost: 35 },
        optionB: { description: 'Go to a fancy movie premiere', cost: 75 },
    },
    {
        type: 'choice',
        category: 'Want',
        description: 'You want to upgrade your entertainment setup.',
        optionA: { description: 'A new gaming headset', cost: 120 },
        optionB: { description: 'A new 4K monitor', cost: 300 },
    },
     {
        type: 'choice',
        category: 'Want',
        description: 'You need a new outfit for an event.',
        optionA: { description: 'A stylish thrift-store find', cost: 40 },
        optionB: { description: 'A brand-new designer outfit', cost: 180 },
    },
    {
        type: 'choice',
        category: 'Need',
        description: 'How will you get to work this week?',
        optionA: { description: 'Buy a monthly transit pass', cost: 100 },
        optionB: { description: 'Take a rideshare every day', cost: 250 },
        consequence: {
            text: "You couldn't get to work and lost out on pay.",
            flag: 'missed_work',
        }
    },
    {
        type: 'choice',
        category: 'Want',
        description: "It's time to treat yourself to a coffee.",
        optionA: { description: 'A simple drip coffee', cost: 3 },
        optionB: { description: 'A fancy seasonal latte', cost: 7 },
    },
    {
        type: 'choice',
        category: 'Want',
        description: "A friend's birthday is coming up.",
        optionA: { description: 'A thoughtful, homemade gift', cost: 15 },
        optionB: { description: 'An expensive gadget they wanted', cost: 100 },
    },
    {
        type: 'choice',
        category: 'Need',
        description: 'Your refrigerator is empty. How do you restock?',
        optionA: { description: 'Careful meal planning and grocery shopping', cost: 250 },
        optionB: { description: 'Get takeout and delivery for the rest of the month', cost: 600 },
        consequence: {
            text: "You didn't get groceries and had no food at home."
        }
    },
    {
        type: 'choice',
        category: 'Want',
        description: 'You want to start exercising.',
        optionA: { description: 'A high-end gym membership', cost: 80 },
        optionB: { description: 'A new pair of running shoes', cost: 130 },
    },
    {
        type: 'choice',
        category: 'Want',
        description: 'You have a free afternoon. How do you spend it?',
        optionA: { description: 'Visit a free museum', cost: 0 },
        optionB: { description: 'Go to a trampoline park', cost: 30 },
    },
    {
      type: 'choice',
      category: 'Want',
      description: 'Your friends are planning a weekend camping trip.',
      optionA: { description: 'Borrow gear from a friend', cost: 20 },
      optionB: { description: 'Buy all new camping equipment', cost: 300 },
    },
    {
      type: 'choice',
      category: 'Want',
      description: 'You want to learn a new skill.',
      optionA: { description: 'Watch free tutorials online', cost: 0 },
      optionB: { description: 'Sign up for a premium online masterclass', cost: 180 },
    },
    {
        type: 'expense',
        category: 'Want',
        description: 'Your current phone is fine, but the new one is tempting.',
        cost: 400,
    },
    {
      type: 'choice',
      category: 'Need',
      description: "It's lunch time at work.",
      optionA: { description: 'Pack a lunch from home', cost: 5 },
      optionB: { description: 'Buy lunch from a fancy cafe', cost: 25 },
    },

    // === WINDFALL EVENTS ===
    {
        type: 'windfall',
        description: "You found a buyer for your old comic book collection!",
        income: 150,
    },
    {
        type: 'windfall',
        description: "You received a surprise birthday check from your grandma!",
        income: 100,
    },
    {
        type: 'windfall',
        description: "You sold some of your old clothes online.",
        income: 60,
    },
    {
        type: 'windfall',
        description: "You won a small prize from a scratch-off ticket.",
        income: 25,
    },
    {
        type: 'windfall',
        description: "You got a small work bonus for being a great employee.",
        income: 200,
        prerequisites: {
            forbiddenFlags: ['missed_work']
        }
    },
    {
        type: 'windfall',
        description: "You dog-sat for a neighbor over the weekend.",
        income: 75,
    },
    {
        type: 'windfall',
        description: "You found $20 on the sidewalk!",
        income: 20,
    },
    {
        type: 'windfall',
        description: "You received a small scholarship for your studies.",
        income: 500,
    },
    {
        type: 'windfall',
        description: "You got a tax refund!",
        income: 300,
    },
    {
        type: 'windfall',
        description: "You participated in a paid research study.",
        income: 50,
    },
    {
      type: 'windfall',
      description: "You returned some items you bought last month and got a store credit.",
      income: 40,
    },
    {
      type: 'windfall',
      description: "A freelance project paid more than you expected.",
      income: 250,
    },
  ],
};
