
export type ExpenseType = 'Need' | 'Want';

export interface Expense {
  type: ExpenseType;
  description: string;
  cost: number;
  consequence?: string; // Specific consequence for failing or dismissing a 'Need'
}

export interface GameConfig {
  initialBudget: number;
  expenses: Expense[];
  rounds: number;
}

export const gameConfig: GameConfig = {
  initialBudget: 2000,
  rounds: 10,
  expenses: [
    // --- Wants (Aim for around 30% of budget: ~$600) ---
    {
      type: 'Want',
      description: 'Last-minute concert tickets with a friend!',
      cost: 150,
    },
    {
      type: 'Want',
      description: 'Your favorite artist dropped new merch!',
      cost: 80,
    },
    {
      type: 'Want',
      description: "A new must-have video game just released!",
      cost: 70,
    },
    {
      type: 'Want',
      description: "Your friends are all going out for expensive pizza.",
      cost: 40,
    },
    {
      type: 'Want',
      description: "You found a limited-edition pair of sneakers online.",
      cost: 200,
    },
    {
      type: 'Want',
      description: "Upgrade your phone to the latest model.",
      cost: 350,
    },
    {
      type: 'Want',
      description: "A spontaneous weekend trip.",
      cost: 250,
    },
     {
      type: 'Want',
      description: "A subscription box for snacks and goodies.",
      cost: 30,
    },
    {
      type: 'Want',
      description: "Fancy dinner at a trendy new restaurant.",
      cost: 75,
    },
    
    // --- Needs (Aim for around 50% of budget: ~$1000) ---
    {
      type: 'Need',
      description: "Rent is due! You must pay it.",
      cost: 750,
      consequence: "You failed to pay rent and have been evicted!",
    },
    {
      type: 'Need',
      description: "Your car insurance premium is due.",
      cost: 150,
      consequence: "You missed your insurance payment, and your policy was canceled. You can't legally drive!",
    },
    {
      type: 'Need',
      description: "Emergency vet visit for your dog!",
      cost: 250,
      consequence: "You couldn't afford the vet. A tough lesson about emergency funds.",
    },
    {
      type: 'Need',
      description: "Your laptop needs an urgent repair for school!",
      cost: 300,
      consequence: "You couldn't fix your laptop and are now falling behind in your classes.",
    },
    {
      type: 'Need',
      description: "It's time to buy groceries for the month.",
      cost: 200,
      consequence: "You don't have enough money for groceries.",
    },
    {
        type: 'Need',
        description: "Your phone bill is due.",
        cost: 70,
        consequence: "Your phone service has been disconnected."
    },
    {
        type: 'Need',
        description: "Your student loan payment is due.",
        cost: 200,
        consequence: "You've missed a student loan payment, which will hurt your credit score."
    },
    {
        type: 'Need',
        description: "Your electricity bill has arrived.",
        cost: 80,
        consequence: "The power has been shut off in your apartment."
    }
  ],
};
