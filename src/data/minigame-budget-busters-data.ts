
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
    optionA: { description: string; cost: number };
    optionB: { description:string; cost: number };
}

export interface WindfallEvent extends BaseEvent {
    type: 'windfall';
    income: number;
}

export type GameEvent = ExpenseEvent | ChoiceEvent | WindfallEvent;


export interface GameConfig {
  initialBudget: number;
  events: GameEvent[];
  rounds: number;
}

export const gameConfig: GameConfig = {
  initialBudget: 2500,
  rounds: 15,
  events: [
    // === EXPENSE EVENTS ===
    // --- Needs ---
    {
      type: 'expense',
      category: 'Need',
      description: "Rent is due! You must pay it.",
      cost: 800,
      consequence: "You failed to pay rent and have been evicted!",
    },
    {
      type: 'expense',
      category: 'Need',
      description: "Your car insurance premium is due.",
      cost: 150,
      consequence: "You missed your insurance payment, and your policy was canceled. You can't legally drive!",
    },
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
      description: "Upgrade your phone to the latest model.",
      cost: 350,
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
    
    // === CHOICE EVENTS ===
    {
        type: 'choice',
        description: 'Time for a fun night! What do you choose?',
        optionA: { description: 'Go bowling with friends', cost: 35 },
        optionB: { description: 'Go to a fancy movie premiere', cost: 75 },
    },
    {
        type: 'choice',
        description: 'You want to upgrade your entertainment setup.',
        optionA: { description: 'A new gaming headset', cost: 120 },
        optionB: { description: 'A new 4K monitor', cost: 300 },
    },
     {
        type: 'choice',
        description: 'You need a new outfit for an event.',
        optionA: { description: 'A stylish thrift-store find', cost: 40 },
        optionB: { description: 'A brand-new designer outfit', cost: 180 },
    },
    {
        type: 'choice',
        description: 'How will you get to work this week?',
        optionA: { description: 'Buy a monthly transit pass', cost: 100 },
        optionB: { description: 'Take a rideshare every day', cost: 250 },
    },
    {
        type: 'choice',
        description: "It's time to treat yourself to a coffee.",
        optionA: { description: 'A simple drip coffee', cost: 3 },
        optionB: { description: 'A fancy seasonal latte', cost: 7 },
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
    },
  ],
};

    