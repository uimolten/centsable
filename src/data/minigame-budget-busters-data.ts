
export type ExpenseType = 'Need' | 'Want';

export interface Expense {
  type: ExpenseType;
  description: string;
  cost: number;
  consequence?: string; // Specific consequence for failing a 'Need'
}

export interface GameConfig {
  timer: number;
  initialBudget: number;
  expenses: Expense[];
}

export const gameConfig: GameConfig = {
  timer: 90, // Longer timer for more events
  initialBudget: 1500,
  expenses: [
    // --- Wants ---
    {
      type: 'Want',
      description: 'Last-minute concert tickets with a friend!',
      cost: 200,
    },
    {
      type: 'Want',
      description: 'Your favorite artist dropped new merch!',
      cost: 100,
    },
    {
      type: 'Want',
      description: "A new must-have video game just released!",
      cost: 70,
    },
    {
      type: 'Want',
      description: "Your friends are all going out for expensive pizza.",
      cost: 50,
    },
    {
      type: 'Want',
      description: "You found a limited-edition pair of sneakers online.",
      cost: 250,
    },
    
    // --- Needs ---
    {
      type: 'Need',
      description: "Rent is due! You must pay it.",
      cost: 600,
      consequence: "You failed to pay rent and have been evicted!",
    },
    {
      type: 'Need',
      description: "Your car insurance premium is due.",
      cost: 180,
      consequence: "You missed your insurance payment, and your policy was canceled. You can't legally drive!",
    },
    {
      type: 'Need',
      description: "Emergency vet visit for your dog!",
      cost: 300,
      consequence: "You couldn't afford the vet. A tough lesson about emergency funds.",
    },
    {
      type: 'Need',
      description: "Your laptop needs an urgent repair for school!",
      cost: 450,
      consequence: "You couldn't fix your laptop and are now falling behind in your classes.",
    },
    {
      type: 'Need',
      description: "It's time to buy groceries for the week.",
      cost: 80,
      consequence: "You don't have enough money for groceries.",
    },
    {
        type: 'Need',
        description: "Your phone bill is due.",
        cost: 60,
        consequence: "Your phone service has been disconnected."
    }
  ],
};
