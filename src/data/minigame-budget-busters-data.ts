
export interface Tank {
    id: string;
    label: string;
    amount: number;
    capacity: number;
    color: string;
    isNeeds?: boolean;
    isSavings?: boolean;
    locked?: boolean;
  }
  
  export interface SurpriseExpense {
    description: string;
    cost: number;
  }

  export interface MandatoryExpense {
    description: string;
    cost: number;
    isMandatory: true;
  }

  export interface GameConfig {
    timer: number;
    tanks: Tank[];
    surpriseExpenses: SurpriseExpense[];
    mandatoryExpenses: MandatoryExpense[];
    mandatoryExpenseInterval: number; // A mandatory expense appears every N rounds
  }
  
  export const gameConfig: GameConfig = {
    timer: 60,
    tanks: [
        { id: 'needs', label: 'Needs', amount: 500, capacity: 500, color: 'bg-red-500', isNeeds: true, locked: false },
        { id: 'wants', label: 'Wants', amount: 300, capacity: 300, color: 'bg-purple-500' },
        { id: 'savings', label: 'Savings', amount: 200, capacity: 200, color: 'bg-blue-500', isSavings: true },
    ],
    surpriseExpenses: [
      {
        description: 'Your phone screen cracked!',
        cost: 150,
      },
      {
        description: 'Last-minute concert tickets with a friend!',
        cost: 200,
      },
      {
        description: 'Your favorite artist dropped new merch!',
        cost: 100,
      },
      {
        description: "A new must-have video game just released!",
        cost: 70,
      },
      {
        description: "Your friends are all going out for expensive pizza.",
        cost: 50,
      },
      {
        description: "You found a limited-edition pair of sneakers online.",
        cost: 250,
      },
    ],
    mandatoryExpenses: [
        {
          description: "Rent is due! You must pay it.",
          cost: 400,
          isMandatory: true,
        },
        {
          description: "Your car insurance premium is due.",
          cost: 180,
          isMandatory: true,
        },
        {
          description: "Emergency vet visit for your dog!",
          cost: 300,
          isMandatory: true,
        },
        {
          description: "Your laptop needs an urgent repair for school!",
          cost: 450,
          isMandatory: true,
        },
    ],
    mandatoryExpenseInterval: 4,
  };
